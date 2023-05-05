/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { eKycVerificationLevel } from '@common/types/kyc';
import { eSocialType, ISocialInfo } from '@common/types/social';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SocialService
{
    private readonly host = process.env.OAUTH_HOST;
    private readonly realm = process.env.OAUTH_REALM;
    private readonly clientId = process.env.OAUTH_CLIENT_ID;
    private readonly redirectUri = process.env.OAUTH_REDIRECT_URI;
    private readonly scope = process.env.OAUTH_SCOPE;
    private readonly rsHost = process.env.RESOURCE_SERVER;

    public getSocialInfoLink(social: eSocialType): string
    {
        let link = `${ this.host }/auth/realms/${ this.realm }/protocol/openid-connect/auth` +
            `?response_type=code` +
            `&client_id=${ this.clientId }` +
            `&redirect_uri=${ this.redirectUri }` +
            `&scope=${ this.scope + ` ${ social }-check` }` +
            `&verification_level=${ eKycVerificationLevel.social }`;

        return link;
    }

    public async getSocialInfo(social: eSocialType, access_token: string): Promise<ISocialInfo>
    {
        const res = await axios(
            `${ this.rsHost }/user-info/${ social }/get`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ access_token }`
                }
            }
        );

        return res.data;
    }
}