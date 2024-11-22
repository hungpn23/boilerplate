import { UserEntity } from '@/api/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtPayloadType } from '../auth/auth.type';

@Injectable()
export class UserService {
  async getUser(payload: JwtPayloadType) {
    return await UserEntity.findOne({
      where: { id: payload.userId },
      relations: { sessions: true },
    });
  }
}
