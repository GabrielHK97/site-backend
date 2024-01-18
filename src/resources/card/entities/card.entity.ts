import { Color } from 'src/resources/color/entities/color.entity';
import { Format } from 'src/resources/format/entities/format.entity';
import { Image } from 'src/resources/image/entities/image.entity';
import { RarityOfSet } from 'src/resources/rarity-of-set/entities/rarity-of-set.entity';
import { Set } from 'src/resources/set/entities/set.entity';
import { Subtype } from 'src/resources/subtype/entitites/subtype.entity';
import { Type } from 'src/resources/type/entitites/type.entity';
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
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  attack: number;

  @Column({
    name: 'defense',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  defense: number;

  @ManyToMany(() => Color, (color) => color.card, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  colors: Color[];

  @ManyToMany(() => Type, (type) => type.card, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  types: Type[];

  @ManyToMany(() => Subtype, (subtype) => subtype.card, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  subtypes: Subtype[];

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

  @ManyToMany(() => Set, (set) => set.cards, {
    eager: true,
  })
  @JoinTable()
  sets: Set[];

  @ManyToMany(() => Format, (format) => format.cards, {
    eager: true,
  })
  @JoinTable()
  formats: Format[];

  @OneToMany(() => Image, (image) => image.card, {
    eager: true,
  })
  @JoinColumn()
  images: Image[];

  @OneToMany(() => RarityOfSet, (rarityOfSet) => rarityOfSet.card, {
    eager: true,
  })
  @JoinColumn()
  rarities: RarityOfSet[];
}
