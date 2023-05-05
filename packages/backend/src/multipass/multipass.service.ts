/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Injectable } from '@nestjs/common';
import { IMultipassResponse } from '@common/types/multipass';
import axios from 'axios';

@Injectable()
export class MultipassService
{
    private rsHost = process.env.RESOURCE_SERVER;

    public async get(_accessToken: string): Promise<IMultipassResponse>
    {
        const url = `${this.rsHost}/user-multipass/get`;

        const response = await axios<IMultipassResponse>({
            method: 'post',
            url: url,
            data: {},
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${_accessToken}`
            }
        });

        return response.data;
    }
}
