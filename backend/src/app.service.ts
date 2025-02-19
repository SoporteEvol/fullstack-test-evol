import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMsj(): string {
    return 'Se agrego la tarea';
  }
}
