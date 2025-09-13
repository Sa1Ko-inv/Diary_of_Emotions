import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../../../user/guard/auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(JwtGuard));
}
