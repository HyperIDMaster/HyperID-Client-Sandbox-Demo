/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Module } from '@nestjs/common';
import { ServicesInteroperabilityController } from './services-interoperability.controller';
import { ServicesInteroperabilityService } from './services-interoperability.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [ServicesInteroperabilityController],
    providers: [ServicesInteroperabilityService]
})
export class ServicesInteroperabilityModule { }
