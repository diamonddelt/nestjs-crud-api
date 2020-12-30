import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid'; // generate a unique ID
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// the 'Service' is the business logic for any route to invoke from a controller

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTask(id: string): Task {
        const found = this.tasks.find(e => e.id === id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" was not found`);
        }

        return found;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        // return a subset of tasks matching the provides status
        if (status) {
            tasks = tasks.filter(e => e.status === status);
        }

        // return a subset of tasks with the search term in either the title or the description
        if (search) {
            tasks = tasks.filter(e => e.title.includes(search) || e.description.includes(search));
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto; // ecmascript 6 destruct; extract keys

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto): Task {
        const { status } = updateTaskDto;

        let task = this.tasks.find(e => e.id === id);
        this.tasks = this.tasks.filter(e => e.id !== id); 
        task.status = status; // set new status
        this.tasks.push(task); // add it back in with the new status

        return task;
    }

    deleteTask(id: string): boolean {
        if (this.tasks.find(e => e.id === id)) {
            this.tasks = this.tasks.filter((e) => e.id !== id);
            return true;
        } else {
            return false; // the task wasn't there to begin with
        }
    }
}
