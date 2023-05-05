/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Component } from '@angular/core';
import { FlowModeKey } from '@common/types/auth';
import { HyperidService } from 'src/app/services/hyperid/hyperid.service';

@Component({
    selector: 'app-auth-actions',
    templateUrl: './auth-actions.component.html',
    styleUrls: [ './auth-actions.component.scss' ]
})
export class AuthActionsComponent
{
    public json: Partial<Record<any, any>> | null = null;

    constructor(
        public hid: HyperidService
    ) { }

    public startAuth(flowMode: FlowModeKey): void
    {
        this.hid.login(flowMode);
    }

    public async revokeConsent(): Promise<void>
    {
        this.json = await this.hid.revokeConsent();
    }
}
