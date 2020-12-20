import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid'; // generate a unique ID
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// the 'Service' is the business logic for any route to invoke from a controller

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTask(id: string): Task {
        return this.tasks.find(e => e.id === id);
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
