/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService
{
    getHello(): string
    {
        return 'Hello World!';
    }
}
