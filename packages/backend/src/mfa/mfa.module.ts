/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { MfaController } from './mfa.controller';
import { MfaService } from './mfa.service';

@Module({
    imports: [ AuthModule ],
    controllers: [ MfaController ],
    providers: [ MfaService ]
})
export class MfaModule { }
