/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import
    {
        eTemplateId,
        IMfaCheckAvailabilityResponse,
        IMfaStatusGetResponse,
        IMfaTransactionCancelResponse,
        IMfaTransactionStartResponse,
    } from '@common/types/mfa';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MfaService
{
    private rsHost = process.env.RESOURCE_SERVER;

    public async checkAvailability(_accessToken: string): Promise<IMfaCheckAvailabilityResponse>
    {
        const url = `${ this.rsHost }/mfa-client/availability-check`;

        const response = await axios<IMfaCheckAvailabilityResponse>({
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

    public async startTransaction(_accessToken: string): Promise<IMfaTransactionStartResponse>
    {
        const url = `${ this.rsHost }/mfa-client/transaction/start`;

        const params = {
            template_id: eTemplateId.sign_id,
            // values: JSON.stringify({
            //     type: 'action-type',
            //     action_info: "action info text"
            // })
        };

        const response = await axios<IMfaTransactionStartResponse>({
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

    public async getStatus(_accessToken: string, _transactionId: number): Promise<IMfaStatusGetResponse>
    {
        const url = `${ this.rsHost }/mfa-client/transaction/status-get`;

        const response = await axios<IMfaStatusGetResponse>({
            method: 'post',
            url: url,
            data: {
                transaction_id: _transactionId
            },
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }

    public async cancelTransaction(_accessToken: string, _transactionId: number): Promise<IMfaTransactionCancelResponse>
    {
        const url = `${ this.rsHost }/mfa-client/transaction/cancel`;

        const response = await axios<IMfaTransactionCancelResponse>({
            method: 'post',
            url: url,
            data: {
                transaction_id: _transactionId
            },
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${ _accessToken }`
            }
        });

        return response.data;
    }
}
