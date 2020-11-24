import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser: UserDocument = new this.userModel(createUserDto);
    return await createUser.save();
  }

  async findUser(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }
}
