/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HyperidService } from 'src/app/services/hyperid/hyperid.service';

@Component({
    selector: 'app-mfa-actions',
    templateUrl: './mfa-actions.component.html',
    styleUrls: [ './mfa-actions.component.scss' ]
})
export class MfaActionsComponent
{
    public json: Partial<Record<any, any>> | null = null;

    constructor(
        public hid: HyperidService
    )
    {

    }

    public async startTransaction()
    {
        this.json = await this.hid.startMfaAction();
    }

    public async getActionStatus()
    {
        const action = await firstValueFrom(this.hid.pendingMfaAction$);

        this.json = await this.hid.getMfaActionStatus(<any>(action?.transaction_id));
    }

    public async cancelAction()
    {
        const action = await firstValueFrom(this.hid.pendingMfaAction$);

        this.json = await this.hid.mfaActionCancel(<any>(action?.transaction_id));
    }
}
