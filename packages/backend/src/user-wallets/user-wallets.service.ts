/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import
    {
        IAddUserWalletParams,
        IAddUserWalletResponse,
        IAddUserWalletTagParams,
        IAddUserWalletTagResponse,
        IArchiveUserWalletParams,
        IArchiveUserWalletResponse,
        IArchiveUserWalletTagParams,
        IArchiveUserWalletTagResponse,
        IGetAvailableChainsResponse,
        IGetUserWalletsByTagParams,
        IGetUserWalletsByTagResponse,
        IGetUserWalletsResponse,
        IUpdateUserWalletLabelParams,
        IUpdateUserWalletLabelResponse,
        IVerifyUserWalletParams,
        IVerifyUserWalletResponse,
    } from '@common/types/user-wallets';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserWalletsService
{
    private rsHost = process.env.RESOURCE_SERVER;

    public async getAvailableChains(_accessToken: string): Promise<IGetAvailableChainsResponse>
    {
        const url = `${ this.rsHost }/user-wallets/available-chains-get`;

        const response = await axios<IGetAvailableChainsResponse>({
            method: 'post',
            url: url,
            data: {},
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async get(_accessToken: string): Promise<IGetUserWalletsResponse>
    {
        const url = `${ this.rsHost }/user-wallets/get`;

        const response = await axios<IGetUserWalletsResponse>({
            method: 'post',
            url: url,
            data: {},
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async getByTag(_accessToken: string, _tag: string): Promise<IGetUserWalletsByTagResponse>
    {
        const url = `${ this.rsHost }/user-wallets-by-tag/get`;

        const params: IGetUserWalletsByTagParams = {
            wallet_tag: _tag
        };

        const response = await axios<IGetUserWalletsByTagResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async add(_accessToken: string, _params: IAddUserWalletParams): Promise<IAddUserWalletResponse>
    {
        const url = `${ this.rsHost }/user-wallet/add`;

        const params: any = {
            wallet: _params.wallet_address,
        };

        if (_params.wallet_sign)
        {
            params.wallet.signed = true;
            params.wallet_sign = _params.wallet_sign;
            params.wallet_data_to_sign = _params.wallet_data_to_sign;
        }

        const response = await axios<IAddUserWalletResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async archive(_accessToken: string, _params: IArchiveUserWalletParams): Promise<IArchiveUserWalletResponse>
    {
        const url = `${ this.rsHost }/user-wallet/archive`;

        const params: IAddUserWalletParams = {
            wallet_address: _params.wallet_address,
        };

        const response = await axios<IArchiveUserWalletResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async verify(_accessToken: string, _params: IVerifyUserWalletParams): Promise<IVerifyUserWalletResponse>
    {
        const url = `${ this.rsHost }/user-wallet/verify`;

        const params: IVerifyUserWalletParams = {
            wallet_address: _params.wallet_address,
            wallet_data_to_sign: _params.wallet_data_to_sign,
            wallet_sign: _params.wallet_sign
        };

        const response = await axios<IVerifyUserWalletResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async updateLabel(_accessToken: string, _params: IUpdateUserWalletLabelParams): Promise<IUpdateUserWalletLabelResponse>
    {
        const url = `${ this.rsHost }/user-wallet-label/update`;

        const params: IUpdateUserWalletLabelParams = {
            wallet_address: _params.wallet_address,
            wallet_label: _params.wallet_label
        };

        const response = await axios<IUpdateUserWalletLabelResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async addTag(_accessToken: string, _params: IAddUserWalletTagParams): Promise<IAddUserWalletTagResponse>
    {
        const url = `${ this.rsHost }/user-wallet-tag/add`;

        const params: IAddUserWalletTagParams = {
            wallet_address: _params.wallet_address,
            wallet_tag: _params.wallet_tag
        };

        const response = await axios<IAddUserWalletTagResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async archiveTag(_accessToken: string, _params: IArchiveUserWalletTagParams): Promise<IArchiveUserWalletTagResponse>
    {
        const url = `${ this.rsHost }/user-wallet-tag/archive`;

        const params: IArchiveUserWalletTagParams = {
            wallet_address: _params.wallet_address,
            wallet_tag: _params.wallet_tag
        };

        const response = await axios<IAddUserWalletTagResponse>({
            method: 'post',
            url: url,
            data: params,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }
}
