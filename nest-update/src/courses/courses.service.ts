import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './entities/course.entity';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto, res: Response) {
    const { image_url, video_url, description, questions } = createCourseDto;
    if (!image_url) {
      return res
        .status(422)
        .json({ message: 'O campo de imagem é obrigatório' });
    }
    if (!video_url) {
      return res
        .status(422)
        .json({ message: 'O campo de vídeo é obrigatório' });
    }
    if (!description) {
      return res
        .status(422)
        .json({ message: 'O campo de descrição é obrigatório' });
    }
    if (!questions) {
      return res
        .status(422)
        .json({ message: 'O campo de questões é obrigatório' });
    }

    const newCourse = new this.courseModel({
      image_url,
      video_url,
      description,
      questions,
    });

    try {
      await newCourse.save();
      return res.status(201).json({ message: 'Curso cadastrado com sucesso!' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ messag: 'Erro no servidor!' });
    }
  }

  async findAll(res: Response) {
    const courses = await this.courseModel.find();
    if (!courses) {
      return res.status(422).json({ message: 'Nenhum curso encontrado' });
    }
    try {
      return res.status(200).json({ message: courses });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor!' });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
