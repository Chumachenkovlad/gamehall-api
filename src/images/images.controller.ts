import {
  BadRequestException,
  Body,
  Controller,
  FileInterceptor,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SuperUserGuard } from '../common/guards/superuser.guard';
import { ErrorsInterceptor } from '../common/interceptors/errors.interceptor';
import { FilesService } from '../files/files.service';
import { ImageDto } from './image.dto';
import { ImagesService } from './images.service';

const PROPER_MIME_TYPES = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'];

@UseGuards(JwtAuthGuard, SuperUserGuard)
@UseInterceptors(ErrorsInterceptor)
@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly filesService: FilesService
  ) {}

  @Post()
  public async createOne(@Body() imageDto: ImageDto) {
    const id = uuidv4();
    return this.imagesService.createOne({ ...imageDto, id });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        const { mimetype } = file;
        if (PROPER_MIME_TYPES.indexOf(mimetype) === -1) {
          return cb(
            new BadRequestException(
              `Error! Incorrect mimetype '${mimetype}'. Correct: ${PROPER_MIME_TYPES.join(', ')}`
            ),
            false
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1024000
      }
    })
  )
  public async uploadImage(@UploadedFile() file: any) {
    const id = uuidv4();
    const url = await this.filesService.uploadFile(id, file);
    return this.imagesService.createOne({ url, id });
  }

  @Patch(':id')
  public async update(@Param('id') imageId: string, @Body() imageDto: ImageDto) {
    return this.imagesService.update(imageId, imageDto);
  }
}
