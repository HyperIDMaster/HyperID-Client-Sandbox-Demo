/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';


dotenv.config();
async function bootstrap()
{
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    const port = process.env.PORT || 3000;

    await app.listen(port);
}
bootstrap();
