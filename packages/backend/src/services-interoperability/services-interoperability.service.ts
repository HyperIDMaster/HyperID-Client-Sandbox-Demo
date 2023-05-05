/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import
    {
        IUserDataGetParams,
        IUserDataGetResponse,
        IUserDataSetParams,
        IUserDataSetResponse,
    } from '@common/types/services-interoperability';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ServicesInteroperabilityService
{
    private rsHost = process.env.RESOURCE_SERVER;

    public async set(_accessToken: string, _key: string, _value: string): Promise<IUserDataSetResponse>
    {
        const url = `${ this.rsHost }/user-data/set`;

        const params: IUserDataSetParams = {
            value_key: _key,
            value_data: _value
        };

        const response = await axios<IUserDataSetResponse>({
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

    public async get(_accessToken: string, _keys: string[]): Promise<IUserDataGetResponse>
    {
        const url = `${ this.rsHost }/user-data/get`;

        const params: IUserDataGetParams = {
            value_keys: _keys
        };

        const response = await axios<IUserDataGetResponse>({
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
