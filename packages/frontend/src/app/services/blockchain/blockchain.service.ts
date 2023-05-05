/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { inject, Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';

import { HyperidService } from '../hyperid/hyperid.service';

@Injectable({
    providedIn: 'root'
})
export class BlockchainService
{
    public connectionState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public walletAddress: string | null = null;
    public chainId: number | null = null;
    public walletInfo: {
        label: string;
        tags: string;
    } = {
            label: '',
            tags: ''
        };

    public walletAddInfo = {
        isAdded: false,
        isSigned: false,
    };

    public msgToSign: string = 'Please sign this message to prove you own this wallet';

    private provider: any;
    private ethersProvider: ethers.providers.Web3Provider | null = null;

    private hid: HyperidService = inject(HyperidService);

    constructor() { }

    public async connect(): Promise<void>
    {
        this.provider = (window as any).ethereum;
        this.chainId = Number(this.provider.chainId);
        this.ethersProvider = new ethers.providers.Web3Provider(this.provider);
        const adresses = await this.provider.request({
            method: 'eth_requestAccounts',
        });
        this.walletAddress = adresses[ 0 ];
        this.connectionState$.next(true);

        await this.getWalletInfo();
    }

    public async disconnect(): Promise<void>
    {
        this.provider = null;
        this.ethersProvider = null;
        this.walletAddress = null;
        this.connectionState$.next(false);
        this.walletInfo = {
            label: '',
            tags: ''
        };
        this.walletAddInfo = {
            isAdded: false,
            isSigned: false,
        };
    }

    public async signMessage(): Promise<string>
    {
        const signer = this.ethersProvider?.getSigner(<string>this.walletAddress);

        const signature: string = <string>await signer?.signMessage(this.msgToSign);

        return signature;
    }

    public async getWalletInfo()
    {
        const wallet = (await this.hid.getUserWallets())[ 'wallets' ]
            .find((wallet: any) =>
                wallet.address.toLowerCase() === this.walletAddress?.toLowerCase() &&
                Number(wallet.chain) === Number(this.provider.chainId)
            );

        if (!wallet)
        {
            this.walletAddInfo = {
                isAdded: false,
                isSigned: false,
            };
        }
        else
        {
            this.walletAddInfo = {
                isAdded: true,
                isSigned: wallet.signed,
            };
        }

        this.walletInfo = {
            label: wallet?.label || '',
            tags: JSON.stringify(wallet?.tags || [])
        };
    }
}
