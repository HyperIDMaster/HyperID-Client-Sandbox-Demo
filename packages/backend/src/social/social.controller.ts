/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

import { eSocialType, ISocialInfo } from './../../../../common/types/social';
import { SocialService } from './social.service';

@Controller('api/social')
export class SocialController
{
    constructor(
        private authService: AuthService,
        private socialService: SocialService
    )
    {

    }

    @Post('add-social-info')
    public async addSocialInfo(@Body() _params: { social: eSocialType; })
    {
        const link = this.socialService.getSocialInfoLink(_params.social);

        return {
            url: link
        };
    }

    @Post('get-social-info')
    public async getSocialInfo(@Req() _request: Request, @Body() _params: { social: eSocialType; }): Promise<ISocialInfo>
    {
        const tokens = await this.authService.getTokensFromCookies(_request);
        const socialInfo = await this.socialService.getSocialInfo(_params.social, tokens.access_token);
        return socialInfo;
    }
} 