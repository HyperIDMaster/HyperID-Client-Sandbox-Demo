/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { IAuthorizeCallbackParams, IAuthorizeParams, IUserInfo } from '@common/types/auth';
import { Body, Controller, Get, Post, Query, Redirect, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';


@Controller('api/auth')
export class AuthController
{
    constructor(
        private authService: AuthService
    ) { }

    @Post('/authorize')
    public authorize(@Body() _params: IAuthorizeParams): { url: string; }
    {
        const authLink = this.authService.getAuthorizationLink(_params.flow_mode, _params.redirect_url);

        return {
            url: authLink
        };
    }

    @Get('/callback')
    @Redirect('/', 302)
    public async callback(@Query() _params: IAuthorizeCallbackParams, @Res() _response: Response): Promise<void>
    {
        const tokens = await this.authService.getTokens(_params.code);

        this.authService.setTokensToCookies(tokens, _response);
    }

    @Get('/check')
    public async check(@Req() _request: Request, @Res({ passthrough: true }) _response: Response): Promise<{ result: boolean; }>
    {
        const tokens = await this.authService.getTokensFromCookies(_request);

        const checkResult = await this.authService.checkTokens(tokens, _request, _response);

        return {
            result: checkResult
        };
    }

    @Get('/user-info')
    public async getUserInfo(@Req() _request: Request): Promise<IUserInfo>
    {
        const tokens = await this.authService.getTokensFromCookies(_request);

        const userInfo = await this.authService.getUserInfo(tokens.access_token);

        return userInfo;
    }

    @Get('/logout')
    public async logout(@Req() _request: Request, @Res({ passthrough: true }) _response: Response): Promise<void>
    {
        const tokens = await this.authService.getTokensFromCookies(_request);

        if (!tokens)
        {
            throw new UnauthorizedException();
        }

        await this.authService.logout(tokens.refresh_token);

        this.authService.removeTokensFromCookies(_response);
    }
}
