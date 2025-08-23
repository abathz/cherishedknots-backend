import utils from '@cherishedknots/utils';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        utils.response(response, { StatusCode: status, Exception: exception.message });
        throw new Error(exception.message, { cause: { statusCode: status, message: exception.message } });
    }
}
