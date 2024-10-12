import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../modules/user/user.service';
import { Role } from '../../enums/role.enum';
import { isUUID } from 'class-validator';

@Injectable()
export class AdminRoleCheckMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET' || req.method === 'DELETE') {
      return next();
    }
    
    const userId = req.body.created_by;

    if (!isUUID(userId)) {
      throw new BadRequestException('Invalid body(created_by) format');
    }

    const user = await this.userService.findOneUser(userId);

    if (!user || user.role !== Role.ADMIN) {
      throw new UnauthorizedException('You are not an admin');
    }

    next();
  }
}