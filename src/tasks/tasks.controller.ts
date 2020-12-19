import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

// route handlers
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    // fetch whatever comes after the 'tasks' controller route as the 'id' parameter
    @Get('/:id')
    getTask(@Param('id') id: string): Task {
        return this.tasksService.getTask(id);
    }

    // use NestJS @Body decorator to extract x-www-form-urlencoded params from POST request
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        // console.log('title: ', title, ' description: ', description);
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): boolean {
        return this.tasksService.deleteTask(id);
    }
}
