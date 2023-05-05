/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HyperidService } from 'src/app/services/hyperid/hyperid.service';

@Component({
    selector: 'app-interoperability-actions',
    templateUrl: './interoperability-actions.component.html',
    styleUrls: [ './interoperability-actions.component.scss' ]
})
export class InteroperabilityActionsComponent
{
    @ViewChild('setDataKey') setDataKey: ElementRef<HTMLInputElement> | null = null;
    @ViewChild('setDataValue') setDataValue: ElementRef<HTMLInputElement> | null = null;
    @ViewChild('getDataKey') getDataKey: ElementRef<HTMLInputElement> | null = null;

    public setError$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public getError$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    public json: Partial<Record<any, any>> | null = null;

    public hid: HyperidService = inject(HyperidService);

    public async setData()
    {
        if (this.setDataKey?.nativeElement.value && this.setDataValue?.nativeElement.value)
        {
            this.setError$.next(null);
            this.json = await this.hid.setData(this.setDataKey.nativeElement.value, this.setDataValue.nativeElement.value);
            return;
        }

        this.setError$.next('Please enter a key and value');
        return;
    }

    public async getData()
    {
        if (this.getDataKey?.nativeElement.value)
        {
            this.getError$.next(null);
            this.json = await this.hid.getData(this.getDataKey.nativeElement.value);
            return;
        }

        this.getError$.next('Please enter a key');
    }
}
