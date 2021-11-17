import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath:[`.env.stage.${process.env.STAGE}`]
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async(configService:ConfigService)=>{
        return {
          type:"postgres",
          autoLoadEntities:true,
          username:configService.get("DB_USERNAME"),
          password:configService.get("DB_PASSWORD"),
          database:configService.get("DB_NAME"),
          host:configService.get("DB_HOST"),
          port:configService.get("DB_PORT"),
          synchronize:configService.get("DB_SYNC")
        }
      }
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
