/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
export enum eSocialType
{
    TELEGRAM = 'telegram',
    TWITTER = 'twitter',
}

export type SocialTypeKeys = 'TELEGRAM' | 'TWITTER';

export interface ISocialInfo
{
    request_id: number,
    result: number,
    user_id: string,
    user_name: string,
    first_name: string,
    last_name: string;
}