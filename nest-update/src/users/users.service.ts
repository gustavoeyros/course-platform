import { BadRequestException, Body, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { hashPassword, comparePasswords } from 'src/utils/bcrypt';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Course, CourseDocument } from 'src/courses/entities/course.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(@Body() createUserDto: CreateUserDto, @Body() userInfo: any) {
    const requiredFields = ['name', 'email', 'password'];
    requiredFields.some((field) => {
      if (!userInfo[field]) {
        throw new BadRequestException('Something bad happened', {
          cause: new Error(),
          description: `O campo ${field} é obrigatório!`,
        });
      }
    });

    if (userInfo.password !== userInfo.confirmpassword) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: `As senhas devem ser iguais!`,
      });
    }

    const userExists = await this.userModel.findOne({ email: userInfo.email });

    if (userExists) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: `O usuário já existe!`,
      });
    }

    const password = hashPassword(userInfo.password);
    const newUser = new this.userModel({ ...createUserDto, password });

    return newUser.save();
  }

  async login(@Body() { email, password }, @Res() res: Response) {
    const userExists = await this.userModel.findOne({ email: email });

    if (!email) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: `O campo email é obrigatório!`,
      });
    }
    if (!password) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: `O campo senha é obrigatório!`,
      });
    }
    if (!userExists) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: `Usuário não encontrado!`,
      });
    }

    const checkPass = comparePasswords(password, userExists.password);

    if (!checkPass) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: `Usuário ou senha incorretos!`,
      });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: userExists._id,
        },
        secret,
      );
      const data = {
        token,
        id: userExists.id,
      };
      res.status(200).json({ message: 'Logado com sucesso!', data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messag: 'Erro no servidor!' });
    }
  }

  async enroll(userId: string, courseId: string, res: Response) {
    const user = await this.userModel.findById(userId);
    const course = await this.userModel.findById(courseId);
    if (!course) {
      res.status(422).json({ message: 'Curso não encontrado' });
    }
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado' });
    }
    try {
      await this.userModel.findOneAndUpdate(
        { _id: user?.id },
        { $push: { enrolledCourses: course } },
      );
      await this.userModel.findOneAndUpdate(
        {
          _id: course?.id,
        },
        { $push: { students: user?.id } },
      );
      res.status(200).json({ message: 'Matriculado com sucesso!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor!' });
    }
  }

  async myCourses(id: string, res: Response) {
    const user = await this.userModel.findById(id);
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado' });
    }
    try {
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor!' });
    }
  }

  async unenroll(userId: string, courseId: string, res: Response) {
    const user = await this.userModel.findById(userId);
    const course = await this.courseModel.findById(courseId);
    if (!user) {
      return res.status(422).json({ message: 'Usuário não encontrado' });
    }

    const formatedID = new mongoose.Types.ObjectId(courseId);

    try {
      await this.userModel.findOneAndUpdate(
        { _id: user?.id },
        { $pull: { enrolledCourses: { _id: formatedID } } },
      );

      await this.courseModel.findOneAndUpdate(
        {
          _id: course?.id,
        },
        { $pull: { students: user?.id } },
      );

      return res.status(200).json({ message: 'Desmatriculado com sucesso!' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro no servidor!' });
    }
  }
  async finishCourse(userId: string, courseId: string, res: Response) {
    const user = await this.userModel.findById(userId);
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      res.status(422).json({ message: 'Curso não encontrado' });
    }
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado' });
    }

    try {
      await this.userModel.findOneAndUpdate(
        { _id: user?.id },
        { $push: { finishedCourses: { _id: courseId } } },
      );

      res.status(200).json({ message: 'Curso finalizado com sucesso!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro no servidor!' });
    }
  }

  async getFinishedCourses(userId: string, res: Response) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ finishedCourses: user?.finishedCourses });
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
