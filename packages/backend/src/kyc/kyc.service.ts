/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { eKycVerificationLevel, IKycDetailedStatusResponse, IKycTopLevelStatusResponse } from '@common/types/kyc';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KycService
{
    private host = process.env.OAUTH_HOST;
    private realm = process.env.OAUTH_REALM;
    private clientId = process.env.OAUTH_CLIENT_ID;
    private redirectUri = process.env.OAUTH_REDIRECT_URI;
    private scope = process.env.OAUTH_SCOPE;
    private rsHost = process.env.RESOURCE_SERVER;

    public getStartKycFlowLink(_verificationLevel: eKycVerificationLevel, _kycSubProject?: string): string
    {
        let link = `${ this.host }/auth/realms/${ this.realm }/protocol/openid-connect/auth` +
            `?response_type=code` +
            `&client_id=${ this.clientId }` +
            `&redirect_uri=${ this.redirectUri }` +
            `&scope=${ this.scope }` +
            `&verification_level=${ _verificationLevel }`;

        if (_kycSubProject)
        {
            `&kyc_sub_project=${ _kycSubProject }`;
        }

        return link;
    }

    public async getTopLevelStatus(_accessToken: string): Promise<IKycTopLevelStatusResponse>
    {
        const url = `${ this.rsHost }/kyc/user/status-top-level-get`;

        const response = await axios<IKycTopLevelStatusResponse>({
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

    public async getDetailedStatus(_accessToken: string): Promise<IKycDetailedStatusResponse>
    {
        const resLvl3 = await axios({
            method: 'post',
            url: `${ this.rsHost }/kyc/user/status-get`,
            data: { verification_level: eKycVerificationLevel.basic },
            headers: {
                'Authorization': `Bearer ${ _accessToken }`,
            }
        });

        let resLvl4;

        if (resLvl3.data.user_status === 2)
        {
            resLvl4 = await axios({
                method: 'post',
                url: `${ this.rsHost }/kyc/user/status-get`,
                data: { verification_level: eKycVerificationLevel.full },
                headers: {
                    'Authorization': `Bearer ${ _accessToken }`,
                }
            });

            if (resLvl4.data.user_status !== 0)
            {
                return resLvl4.data;
            }
        }

        return resLvl3.data;
    }
}
