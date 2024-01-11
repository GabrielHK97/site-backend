import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Format {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'rotate',
    type: 'boolean',
    nullable: false,
  })
  rotate: boolean;

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;
}
