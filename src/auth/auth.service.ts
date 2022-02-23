import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(authDto);
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Email Already Exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
  }

  private async validateUser(authDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authDto;
    const user = await this.userService.getUserByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return user;
    } else {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }
  }
  async getCustomer(id: number) {
    const user = await this.userService.getUserById(id);
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
