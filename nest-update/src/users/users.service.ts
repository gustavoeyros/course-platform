import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(@Body() createUserDto: CreateUserDto, @Body() userInfo: any) {
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

    const userExists = this.userModel.findOne({ email: userInfo.email });

    if (userExists) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: `O usuário já existe!`,
      });
    }

    const user = new this.userModel(createUserDto);
    return user.save();
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
