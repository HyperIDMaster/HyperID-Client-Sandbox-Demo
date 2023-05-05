/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'prettyprint'
})
export class PrettyPrintPipe implements PipeTransform
{
    transform(val: any)
    {
        return JSON.stringify(val, null, 2)
            .replaceAll(' ', '&nbsp;')
            .replaceAll('\n', '<br/>');
    }
}
