import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { TypeORMConstants } from 'src/constants/TypeORM.constants';
import { SubtypeService } from './subtype.service';

@Controller(TypeORMConstants.SUBTYPE_ROUTE)
export class SubtypeController {
  constructor(private readonly subtypeService: SubtypeService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const response = await this.subtypeService.findAll();
    return res.status(response.status).send(response.getMetadata());
  }
}
