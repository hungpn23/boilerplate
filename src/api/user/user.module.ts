import { Module } from '@nestjs/common';
import { UserController } from '@/api/user/user.controller';
import { UserService } from '@/api/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/api/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
