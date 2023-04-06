import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Response } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('upload')
  create(@Body() createCourseDto: CreateCourseDto, @Res() res: Response) {
    return this.coursesService.create(createCourseDto, res);
  }

  @Get('all')
  findAll(@Res() res: Response) {
    return this.coursesService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
