import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TypeORMConstants } from 'src/constants/TypeORM.constants';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller(TypeORMConstants.CARD_ROUTE)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createCardDto: CreateCardDto,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.cardService.create(createCardDto);
    return res.status(response.status).send(response.getMetadata());
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const response = await this.cardService.findAll();
    return res.status(response.status).send(response.getMetadata());
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.cardService.findOne(+id);
    return res.status(response.status).send(response.getMetadata());
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.cardService.update(+id, updateCardDto);
    return res.status(response.status).send(response.getMetadata());
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.cardService.remove(+id);
    return res.status(response.status).send(response.getMetadata());
  }
}
