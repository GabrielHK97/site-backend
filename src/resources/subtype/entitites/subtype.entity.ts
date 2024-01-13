import { Card } from 'src/resources/card/entities/card.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subtype {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @ManyToMany(() => Card, (card) => card.subtypes)
  card: Card;
}
