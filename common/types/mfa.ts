/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { eRsRequestResult } from "./rs";

export interface IMfaCheckAvailabilityResponse
{
    request_id: number;
    result: eRsRequestResult;
    is_available: boolean;
}

export enum eTemplateId
{
    sign_id = 1,
    transaction = 2,
    exchange = 3,
    action = 4,
    update_wallet_settings = 5,
    remove_wallet = 6,
    wallet_export = 7,
    wallet_export_pk = 8,
    wallet_export_seed = 9,
    remove_wallet_backup = 10,
    load_wallet_backup = 11,
    load_exchange_api_creds = 12,
    change_security_settings = 13,
    suspicious_sign_in = 14
}

export interface IMfaTransactionStartParams
{
    template_id: number;
    request_id?: number;
    values?: string;
    code?: string;
}

export enum eMfaTransactionStartResult 
{
    fail_by_client_not_found = -6,
    fail_by_user_device_not_found = -7,
    fail_by_template_not_found = -8,
    fail_by_user_device_lost = -7
}

export interface IMfaTransactionStartResponse
{
    request_id: number;
    result: eMfaTransactionStartResult | eRsRequestResult;
    transaction_id: number;
    code: string;
}

export interface IMfaStatusGetParams
{
    transaction_id: number;
    request_id?: number;
}

export enum eMfaTransactionStatus
{
    pending = 0,
    completed = 1,
    expired = 2,
    failed = 3,
    canceled = 4
}

export enum eMfaTransactionStatusGetResult 
{
    fail_by_transaction_not_found = -6
}

export enum eMfaTransactionCompleteResult
{
    approve = 0,
    deny = 1
}

export interface IMfaStatusGetResponse
{
    request_id: number;
    result: eMfaTransactionStatusGetResult | eRsRequestResult;
    transaction_id: number;
    transaction_status: eMfaTransactionStatus;
    transaction_complete_result: eMfaTransactionCompleteResult
}

export interface IMfaTransactionCancelParams
{
    transaction_id: number;
    request_id?: number;
}

export enum eMfaTransactionCancelResult 
{
    fail_by_transaction_already_completed = -6
}

export interface IMfaTransactionCancelResponse
{
    request_id: number;
    result: eMfaTransactionCancelResult | eRsRequestResult;
}