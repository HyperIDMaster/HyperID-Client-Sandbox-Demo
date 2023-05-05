/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { MultipassService } from './multipass.service';
import { Request } from 'express';
import { IMultipassResponse } from '@common/types/multipass';

@Controller('api/multipass')
@UseGuards(AuthGuard)
export class MultipassController
{
    constructor(
        private authService: AuthService,
        private multipassService: MultipassService
    ) {}

    @Get('')
    public async get(@Req() _request: Request): Promise<IMultipassResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.multipassService.get(tokens.access_token);

        return result;
    }
}
