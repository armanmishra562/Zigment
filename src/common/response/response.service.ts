import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
    successResponse(statusCode: number, message: string, data: any = null) {
        return {
            statusCode,
            message,
            data,
        };
    }

    errorResponse(statusCode: number, message: string, error: string = '') {
        return {
            statusCode,
            message,
            error,
        };
    }
}
