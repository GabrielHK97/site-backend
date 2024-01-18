import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { TypeORMConstants } from 'src/constants/TypeORM.constants';
import { RarityService } from './rarity.service';

@Controller(TypeORMConstants.RARITY_ROUTE)
export class RarityController {
  constructor(private readonly rarityService: RarityService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const response = await this.rarityService.findAll();
    return res.status(response.status).send(response.getMetadata());
  }
}
