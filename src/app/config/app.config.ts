import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.ApiBaseUrl;
export const TokenUrl = environment.TokenUrl;

export const MODULE = "WD18306";

export const STATUS_COLOR = {
    BLACK: '#000000',
    RED: '#FB0404',
    GREEN: '#04B153',
    BLUE: '#0000FF',
    VIOLET: '#6600FF',
    SKY_BLUE: '#00B0F0',
    PINK: '#FF0066',
    ORANGE: '#FF9933',
    PURPLE: '#CC00FF'
};

export const NAVIGATE_ROUTING = {
    AUTH: "auth",
    AUTH_LOGIN: "auth/login",
    PAGE_NOT_FOUND: '404',
    FORBIDDEN: '403',
    LIST_DATA: 'data'
};
console.log(API_BASE_URL + NAVIGATE_ROUTING.LIST_DATA); //https://127.0.0.1:8080/data


export const HttpStatus = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    AMBIGUOUS: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    I_AM_A_TEAPOT: 418,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505
};