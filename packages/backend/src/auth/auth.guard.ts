/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(
        private authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const tokens = await this.authService.getTokensFromCookies(request);

        if (!await this.authService.checkTokens(tokens, request, response))
        {
            throw new UnauthorizedException();
        }

        return true;
    }
}
