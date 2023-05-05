/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import
    {
        IMfaCheckAvailabilityResponse,
        IMfaStatusGetParams,
        IMfaStatusGetResponse,
        IMfaTransactionCancelParams,
        IMfaTransactionCancelResponse,
        IMfaTransactionStartResponse,
    } from '@common/types/mfa';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

import { MfaService } from './mfa.service';

@Controller('api/mfa')
@UseGuards(AuthGuard)
export class MfaController
{
    constructor(
        private authService: AuthService,
        private mfaService: MfaService
    ) { }

    @Get('check-availability')
    public async checkAvailability(@Req() _request: Request): Promise<IMfaCheckAvailabilityResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.mfaService.checkAvailability(tokens.access_token);

        return result;
    }

    @Post('transaction-start')
    public async transactionStart(@Req() _request: Request): Promise<IMfaTransactionStartResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.mfaService.startTransaction(tokens.access_token);

        return result;
    }

    @Post('transaction-status-get')
    public async transactionStatusGet(@Req() _request: Request, @Body() _param: IMfaStatusGetParams): Promise<IMfaStatusGetResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.mfaService.getStatus(tokens.access_token, _param.transaction_id);

        return result;
    }

    @Post('transaction-cancel')
    public async transactionCancel(@Req() _request: Request, @Body() _param: IMfaTransactionCancelParams): Promise<IMfaTransactionCancelResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.mfaService.cancelTransaction(tokens.access_token, _param.transaction_id);

        return result;
    }
}
