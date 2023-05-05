/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { eRsRequestResult } from './rs';

export interface IGetAvailableChainsResponse
{
    request_id: number;
    result: eRsRequestResult,
    wallet_chains: string[];
}

export interface IUserWallet
{
    address: {
        chain: string;
        address: string;
    },
    signed: boolean;
    label: string;
    tags: string[];
}

export interface IGetUserWalletsResponse
{
    request_id: number;
    result: eRsRequestResult,
    wallets: IUserWallet[];
}

export interface IGetUserWalletsByTagParams
{
    request_id?: number;
    wallet_tag: string;
}

export interface IGetUserWalletsByTagResponse extends IGetUserWalletsResponse
{

}

export interface IAddUserWalletParams
{
    request_id?: number;
    wallet_address: {
        chain: string;
        address: string;
    },
    wallet_sign?: string;
    wallet_data_to_sign?: string;
}

export enum eAddUserWalletResult
{
    fail_by_wallet_already_has_owner = -6,
    fail_by_wallet_verification_sign_not_valid = -7
}

export interface IAddUserWalletResponse
{
    request_id: number;
    result: eAddUserWalletResult | eRsRequestResult,
}

export interface IArchiveUserWalletParams
{
    request_id?: number;
    wallet_address: {
        chain: string;
        address: string;
    };
}

export enum eArchiveUserWalletResult
{
    fail_by_wallet_not_exist = -6
}

export interface IArchiveUserWalletResponse
{
    request_id: number;
    result: eArchiveUserWalletResult | eRsRequestResult,
}

export interface IVerifyUserWalletParams
{
    request_id?: number;
    wallet_address: {
        chain: string;
        address: string;
    },
    wallet_sign: string;
    wallet_data_to_sign: string;
}

export enum eVerifyUserWalletResult
{
    fail_by_verification_sign_not_valid = -6,
    fail_by_wallet_not_exist = -7
}

export interface IVerifyUserWalletResponse
{
    request_id: number;
    result: eVerifyUserWalletResult | eRsRequestResult,
}

export interface IUpdateUserWalletLabelParams
{
    request_id?: number;
    wallet_address: {
        chain: string;
        address: string;
    },
    wallet_label: string;
}

export interface IUpdateUserWalletLabelResponse
{
    request_id: number;
    result: eRsRequestResult,
}

export interface IAddUserWalletTagParams
{
    request_id?: number;
    wallet_address: {
        chain: string;
        address: string;
    },
    wallet_tag: string;
}

export enum eAddUserWalletTagResult
{
    fail_by_wallet_not_exist = -6
}

export interface IAddUserWalletTagResponse
{
    request_id: number;
    result: eAddUserWalletTagResult | eRsRequestResult,
}

export interface IArchiveUserWalletTagParams
{
    request_id?: number;
    wallet_address: {
        chain: string;
        address: string;
    },
    wallet_tag: string;
}

export enum eArchiveUserWalletTagResult
{
    fail_by_wallet_not_exist = -6
}

export interface IArchiveUserWalletTagResponse
{
    request_id: number;
    result: eAddUserWalletTagResult | eRsRequestResult,
}