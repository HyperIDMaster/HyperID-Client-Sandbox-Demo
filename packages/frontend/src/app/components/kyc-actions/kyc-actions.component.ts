/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Component } from '@angular/core';
import { HyperidService } from 'src/app/services/hyperid/hyperid.service';

@Component({
    selector: 'app-kyc-actions',
    templateUrl: './kyc-actions.component.html',
    styleUrls: [ './kyc-actions.component.scss' ]
})
export class KycActionsComponent
{
    public json: Partial<Record<any, any>> | null = null;
    constructor(
        public hid: HyperidService
    )
    {

    }

    public async getFullStatus()
    {
        this.json = await this.hid.getFullKycStatus();
    }

    public async getShortStatus()
    {
        this.json = await this.hid.getShortKycStatus();
    }
}
