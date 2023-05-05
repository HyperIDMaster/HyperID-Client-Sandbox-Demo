/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { HyperidService } from 'src/app/services/hyperid/hyperid.service';

@Component({
    selector: 'app-user-wallets-actions',
    templateUrl: './user-wallets-actions.component.html',
    styleUrls: [ './user-wallets-actions.component.scss' ]
})
export class UserWalletsActionsComponent
{
    public blockchainService: BlockchainService = inject(BlockchainService);

    public addTagError$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public archiveTagError$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public updateLabelError$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    public hid: HyperidService = inject(HyperidService);

    public json: Partial<Record<any, any>> | null = null;

    public async getChains(): Promise<void>
    {
        this.json = await this.hid.getChains();
    }

    public async getUserWallets(tag?: string): Promise<void>
    {
        this.json = null;
        try
        {
            if (tag)
            {
                this.json = await this.hid.getUserWalletsByTag(tag);
                return;
            }

            this.json = await this.hid.getUserWallets();
        }
        catch (e: any)
        {
            this.json = {
                error: e.message
            };
        }
    }

    public async connect()
    {
        await this.blockchainService.connect();
    }

    public async addWallet(shouldSign: boolean = false)
    {
        let signature;
        this.json = null;

        if (shouldSign)
        {
            signature = await this.blockchainService.signMessage();
            try
            {
                this.json = await this.hid.addWallet({
                    wallet_address: {
                        chain: String(this.blockchainService.chainId),
                        address: <string>this.blockchainService.walletAddress
                    },
                    wallet_sign: signature,
                    wallet_data_to_sign: this.blockchainService.msgToSign
                });
                await this.blockchainService.getWalletInfo();
            }
            catch (e: any)
            {
                this.json = {
                    error: e.message
                };
            }
            return;
        }

        try
        {
            this.json = await this.hid.addWallet({
                wallet_address: {
                    chain: String(this.blockchainService.chainId),
                    address: <string>this.blockchainService.walletAddress
                }
            });
            await this.blockchainService.getWalletInfo();
        }
        catch (e: any)
        {
            this.json = {
                error: e.message
            };
        }
    }

    public async archive()
    {
        this.json = null;
        try
        {
            this.json = await this.hid.archiveWallet({
                wallet_address: {
                    chain: String(this.blockchainService.chainId),
                    address: <string>this.blockchainService.walletAddress
                },
            });
            await this.blockchainService.getWalletInfo();
        }
        catch (e: any)
        {
            this.json = {
                error: e.message
            };
        }
    }

    public async verify()
    {
        this.json = null;
        try
        {
            const signature = await this.blockchainService.signMessage();

            this.json = await this.hid.verifyWallet({
                wallet_address: {
                    chain: String(this.blockchainService.chainId),
                    address: <string>this.blockchainService.walletAddress
                },
                wallet_sign: signature,
                wallet_data_to_sign: this.blockchainService.msgToSign
            });
            await this.blockchainService.getWalletInfo();

        }
        catch (e: any)
        {
            this.json = {
                error: e.message
            };
        }
    }

    public async addTag(tag: string)
    {
        this.json = null;
        try
        {
            if (tag)
            {
                this.addTagError$.next(null);
                this.json = await this.hid.addWalletTag({
                    wallet_address: {
                        chain: String(this.blockchainService.chainId),
                        address: <string>this.blockchainService.walletAddress
                    },
                    wallet_tag: tag
                });
                await this.blockchainService.getWalletInfo();
                return;
            }

            this.addTagError$.next('Please enter a tag');
        }
        catch (e: any)
        {
            this.json = {
                error: e.message
            };
        }
    }

    public async updateLabel(label: string)
    {
        this.json = null;
        try
        {
            if (label)
            {
                this.updateLabelError$.next(null);
                this.json = await this.hid.updateWalletLabel({
                    wallet_address: {
                        chain: String(this.blockchainService.chainId),
                        address: <string>this.blockchainService.walletAddress
                    },
                    wallet_label: label
                });
                await this.blockchainService.getWalletInfo();
                return;
            }

            this.updateLabelError$.next('Please enter a label');
        }
        catch (e: any)
        {
            this.json = {
                error: e.message
            };
        }
    }

    public async archiveTag(tag: string)
    {
        this.json = null;
        try
        {
            if (tag)
            {
                this.archiveTagError$.next(null);
                this.json = await this.hid.archiveTag({
                    wallet_address: {
                        chain: String(this.blockchainService.chainId),
                        address: <string>this.blockchainService.walletAddress
                    },
                    wallet_tag: tag
                });
                await this.blockchainService.getWalletInfo();
                return;
            }

            this.archiveTagError$.next('Please enter a tag');
        }
        catch (e: any)
        {
            this.json = {
                error: e.message
            };
        }
    }
}
