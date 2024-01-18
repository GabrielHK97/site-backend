import { RarityOfSet } from 'src/resources/rarity-of-set/entities/rarity-of-set.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rarity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @OneToMany(() => RarityOfSet, (rarityOfSet) => rarityOfSet.rarity)
  rarities: RarityOfSet[];
}
