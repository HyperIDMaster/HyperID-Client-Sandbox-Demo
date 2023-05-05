/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ConsentService
{
    public async revokeConsent(access_token): Promise<void>
    {
        const res = await axios(
            `${ process.env.RESOURCE_SERVER }/user/client-consent/revoke`,
            {
                headers: {
                    'Authorization': `Bearer ${ access_token }`
                },
                method: 'POST'
            }
        );

        return res.data;
    }
}