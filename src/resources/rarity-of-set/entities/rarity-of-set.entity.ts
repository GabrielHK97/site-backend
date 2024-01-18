import { RarityEnum } from 'src/enums/rarity.enum';
import { Card } from 'src/resources/card/entities/card.entity';
import { Rarity } from 'src/resources/rarity/entities/rarity.entity';
import { Set } from 'src/resources/set/entities/set.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RarityOfSet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Set, (set) => set.rarities, { eager: true })
  @JoinColumn()
  set: Set;

  @ManyToOne(() => Card, (card) => card.rarities)
  @JoinColumn()
  card: Card;

  @ManyToOne(() => Rarity, (rarity) => rarity.rarities, {
    eager: true,
  })
  @JoinColumn()
  rarity: Rarity;

  @Column({
    nullable: true,
  })
  cardId: number;
  rarityOfSet: { id: number; name: string };
}
