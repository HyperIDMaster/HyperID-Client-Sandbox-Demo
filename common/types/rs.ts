/* Copyright (C) HyperSphere.ai - All Rights Reserved 
* Unauthorized copying of this file, via any medium is strictly prohibited 
* Proprietary and confidential 
*/
export enum eRsRequestResult
{
    success = 0,
    fail_by_invalid_token = -1,
    fail_by_token_expired = -2,
    fail_by_access_denied = -3,
    fail_by_service_temporary_not_valid = -4,
    fail_by_invalid_parameters = -5,
}