import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('유효 시간이 만료된 토큰 입니다.');
    } else if (err || !user) {
      throw new UnauthorizedException('로그인이 필요한 서비스입니다.');
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
