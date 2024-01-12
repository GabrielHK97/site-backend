import { Card } from 'src/resources/card/entities/card.entity';
import { Image } from 'src/resources/image/entities/image.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('set')
export class Set {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  code: string;

  @Column({
    name: 'releaseDate',
    type: 'date',
    nullable: false,
  })
  releaseDate: Date;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  @ManyToMany(() => Card, (card) => card.sets, { eager: true })
  cards: Card[];

  @OneToMany(() => Image, (image) => image.set)
  images: Image[];
}
