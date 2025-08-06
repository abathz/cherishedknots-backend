import type { Response as ExpressResponse } from 'express';

export interface ParamsResponse {
    [key: string]: any;
    StatusCode?: number;
    Message?: string | string[];
    Exception?: { [key: string]: string } | string;
}

const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as K))) as Omit<T, K>;
};

const Response = (res: ExpressResponse, params: ParamsResponse) => {
    if (params.Exception) {
        responseError(res, params);
    } else {
        responseSuccess(res, params);
    }
};

const responseError = (res: ExpressResponse, params: ParamsResponse) => {
    const response = {
        ErrorCode: `ERR_${params.StatusCode}`,
        Message: params.Exception,
        ...omit(params, ['StatusCode', 'Message', 'Exception']),
    };

    res.status(params.StatusCode || 500).json(response);
};

const responseSuccess = (res: ExpressResponse, params: ParamsResponse) => {
    const response = {
        Status: params.StatusCode,
        Message: params.Message || 'Success',
        ...omit(params, ['StatusCode', 'Message', 'Exception']),
    };

    res.status(params.StatusCode || 500).send(response);
};

export default Response;
