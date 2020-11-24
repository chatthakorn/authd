import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Patch,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TodosService } from './todos/todos.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private todoService: TodosService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/profile')
  async create(
    @Body('create_by') create_by: string,
    @Body('text') text: string,
  ) {
    return await this.todoService.create({ create_by, text });
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any): Promise<any> {
    const userData: any = await req.user['_doc'];
    return this.authService.login(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/todoes')
  async getProfile(@Request() req: any): Promise<any> {
    const todoes: any[] = (
      await this.todoService.findTodo(req.user['_id'])
    ).filter((todo) => todo.status === false);
    return {
      todoes: [...todoes],
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/todoed')
  async getProfileTodoed(@Request() req: any): Promise<any> {
    const todoes: any[] = (
      await this.todoService.findTodoed(req.user['_id'])
    ).filter((todo) => todo.status === true);
    return {
      todoes: [...todoes],
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile/:id')
  async done(@Param('id') id: string, @Body('status') status: boolean) {
    return await this.todoService.done(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile/:id')
  async destroy(@Param('id') id: string) {
    return await this.todoService.destroy(id);
  }
}
