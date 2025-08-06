import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import utils from '../utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        if (status === Number(HttpStatus.INTERNAL_SERVER_ERROR)) {
            utils.response(response, {
                StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                Exception: 'Internal Server Error',
            });
            throw new Error(exception.message, {
                cause: { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' },
            });
        }

        utils.response(response, { StatusCode: status, Exception: exception.message });
        throw new Error(exception.message, { cause: { statusCode: status, message: exception.message } });
    }
}
