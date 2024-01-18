import { Color } from 'src/resources/color/entities/color.entity';
import { Format } from 'src/resources/format/entities/format.entity';
import { Image } from 'src/resources/image/entities/image.entity';
import { RarityOfSet } from 'src/resources/rarity-of-set/entities/rarity-of-set.entity';
import { Set } from 'src/resources/set/entities/set.entity';
import { Subtype } from 'src/resources/subtype/entitites/subtype.entity';
import { Type } from 'src/resources/type/entitites/type.entity';

export class CreateCardDto {
  name: string;
  cost: number;
  attack: number;
  defense: number;
  colors: Color[];
  types: Type[];
  subtypes: Subtype[];
  description: string;
  rarities: RarityOfSet[];
  active: boolean;
  sets: Set[];
  formats: Format[];
  images: Image[];
}
