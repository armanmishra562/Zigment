/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header('API_KEYs');
    if (apiKey !== process.env.API_KEYs) {
      throw new UnauthorizedException('Invalid API key');
    }
    next();
  }
}
