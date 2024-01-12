import { Card } from 'src/resources/card/entities/card.entity';
import { Set } from 'src/resources/set/entities/set.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'url',
    type: 'text',
    nullable: true,
  })
  url: string;

  @Column({
    name: 'artist',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  artist: string;

  @ManyToOne(() => Set, (set) => set.images)
  @JoinColumn()
  set: Set;

  @ManyToOne(() => Card, (card) => card.images)
  @JoinColumn()
  card: Card;
}
