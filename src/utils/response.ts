import type { Response as ExpressResponse } from 'express';

export interface ParamsResponse {
    data?: any;
    statusCode: number;
    message?: string | string[];
    exception?: { [key: string]: string } | string;
}

const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]) => {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as K))) as Omit<T, K>;
};

const Response = (res: ExpressResponse, params: ParamsResponse) => {
    if (params.exception) {
        responseError(res, params);
    } else {
        responseSuccess(res, params);
    }
};

const responseError = (res: ExpressResponse, params: ParamsResponse) => {
    const response = {
        errorCode: `ERR_${params.statusCode}`,
        message: params.exception,
        ...omit(params, ['statusCode', 'message', 'exception']),
    };

    res.status(params.statusCode || 500).json(response);
};

const responseSuccess = (res: ExpressResponse, params: ParamsResponse) => {
    const response = {
        status: params.statusCode,
        message: params.message || 'Success',
        ...omit(params, ['statusCode', 'message', 'exception']),
    };

    res.status(params.statusCode || 500).send(response);
};

export default Response;
