/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
import { eRsRequestResult } from "./rs";

export interface IUserDataSetParams
{
    request_id?: number;
    value_key: string;
    value_data: string;
}

export interface IUserDataSetResponse
{
    request_id: number;
    result: eRsRequestResult;
}

export interface IUserDataGetParams
{
    request_id?: number;
    value_keys: string[];
}

export interface IUserDataGetResponse
{
    request_id: number;
    result: eRsRequestResult;
    values: { value_key: string; value_data: string }[];
}