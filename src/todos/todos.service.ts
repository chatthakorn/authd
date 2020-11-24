import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { CreateTodoDto } from '../dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private todoModel: Model<TodoDocument>) {}

  async create(createCatDto: CreateTodoDto): Promise<Todo> {
    const createTodo = new this.todoModel(createCatDto);
    return await createTodo.save();
  }

  async findTodo(id: any): Promise<any[]> {
    return await this.todoModel.aggregate([
      {
        $match: { create_by: id },
      },
    ]);
  }

  async findTodoed(id: any): Promise<any[]> {
    return await this.todoModel.aggregate([{ $match: { create_by: id } }]);
  }

  async done(id: string, status: boolean) {
    return await this.todoModel.updateOne({ _id: id }, { $set: { status } });
  }

  async destroy(id: string) {
    return await this.todoModel.deleteOne({ _id: id }).exec();
  }
}
