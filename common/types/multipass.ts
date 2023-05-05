/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { eRsRequestResult } from "./rs";

export enum eMultipassResult 
{
    fail_by_not_exist = -6
}

export enum eVerificationLevel
{
    user = 0,
    phone_number = 1,
    social = 2,
    kyc_basic = 3,
    kyc_full = 4
}

export interface IMultipass
{
    user_hash_id: string;
    id_country_a3: string;
    pn_country_a3: string;
    residence_country_a3: string;
    telegram_user_id: string;
    telegram_user_name: string;
    twitter_user_id: string;
    twitter_user_name: string;
    verification_level: eVerificationLevel;
    review_complete_dt: number;
}

export interface IMultipassResponse
{
    request_id: number;
    result: eMultipassResult | eRsRequestResult;
    multipass: IMultipass;
}