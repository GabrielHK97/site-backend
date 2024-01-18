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
import { FormatService } from './format.service';
import { CreateFormatDto } from './dto/create-format.dto';
import { UpdateFormatDto } from './dto/update-format.dto';
import { TypeORMConstants } from 'src/constants/TypeORM.constants';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller(TypeORMConstants.FORMAT_ROUTE)
export class FormatController {
  constructor(private readonly formatService: FormatService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createFormatDto: CreateFormatDto,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.formatService.create(createFormatDto);
    return res.status(response.status).send(response.getMetadata());
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const response = await this.formatService.findAll();
    return res.status(response.status).send(response.getMetadata());
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.formatService.findOne(+id);
    return res.status(response.status).send(response.getMetadata());
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFormatDto: UpdateFormatDto,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.formatService.update(+id, updateFormatDto);
    return res.status(response.status).send(response.getMetadata());
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.formatService.remove(+id);
    return res.status(response.status).send(response.getMetadata());
  }
}
