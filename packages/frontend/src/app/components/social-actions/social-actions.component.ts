/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Component, inject } from '@angular/core';
import { SocialTypeKeys } from '@common/types/social';
import { HyperidService } from 'src/app/services/hyperid/hyperid.service';

@Component({
    selector: 'app-social-actions',
    templateUrl: './social-actions.component.html',
    styleUrls: [ './social-actions.component.scss' ]
})
export class SocialActionsComponent
{
    public hid: HyperidService = inject(HyperidService);

    public json: Partial<Record<any, any>> | null = null;

    public async getSocialInfo(social: SocialTypeKeys)
    {
        this.json = await this.hid.getSocialInfo(social);
    }
}
