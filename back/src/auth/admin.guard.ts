import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || user.isAdmin !== true) {
      throw new ForbiddenException('관리자 권한이 필요한 메뉴입니다.');
    }
    return true;
  }
}
