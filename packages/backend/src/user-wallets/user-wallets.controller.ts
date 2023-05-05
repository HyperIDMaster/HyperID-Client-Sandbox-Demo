/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserWalletsService } from './user-wallets.service';
import { IAddUserWalletParams, IAddUserWalletResponse, IAddUserWalletTagParams, IAddUserWalletTagResponse, IArchiveUserWalletParams, IArchiveUserWalletResponse, IArchiveUserWalletTagParams, IArchiveUserWalletTagResponse, IGetAvailableChainsResponse, IGetUserWalletsByTagParams, IGetUserWalletsByTagResponse, IGetUserWalletsResponse, IUpdateUserWalletLabelParams, IUpdateUserWalletLabelResponse, IVerifyUserWalletParams, IVerifyUserWalletResponse } from '@common/types/user-wallets';
import { Request } from 'express';

@Controller('api/user-wallets')
@UseGuards(AuthGuard)
export class UserWalletsController
{
    constructor(
        private authService: AuthService,
        private userWalletsService: UserWalletsService
    ) {}

    @Get('available-chains')
    public async getAvailableChains(@Req() _request: Request): Promise<IGetAvailableChainsResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.getAvailableChains(tokens.access_token);

        return result;
    }

    @Get('')
    public async get(@Req() _request: Request): Promise<IGetUserWalletsResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.get(tokens.access_token);

        return result;
    }

    @Post('get-by-tag')
    public async getByTag(@Body() _params: IGetUserWalletsByTagParams, @Req() _request: Request): Promise<IGetUserWalletsByTagResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.getByTag(tokens.access_token, _params.wallet_tag);

        return result;
    }

    @Post('add')
    public async add(@Body() _params: IAddUserWalletParams, @Req() _request: Request): Promise<IAddUserWalletResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.add(tokens.access_token, _params);

        return result;
    }

    @Post('archive')
    public async archive(@Body() _params: IArchiveUserWalletParams, @Req() _request: Request): Promise<IArchiveUserWalletResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.archive(tokens.access_token, _params);

        return result;
    }

    @Post('verify')
    public async verify(@Body() _params: IVerifyUserWalletParams, @Req() _request: Request): Promise<IVerifyUserWalletResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.verify(tokens.access_token, _params);

        return result;
    }

    @Post('update-label')
    public async updateLabel(@Body() _params: IUpdateUserWalletLabelParams, @Req() _request: Request): Promise<IUpdateUserWalletLabelResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.updateLabel(tokens.access_token, _params);

        return result;
    }

    @Post('add-tag')
    public async addTag(@Body() _params: IAddUserWalletTagParams, @Req() _request: Request): Promise<IAddUserWalletTagResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.addTag(tokens.access_token, _params);

        return result;
    }

    @Post('archive-tag')
    public async archiveTag(@Body() _params: IArchiveUserWalletTagParams, @Req() _request: Request): Promise<IArchiveUserWalletTagResponse>
    {
        const tokens = this.authService.getTokensFromCookies(_request);

        const result = await this.userWalletsService.archiveTag(tokens.access_token, _params);

        return result;
    }
}
