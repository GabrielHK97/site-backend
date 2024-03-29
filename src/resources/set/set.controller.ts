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
import { SetService } from './set.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { Response } from 'express';
import { TypeORMConstants } from 'src/constants/TypeORM.constants';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller(TypeORMConstants.SET_ROUTE)
export class SetController {
  constructor(private readonly setService: SetService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createSetDto: CreateSetDto,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.setService.create(createSetDto);
    return res.status(response.status).send(response.getMetadata());
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const response = await this.setService.findAll();
    return res.status(response.status).send(response.getMetadata());
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.setService.findOne(+id);
    return res.status(response.status).send(response.getMetadata());
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSetDto: UpdateSetDto,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.setService.update(+id, updateSetDto);
    return res.status(response.status).send(response.getMetadata());
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.setService.remove(+id);
    return res.status(response.status).send(response.getMetadata());
  }
}
