/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

import { ConsentService } from './consent.service';

@Controller('api/consent')
export class ConsentController
{
    constructor(
        private consentService: ConsentService,
        private authService: AuthService
    )
    {

    }
    @Get('revoke')
    public async revokeConsent(@Req() _request: Request): Promise<void>
    {
        const tokens = await this.authService.getTokensFromCookies(_request);
        return await this.consentService.revokeConsent(tokens.access_token);
    }
}