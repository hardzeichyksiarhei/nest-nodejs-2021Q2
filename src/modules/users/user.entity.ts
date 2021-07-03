import * as bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { default: '' })
  name = '';

  @Column('varchar', { unique: true })
  login!: string;

  @Column('varchar')
  password!: string;

  @BeforeInsert()
  generatePasswordHash() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  static toResponse({ id, login, name }: User) {
    return { id, login, name };
  }
}
