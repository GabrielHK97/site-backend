import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    const response = await this.authService.login(authDto);
    return res.status(response.status).send(response.getMetadata());
  }

  @Get()
  async validate(@Req() req: Request, @Res() res: Response) {
    const response = await this.authService.validate(req);
    return res.status(response.status).send(response.getMetadata());
  }
}
