import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  serve(@Res() res: Response): Response {
    const response = this.appService.serve();
    return res.status(response.status).send(response.getMetadata());
  }
}
