import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();

        const request = ctx.getRequest<Request>();
        const now = Date.now();

        const log = JSON.stringify({
            ip: request.ip,
            method: request.method,
            url: request.url,
            timestamp: now,
            body: request.body,
        });

        console.log(log);

        return next.handle();
    }
}
