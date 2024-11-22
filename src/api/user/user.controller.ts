import { UserService } from '@/api/user/user.service';
import { JwtPayload } from '@/decorators/jwt-payload.decorator';
import { Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { JwtPayloadType } from '../auth/auth.type';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @SerializeOptions({ type: UserEntity })
  @Get('me')
  async getUser(@JwtPayload() payload: JwtPayloadType): Promise<UserEntity> {
    return await this.userService.getUser(payload);
  }

  @Post('/me/update')
  async updateUser() {
    return 'update profile';
  }
}
