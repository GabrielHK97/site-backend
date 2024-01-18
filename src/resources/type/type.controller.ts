import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { TypeORMConstants } from 'src/constants/TypeORM.constants';
import { TypeService } from './type.service';

@Controller(TypeORMConstants.TYPE_ROUTE)
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const response = await this.typeService.findAll();
    return res.status(response.status).send(response.getMetadata());
  }
}
