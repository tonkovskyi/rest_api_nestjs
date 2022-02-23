import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Users } from 'src/users/users.decorator';
import { User } from 'src/users/users.entity';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/signup')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/customer')
  async getCustomer(@Users() user: User) {
    return await this.authService.getCustomer(user.id);
  }
}
