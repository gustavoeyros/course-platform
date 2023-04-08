import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(
    @Body() createUserDto: CreateUserDto,
    @Body() { name, email, password, confirmpassword },
  ) {
    const userInfo = {
      name,
      email,
      password,
      confirmpassword,
    };
    return this.usersService.create(createUserDto, userInfo);
  }
  @Post('login')
  login(@Body() { email, password }, @Res() res: Response) {
    return this.usersService.login({ email, password }, res);
  }

  @Post('/enroll/:userId/:courseId')
  enroll(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
    @Res() res: Response,
  ) {
    return this.usersService.enroll(userId, courseId, res);
  }

  @Get('/mycourses/:id')
  myCourses(@Param('id') id: string, @Res() res: Response) {
    return this.usersService.myCourses(id, res);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('unenroll/:userId/:courseId')
  unenroll(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
    @Res() res: Response,
  ) {
    return this.usersService.unenroll(userId, courseId, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
