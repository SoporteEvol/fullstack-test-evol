import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Bussinessmodule } from './modules/bussiness/bussiness.module';
import { InfrastructureModule } from './modules/infrastructure/infrastructure.module';
import * as databaseConfig from '../../config/database.config';


@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    Bussinessmodule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
