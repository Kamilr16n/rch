/*
 * Copyright 2020-present columns.ai
 *
 * The code belongs to https://columns.ai
 * Terms & conditions to be found at `LICENSE.txt`.
 */

// a few common API request headers
export const HEAD_SIMULATION = 'simulation';
export const HEAD_WORKSPACE = 'workspace';
export const HEAD_APP = 'app';
export const HEAD_DEVICE = 'device';
export const HEAD_TIER = 'tier';
export const HEAD_REFERRAL = 'referral';

// API or service status code
export enum StatusCode {
  // error code from Nebula
  SUCCESS = 0,
  TEMPLATE_NOT_FOUND = 1,
  MISSING_PARAM = 2,
  MISSING_BUCKET_VALUE = 3,
  UNAUTHORIZED = 4,
  EMPTY_RESULT = 5,
  NOT_SUPPORTED = 6,
  IN_LOADING = 7,
  PARSE_ERROR = 8,
  BAD_SCHEMA = 9,
  // error code from other areas
  HTTP_BAD_REQUEST = 400,
  HTTP_NOT_AUTHENTICATE = 401,
  HTTP_NOT_AUTHORIZED = 403,
  HTTP_NOT_FOUND = 404,
  HTTP_NOT_ALLOWED = 405,
  HTTP_TIMEOUT = 408,
  HTTP_INTERNAL_ERROR = 500,
  HTTP_SERVICE_UNAVAILABLE = 503,

  // special error codes
  LOCK_UNACQUIRED = 1000,
  NO_ACCOUNTS = 1001,
  USE_CACHE = 1002,
  FETCH_TRANSACTIONS = 1003,
  NO_AUTH_GSHEET = 1004,
  FAILED_READ_GSHEET = 1005,
  FAILED_PROCESS_ROW = 1006,
};