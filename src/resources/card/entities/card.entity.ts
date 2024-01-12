import { Rarity } from 'src/enums/rarity.enum';
import { Format } from 'src/resources/format/entities/format.entity';
import { Image } from 'src/resources/image/entities/image.entity';
import { Set } from 'src/resources/set/entities/set.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card {
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
    name: 'cost',
    type: 'smallint',
    nullable: false,
  })
  cost: number;

  @Column({
    name: 'attack',
    type: 'smallint',
    nullable: false,
  })
  attack: number;

  @Column({
    name: 'defense',
    type: 'smallint',
    nullable: false,
  })
  defense: number;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'rarity',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  rarity: Rarity;

  @Column({
    name: 'active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  @ManyToMany(() => Set, (set) => set.cards)
  @JoinTable()
  sets: Set[];

  @ManyToMany(() => Format, (format) => format.cards)
  @JoinTable()
  formats: Format[];

  @OneToMany(() => Image, (image) => image.card)
  @JoinColumn()
  images: Image[];
}
