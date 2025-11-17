import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'text', name: 'refresh_token' })
  refreshToken: string | null;

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
