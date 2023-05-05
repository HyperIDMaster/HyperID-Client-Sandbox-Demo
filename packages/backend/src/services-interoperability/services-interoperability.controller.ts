/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ServicesInteroperabilityService } from './services-interoperability.service';
import { IUserDataGetParams, IUserDataGetResponse, IUserDataSetParams, IUserDataSetResponse } from '@common/types/services-interoperability';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/services-interoperability')
@UseGuards(AuthGuard)
export class ServicesInteroperabilityController
{
    constructor(
        private authService: AuthService,
        private servicesInteroperabilityService: ServicesInteroperabilityService
    ) {}

    @Post('set')
    public async set(@Body() _params: IUserDataSetParams, @Req() _request: Request): Promise<IUserDataSetResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.servicesInteroperabilityService.set(tokens.access_token, _params.value_key, _params.value_data);

        return result;
    }

    @Post('get')
    public async get(@Body() _params: IUserDataGetParams, @Req() _request: Request): Promise<IUserDataGetResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.servicesInteroperabilityService.get(tokens.access_token, _params.value_keys);

        return result;
    }
}
