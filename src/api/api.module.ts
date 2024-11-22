import { AuthModule } from '@/api/auth/auth.module';
import { UserModule } from '@/api/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, AuthModule],
})
export class ApiModule {}
