import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ServiceData } from 'src/classes/service_data.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from 'src/interfaces/token.interface';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { extractTokenFromHeader } from 'src/functions/extract_token_from_header.function';
import { Account } from 'src/resources/account/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}
  async login(authDto: AuthDto): Promise<ServiceData<Token>> {
    try {
      const account = await this.accountRepository.findOneByOrFail({
        username: authDto.username,
      });
      console.log(account);
      if (await bcrypt.compare(authDto.password, account.password)) {
        return new ServiceData<Token>(HttpStatus.OK, 'Logged in!', {
          token: this.jwtService.sign({
            id: account.id,
            username: account.username,
          }),
        });
      }
    } catch (error) {
      return new ServiceData<Token>(HttpStatus.BAD_REQUEST, 'Could not login!');
    }
  }

  async authenticate(req: Request): Promise<ServiceData> {
    const token = extractTokenFromHeader(req.headers.cookie);
    return await this.jwtService
      .verifyAsync(token)
      .then(() => {
        return new ServiceData(HttpStatus.OK, 'Validated!');
      })
      .catch(() => {
        return new ServiceData(HttpStatus.BAD_REQUEST, 'Could not validate!');
      });
  }
}
