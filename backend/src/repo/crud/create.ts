import { IsNotEmpty, IsString } from 'class-validator';

export class Create {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  username!: string;

  @IsString()
  folder_structure!: object;
}
