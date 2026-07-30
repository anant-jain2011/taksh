import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Repo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'jsonb',
    default: { root: [] },
  })
  folder_structure!: object;

  @ManyToOne(() => User, (user) => user.repos)
  owner!: User;

  @ManyToMany(() => User, (user) => user.starred)
  stars!: User[];
}
