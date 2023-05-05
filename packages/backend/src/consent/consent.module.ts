/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

import { ConsentController } from './consent.controller';
import { ConsentService } from './consent.service';

@Module({
    controllers: [ ConsentController ],
    providers: [ ConsentService, AuthService ]
})
export class ConsentModule { }