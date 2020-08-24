import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    request,
    requestParam,
    response
} from 'inversify-express-utils';
import { inject, } from 'inversify';
import TYPES from '../constants/types';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { Request, Response } from 'express';

@controller('/task')
export class TaskController {

    constructor(@inject(TYPES.TaskService) private readonly taskService: TaskService) {
    }

    @httpGet('/')
    public get(): Promise<Task[]> {
        return this.taskService.getAllToDos();
    }

    @httpPost('/')
    public async addTask(@request() request: Request, @response() res: Response): Promise<void> {
        let task: Task = null;

        try {
            task = await this.taskService.newTask(request.body);
        } catch (e) {
            res.status(400).json({error: e.message});
        }
        res.status(200).json(task);
    }

    @httpPut('/:id')
    public async updateTask(@requestParam("id") id: string, @request() request: Request, @response() res: Response): Promise<void> {
        try {
            this.taskService.updateTask(id, request.body);
        } catch (e) {
            res.status(400).json({error: e.message});
        }
    }

    @httpDelete('/:id')
    public async deleteTask(@requestParam("id") id: string, @request() request: Request, @response() res: Response): Promise<void> {
        try {
            await this.taskService.deleteTask(id);
        } catch (e) {
            res.status(400).json({error: e.message});
        }

        res.status(204)
    }
}
