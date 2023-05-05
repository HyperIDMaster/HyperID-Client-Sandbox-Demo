/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { Module } from '@nestjs/common';
import { UserWalletsController } from './user-wallets.controller';
import { UserWalletsService } from './user-wallets.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserWalletsController],
  providers: [UserWalletsService]
})
export class UserWalletsModule { }
