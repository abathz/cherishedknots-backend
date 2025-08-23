import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class NetworkLogInterceptor implements NestInterceptor {
    private readonly logger = new Logger(NetworkLogInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const { ip, method, url } = request;
        const start = Date.now();

        return next.handle().pipe(
            finalize(() => {
                const duration = Date.now() - start;
                const statusCode = response.statusCode;

                const message = `${method} ${url} - ${duration}ms - IP: ${ip}`;

                if (statusCode >= 500) {
                    this.logger.error(message);
                } else if (statusCode >= 400) {
                    this.logger.warn(message);
                } else {
                    this.logger.log(message);
                }
            })
        );
    }
}
