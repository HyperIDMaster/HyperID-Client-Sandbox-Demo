/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Module } from '@nestjs/common';
import { MultipassController } from './multipass.controller';
import { MultipassService } from './multipass.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [MultipassController],
    providers: [MultipassService]
})
export class MultipassModule { }
