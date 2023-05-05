/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';

import { eFlowMode, IGetTokensResponse, IIntrospectResponse, ITokens, IUserInfo } from '../../../../common/types/auth';

@Injectable()
export class AuthService
{
    private host = process.env.OAUTH_HOST;
    private realm = process.env.OAUTH_REALM;
    private clientId = process.env.OAUTH_CLIENT_ID;
    private secret = process.env.OAUTH_SECRET;
    private redirectUri = process.env.OAUTH_REDIRECT_URI;
    private scope = process.env.OAUTH_SCOPE;

    private ACCESS_TOKEN_COOKIE_NAME = 'hce_access_token';
    private REFRESH_TOKEN_COOKIE_NAME = 'hce_refresh_token';

    private COOKIES_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

    public getAuthorizationLink(_flowMode: eFlowMode, _redirectUrl: string)
    {
        const link = `${ this.host }/auth/realms/${ this.realm }/protocol/openid-connect/auth` +
            `?response_type=code` +
            `&client_id=${ this.clientId }` +
            `&redirect_uri=${ encodeURIComponent(this.redirectUri) }` +
            `&scope=${ this.scope }` +
            `&flow_mode=${ _flowMode }` +
            `&redirect_url=${ encodeURIComponent(_redirectUrl) }`;

        return link;
    }

    public async getTokens(_code: string): Promise<IGetTokensResponse>
    {
        const url = `${ this.host }/auth/realms/${ this.realm }/protocol/openid-connect/token`;

        const params = new URLSearchParams();

        params.append('grant_type', 'authorization_code');
        params.append('code', _code);
        params.append('client_id', this.clientId);
        params.append('client_secret', this.secret);
        params.append('redirect_uri', this.redirectUri);

        const response = await axios<IGetTokensResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data;
    }

    public async refreshTokens(_refreshToken: string): Promise<IGetTokensResponse>
    {
        const url = `${ this.host }/auth/realms/${ this.realm }/protocol/openid-connect/token`;

        const params = new URLSearchParams();

        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', _refreshToken);
        params.append('client_id', this.clientId);
        params.append('client_secret', this.secret);

        const response = await axios<IGetTokensResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data;
    }


    public async introspectToken(_accessToken: string): Promise<IIntrospectResponse>
    {
        const url = `${ this.host }/auth/realms/${ this.realm }/protocol/openid-connect/token/introspect`;

        const params = new URLSearchParams();

        params.append('token_type_hint', 'access_token');
        params.append('token', _accessToken);
        params.append('client_id', this.clientId);
        params.append('client_secret', this.secret);

        const response = await axios<IIntrospectResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data;
    }

    public async getUserInfo(_accessToken: string): Promise<IUserInfo>
    {
        const tokenInfo = await this.parseJwt(_accessToken);
        return {
            email: tokenInfo.email,
            wallet: tokenInfo.wallet_address,
            isGuest: tokenInfo.email.startsWith('guest') && tokenInfo.email.endsWith('@hypersecureid.com'),
        };
    }

    public async logout(_refreshToken: string): Promise<void>
    {
        const url = `${ this.host }/auth/realms/${ this.realm }/protocol/openid-connect/logout`;

        const params = new URLSearchParams();

        params.append('refresh_token', _refreshToken);
        params.append('client_id', this.clientId);
        params.append('client_secret', this.secret);

        await axios<IGetTokensResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            }
        });
    }

    public setTokensToCookies(_tokens: ITokens, _response: Response)
    {
        _response.cookie(
            this.ACCESS_TOKEN_COOKIE_NAME,
            _tokens.access_token,
            {
                httpOnly: true,
                maxAge: Date.now() + this.COOKIES_TTL,
                secure: true
            }
        );

        _response.cookie(
            this.REFRESH_TOKEN_COOKIE_NAME,
            _tokens.refresh_token,
            {
                httpOnly: true,
                maxAge: Date.now() + this.COOKIES_TTL,
                secure: true
            }
        );
    }

    public getTokensFromCookies(_request: Request): ITokens
    {
        if (!_request.cookies[ this.ACCESS_TOKEN_COOKIE_NAME ] || !_request.cookies[ this.REFRESH_TOKEN_COOKIE_NAME ])
        {
            throw new UnauthorizedException();
        }
        return {
            access_token: _request.cookies[ this.ACCESS_TOKEN_COOKIE_NAME ],
            refresh_token: _request.cookies[ this.REFRESH_TOKEN_COOKIE_NAME ]
        };
    }

    public removeTokensFromCookies(_response: Response)
    {
        _response.clearCookie(this.ACCESS_TOKEN_COOKIE_NAME);

        _response.clearCookie(this.REFRESH_TOKEN_COOKIE_NAME,);
    }

    public async checkTokens(_tokens: ITokens, _request: Request, _response: Response, _introspect: boolean = false): Promise<boolean>
    {
        if (!_tokens || !_tokens.access_token || !_tokens.refresh_token)
        {
            return false;
        }

        let accessJwt = this.parseJwt(_tokens.access_token);

        if (accessJwt.exp * 1000 < Date.now())
        {
            try
            {
                const tokens = await this.refreshTokens(_tokens.refresh_token);

                if (!tokens.refresh_token)
                {
                    return false;
                }

                this.setTokensToCookies(tokens, _response);

                _request.cookies[ this.ACCESS_TOKEN_COOKIE_NAME ] = tokens.access_token;
                _request.cookies[ this.REFRESH_TOKEN_COOKIE_NAME ] = tokens.refresh_token;

                return true;
            }
            catch (e)
            {
                console.error(e);

                return false;
            }
        }

        if (_introspect)
        {
            const introspectResult = await this.introspectToken(_tokens.access_token);

            return introspectResult.active;
        }

        return true;
    }

    private parseJwt(_token: string): { [ key: string ]: any; }
    {

        // Split the token into its component parts
        const base64Url = _token.split('.')[ 1 ];

        // Replace characters as per JWT format to ensure base64 decoding works correctly
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        // Decode the base64 encoded payload and convert it to a JSON object
        const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString('binary').split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );

        return JSON.parse(jsonPayload);
    }
}
