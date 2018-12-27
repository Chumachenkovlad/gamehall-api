import { ImagesRepository } from './constans';
import { Image } from './image.entity';

export const IMAGES_PROVIDERS = [
  {
    provide: ImagesRepository,
    useValue: Image
  }
];
