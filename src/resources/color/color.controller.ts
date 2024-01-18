import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { TypeORMConstants } from 'src/constants/TypeORM.constants';
import { ColorService } from './color.service';

@Controller(TypeORMConstants.COLOR_ROUTE)
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const response = await this.colorService.findAll();
    return res.status(response.status).send(response.getMetadata());
  }
}
