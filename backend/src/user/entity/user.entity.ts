import { Repo } from 'src/repo/entity/repo.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  avatar_url!: string;

  @ManyToMany(() => User, (user) => user.followings)
  followers!: User[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  followings!: User[];

  @OneToMany(() => Repo, (repo) => repo.owner)
  repos!: Repo[];

  @ManyToMany(() => Repo)
  @JoinTable()
  starred!: Repo[];
}
