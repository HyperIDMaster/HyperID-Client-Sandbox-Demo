/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import {
    IKycDetailedStatusParams,
    IKycDetailedStatusResponse,
    IKycStartFlowParams,
    IKycTopLevelStatusResponse,
} from '@common/types/kyc';
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

import { KycService } from './kyc.service';

@Controller('api/kyc')
@UseGuards(AuthGuard)
export class KycController
{
    constructor(
        private authService: AuthService,
        private kycService: KycService
    ) { }

    @Post('get-flow-link')
    public getFlowLink(@Body() _params: IKycStartFlowParams): { url: string; }
    {
        const link = this.kycService.getStartKycFlowLink(_params.verification_level, _params.kyc_sub_project);

        return { url: link };
    }

    @Get('get-top-level-status')
    public async getTopLevelStatus(@Req() _request: Request): Promise<IKycTopLevelStatusResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const kycStatusResult = await this.kycService.getTopLevelStatus(tokens.access_token);

        return kycStatusResult;
    }

    @Get('get-detailed-status')
    public async getDetailedStatus(@Query() _params: IKycDetailedStatusParams, @Req() _request: Request): Promise<IKycDetailedStatusResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const kycStatusResult = await this.kycService.getDetailedStatus(tokens.access_token);

        return kycStatusResult;
    }
}
