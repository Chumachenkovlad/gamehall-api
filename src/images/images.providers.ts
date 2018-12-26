import { imagesRepository } from './constans';
import { Image } from './image.entity';

export const IMAGES_PROVIDERS = [
  {
    provide: imagesRepository,
    useValue: Image
  }
];
