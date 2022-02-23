import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Users = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    return user;
  },
);