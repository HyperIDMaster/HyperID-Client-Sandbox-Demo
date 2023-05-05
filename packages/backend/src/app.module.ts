/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConsentModule } from './consent/consent.module';
import { KycModule } from './kyc/kyc.module';
import { MfaModule } from './mfa/mfa.module';
import { SocialModule } from './social/social.module';
import { MultipassModule } from './multipass/multipass.module';
import { ServicesInteroperabilityModule } from './services-interoperability/services-interoperability.module';
import { UserWalletsModule } from './user-wallets/user-wallets.module';

@Module({
    imports: [
        AuthModule,
        AuthModule,
        KycModule,
        ConsentModule,
        MfaModule,
        SocialModule,
        MultipassModule,
        ServicesInteroperabilityModule,
        UserWalletsModule
    ],
    controllers: [ AppController ],
    providers: [ AppService ],
})
export class AppModule { }
