/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { SocialController } from './social.controller';
import { SocialService } from './social.service';

@Module({
    imports: [ AuthModule ],
    controllers: [ SocialController ],
    providers: [ SocialService ]
})
export class SocialModule { }