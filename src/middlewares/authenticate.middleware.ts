import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { extractTokenFromHeader } from 'src/functions/extract_token_from_header.function';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = extractTokenFromHeader(req.headers.cookie);
    if (
      await this.jwtService
        .verifyAsync(token)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        })
    ) {
      next();
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Could not validate!' });
    }
  }
  Ï;
}
