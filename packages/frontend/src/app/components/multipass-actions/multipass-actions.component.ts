/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Component, inject } from '@angular/core';
import { HyperidService } from 'src/app/services/hyperid/hyperid.service';

@Component({
    selector: 'app-multipass-actions',
    templateUrl: './multipass-actions.component.html',
    styleUrls: [ './multipass-actions.component.scss' ]
})
export class MultipassActionsComponent
{
    public hid: HyperidService = inject(HyperidService);
    public json: Partial<Record<any, any>> | null = null;

    public async getUserMultiPassStatus(): Promise<void>
    {
        this.json = await this.hid.getMultiPassStatus();
    }

    public async getWalletWithMultiPassInfo(): Promise<void>
    {
        this.json = await this.hid.getUserWithMultiPassInfo();
    }
}
