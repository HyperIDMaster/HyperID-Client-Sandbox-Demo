/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-json-showcase',
    templateUrl: './json-showcase.component.html',
    styleUrls: [ './json-showcase.component.scss' ]
})
export class JsonShowcaseComponent
{
    @Input('json') json: Partial<Record<any, any>> | null = null;
    @Input('height') height: number = 142;
}
