import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import mongoose from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('wipe')
  async wipeDataBase() {
    try {
      await mongoose.connect(process.env.DATABASE_URL, {});
      await mongoose.connection.db.dropDatabase();
      console.log('Database wiped');
    } catch (error) {
      console.log(error);
    }
  }
}
