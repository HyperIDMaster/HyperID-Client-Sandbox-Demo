/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { eRsRequestResult } from "./rs";

export enum eKycVerificationLevel
{
    social = 2,
    basic = 3,
    full = 4
}

export enum eKycUserStatus
{
    none = 0,
    pending = 1,
    success = 2,
    fail_retryable = 3,
    fail_final = 4,
    deleted = 5
}

export enum eKycResult
{
    fail_by_billing = -6,
    fail_by_user_not_found = -7,
    fail_by_kyc_deleted = -8,
}

export interface IKycTopLevelStatusResponse
{
    request_id: number;
    result: eKycResult;
    verification_level: number;
    create_dt: number;
    review_create_dt: number;
    review_complete_dt: number;
}

export interface IKycDetailedStatusResponse
{
    request_id: number;
    result: eRsRequestResult | eKycResult;
    verification_level: eKycVerificationLevel;
    user_status: eKycUserStatus;
    kyc_id: string;
    first_name: string;
    last_name: string;
    birthday: string;
    country_a2: string;
    country_a3: string;
    provided_country_a2: string;
    provided_country_a3: string;
    address_country_a2: string;
    address_country_a3: string;
    phone_number_country_a2: string;
    phone_number_country_a3: string;
    phone_number_country_code: string;
    ip_countries_a2: string[];
    ip_countries_a3: string[];
    moderation_comment: string;
    reject_reasons: string[];
    support_link: string;
    create_dt: number;
    review_create_dt: number;
    review_complete_dt: number;
    expiration_dt: number;
}

export interface IKycStartFlowParams
{
    verification_level: eKycVerificationLevel;
    kyc_sub_project?: string;
}

export interface IKycDetailedStatusParams
{
    verification_level: eKycVerificationLevel;
}