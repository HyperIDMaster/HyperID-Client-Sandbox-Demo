/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
export enum eFlowMode
{
    WEB2_SIGN_IN = 0,
    WEB2_SIGN_UP = 1,
    WEB3_SIGN_IN = 3,
    WEB2_WEB3_SIGN_IN = 4,
    WEB2_WEB3_SIGN_UP = 5,
    UPGRADE_FROM_GUEST = 6,
    SETUP_MFA = 7,
}

export type FlowModeKey = 'WEB2_SIGN_IN' | 'WEB2_SIGN_UP' | 'WEB3_SIGN_IN' | 'WEB2_WEB3_SIGN_IN' | 'WEB2_WEB3_SIGN_UP' | 'UPGRADE_FROM_GUEST' | 'SETUP_MFA';

export interface IGetTokensResponse
{
    refresh_expires_in: number;
    refresh_token: string;
    expires_in: number;
    access_token: string;
}

export interface IUserInfo
{
    email: string;
    isGuest: boolean;
    wallet: string | undefined;
}

export interface IIntrospectResponse
{
    active: boolean;
    exp?: number;
    iat?: number;
    auth_time?: number;
    iss?: string;
    sub?: string;
    typ?: string;
    azp?: string;
    email?: string;
    email_verified?: boolean;
    scope?: string;
}

export interface ITokens
{
    refresh_token: string;
    access_token: string;
}

export interface IAuthorizeParams
{
    flow_mode: eFlowMode;
    redirect_url: string;
}

export interface IAuthorizeCallbackParams
{
    code: string;
}