/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api')
export class AppController
{
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string
    {
        return this.appService.getHello();
    }
}
