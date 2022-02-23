import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add.role.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName } = dto;
    const role = await this.roleService.getRoleByValue('USER');
    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    user.roles = [role];
    await user.save();
    return user;
  }

  async getAllUsers(): Promise<Array<User>> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }
  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async addRole(dto: AddRoleDto): Promise<void> {
    const user = await this.userRepository.findOne(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.role);
    if (role && user) {
      user.roles.push(role);
      await user.save();
    }
    throw new HttpException('User Or Role Not Found', HttpStatus.NOT_FOUND);
  }
}
