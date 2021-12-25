import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import config from './config';
import * as joi from 'joi';
@Module({
  imports: [UsersModule, ProductsModule, HttpModule, DatabaseModule, ConfigModule.forRoot({
    envFilePath: '.env',
    load: [config],
    isGlobal: true,
    validationSchema: joi.object({
      API_KEY: joi.number().required(),
      DATABASE_NAME: joi.string().required(),
      DATABASE_PORT: joi.number().required(),
    })
  })],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http.get('https://jsonplaceholder.typicode.com/todos')
          .toPromise()
        return tasks.data;
      }, inject: [HttpService]
    }
  ],
})
export class AppModule { }
