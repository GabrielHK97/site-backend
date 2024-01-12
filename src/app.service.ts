import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceData } from './classes/service_data.class';

@Injectable()
export class AppService {
  serve(): ServiceData {
    return new ServiceData(HttpStatus.OK, 'Server online!');
  }
}
