/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MULTIPASS_ABI } from '@common/blockchain/abi/multipass';
import { MULTIPASS, RPC_URLS } from '@common/blockchain/config';
import { eFlowMode, FlowModeKey, IUserInfo } from '@common/types/auth';
import { eKycVerificationLevel } from '@common/types/kyc';
import { IMfaStatusGetResponse, IMfaTransactionStartResponse } from '@common/types/mfa';
import { eSocialType, SocialTypeKeys } from '@common/types/social';
import { Contract, ethers } from 'ethers';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import {
    IAddUserWalletParams,
    IArchiveUserWalletParams,
    IUpdateUserWalletLabelParams,
    IVerifyUserWalletParams,
} from './../../../../../../common/types/user-wallets';

@Injectable({
    providedIn: 'root'
})
export class HyperidService
{
    public authState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public userInfo$: BehaviorSubject<null | IUserInfo> = new BehaviorSubject<null | IUserInfo>(null);
    public mfaState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public pendingMfaAction$: BehaviorSubject<IMfaTransactionStartResponse | null> = new BehaviorSubject<IMfaTransactionStartResponse | null>(null);
    private readonly walletWithMultiPass: string = '0xc8556adbf739ed794393abcaaaa27a798fa22787';

    constructor(
        private http: HttpClient,
    )
    {
        this.check();
    }

    public async check(): Promise<void>
    {
        try
        {
            const response = await firstValueFrom(
                this.http.get(
                    '/api/auth/check'
                )
            ) as { result: boolean; };

            if (response.result === true)
            {
                await this.getUserInfo();
                await this.checkMfa();
                this.authState$.next(true);
                return;
            }
            this.authState$.next(false);
            this.userInfo$.next(null);
        }
        catch (e)
        {
            this.authState$.next(false);
            this.userInfo$.next(null);
        }
    }

    public async getFullKycStatus(): Promise<any>
    {
        return await firstValueFrom(
            this.http.get(
                '/api/kyc/get-detailed-status',
                {
                    params: {
                        verification_level: eKycVerificationLevel.basic
                    }
                }
            )
        );
    }

    public async getShortKycStatus(): Promise<any>
    {
        return await firstValueFrom(
            this.http.get(
                '/api/kyc/get-top-level-status'
            )
        );
    }

    public async getKycLink(level: eKycVerificationLevel): Promise<void>
    {
        const response: any = await firstValueFrom(
            this.http.post(
                '/api/kyc/get-flow-link',
                {
                    verification_level: level
                }
            )
        );

        location.href = response[ 'url' ];
    }

    public async addSocialInfo(socialKey: SocialTypeKeys)
    {
        const response: any = await firstValueFrom(
            this.http.post(
                '/api/social/add-social-info',
                {
                    social: eSocialType[ socialKey ]
                }
            )
        );

        location.href = response.url;
    }

    public async getSocialInfo(socialKey: SocialTypeKeys)
    {
        return await firstValueFrom(
            this.http.post(
                '/api/social/get-social-info',
                {
                    social: eSocialType[ socialKey ]
                }
            )
        );
    }

    public async startMfaAction()
    {
        const res = await firstValueFrom(
            this.http.post(
                '/api/mfa/transaction-start',
                {}
            )
        ) as IMfaTransactionStartResponse;

        this.pendingMfaAction$.next(res);

        return res;
    }

    public async getMfaActionStatus(transactionId: string): Promise<any>
    {
        const res = await firstValueFrom(
            this.http.post(
                '/api/mfa/transaction-status-get',
                {
                    transaction_id: transactionId
                }
            )
        ) as IMfaStatusGetResponse;

        if (res.transaction_status === 1)
            this.pendingMfaAction$.next(null);

        return res;
    }

    public async mfaActionCancel(transactionId: string): Promise<any>
    {
        const res = await firstValueFrom(
            this.http.post(
                '/api/mfa/transaction-cancel',
                {
                    transaction_id: transactionId
                }
            )
        ) as IMfaStatusGetResponse;

        this.pendingMfaAction$.next(null);

        return res;
    }

    public async getMultiPassStatus(): Promise<any>
    {
        return await firstValueFrom(
            this.http.get(
                '/api/multipass'
            )
        );
    }

    public async getUserWithMultiPassInfo(): Promise<any>
    {
        const jsonRpcProviders = RPC_URLS[ 137 ].map(url =>
        {
            return {
                provider: new ethers.providers.JsonRpcProvider(url, 137)
            };
        });

        const provider = new ethers.providers.FallbackProvider(jsonRpcProviders, 1);
        const contract = new Contract(MULTIPASS[ 137 ], MULTIPASS_ABI, provider);
        const userInfo = await contract[ 'users_' ](this.walletWithMultiPass);

        return {
            idCountryCode: userInfo.idCountryCode,
            phoneCountryCode: userInfo.phoneCountryCode,
            residence: userInfo.residence,
            kycTime: userInfo.kycTime.toNumber(),
            userIdHash: userInfo.userIdHash,
            hidLevel: userInfo.hidLevel,
        };
    }

    public async setData(key: string, value: string): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                'api/services-interoperability/set',
                {
                    value_key: key,
                    value_data: value,
                }
            )
        );
    }

    public async getData(key: string): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                'api/services-interoperability/get',
                {
                    value_keys: [ key ],
                }
            )
        );
    }

    public async getChains(): Promise<any>
    {
        return await firstValueFrom(
            this.http.get(
                '/api/user-wallets/available-chains'
            )
        );
    }

    public async getUserWallets(): Promise<any>
    {
        return await firstValueFrom(
            this.http.get(
                '/api/user-wallets'
            )
        );
    }

    public async getUserWalletsByTag(tag: string): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                '/api/user-wallets/get-by-tag',
                {
                    wallet_tag: tag
                }
            )
        );
    }

    public async addWallet(req: IAddUserWalletParams): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                '/api/user-wallets/add',
                req
            )
        );
    }

    public async archiveWallet(req: IArchiveUserWalletParams): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                '/api/user-wallets/archive',
                req
            )
        );
    }

    public async verifyWallet(req: IVerifyUserWalletParams): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                '/api/user-wallets/verify',
                req
            )
        );
    }

    public async addWalletTag(req: {
        wallet_address: {
            chain: string;
            address: string;
        },
        wallet_tag: string;
    }): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                '/api/user-wallets/add-tag',
                req
            )
        );
    }

    public async archiveTag(req: {
        wallet_address: {
            chain: string;
            address: string;
        },
        wallet_tag: string;
    }): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                '/api/user-wallets/archive-tag',
                req
            )
        );
    }

    public async updateWalletLabel(req: IUpdateUserWalletLabelParams): Promise<any>
    {
        return await firstValueFrom(
            this.http.post(
                '/api/user-wallets/update-label',
                req
            )
        );
    }

    public async login(flow: FlowModeKey): Promise<void>
    {
        const res = await firstValueFrom(
            this.http.post('/api/auth/authorize', {
                flow_mode: eFlowMode[ flow ],
                redirect_url: location.href
            })
        ) as { url: string; };
        location.href = res.url;
    }

    public async logout(): Promise<void>
    {
        try
        {
            await firstValueFrom(
                this.http.get(
                    '/api/auth/logout'
                )
            );

            this.check();
        }
        catch (e)
        {
            this.check();
        }
    }

    public async revokeConsent(): Promise<any>
    {
        return await firstValueFrom(
            this.http.get(
                '/api/consent/revoke'
            )
        );
    }

    private async getUserInfo(): Promise<void>
    {
        const res = <IUserInfo>(
            await firstValueFrom(
                this.http.get('/api/auth/user-info')
            )
        );

        this.userInfo$.next(res);
    }

    private async checkMfa(): Promise<void>
    {
        const res: any = await firstValueFrom(
            this.http.get('/api/mfa/check-availability')
        );

        this.mfaState$.next(res.is_available);
    }
}
