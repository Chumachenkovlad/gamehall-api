import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { CommonErrors } from '../common/enums/errors';
import { ImagesRepository } from './constans';
import { ImageDto } from './image.dto';
import { Image } from './image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @Inject(ImagesRepository) private readonly imagesRepository: typeof Image,
    @Inject('Sequelize') private readonly sequelize: Sequelize
  ) {}

  public async createOne(imageDto: ImageDto) {
    return this.imagesRepository.create(imageDto);
  }

  public async update(imageId: string, imageDto: ImageDto) {
    const image = await this.findById(imageId);
    return image.update(imageDto);
  }

  public async findById(imageId: string) {
    const image = this.imagesRepository.findByPrimary(imageId);

    if (!image) {
      throw new NotFoundException(CommonErrors.NOT_FOUND_ENTITY);
    }

    return image;
  }
}
