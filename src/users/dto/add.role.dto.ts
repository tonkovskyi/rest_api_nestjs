import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString()
  readonly role: string;
  @IsNumber()
  readonly userId: number;
}
