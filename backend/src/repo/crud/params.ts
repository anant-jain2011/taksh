import { IsString } from 'class-validator';

export class Params {
  @IsString()
  name!: string;

  @IsString()
  username!: string;
}
