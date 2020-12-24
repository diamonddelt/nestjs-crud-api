import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// route handlers
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    // fetch whatever comes after the 'tasks' controller route as the 'id' parameter
    @Get('/:id')
    getTask(@Param('id') id: string): Task {
        return this.tasksService.getTask(id);
    }

    // use NestJS @Body decorator to extract x-www-form-urlencoded params from POST request
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    }

    // use a DTO here to make the update requests easier to modify in the future
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.updateTaskStatus(id, updateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): boolean {
        return this.tasksService.deleteTask(id);
    }
}
