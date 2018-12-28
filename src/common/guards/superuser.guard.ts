import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ConfigService } from '../../config/config.service';

@Injectable()
export class SuperUserGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (this.configService.isDevelopment) {
      return true;
    }

    const {
      user: { id }
    } = context.switchToHttp().getRequest();

    return this.configService.superuserIds.indexOf(id) !== -1;
  }
}
