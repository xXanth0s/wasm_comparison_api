import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import TYPES from '../constants/types';
import { Task } from '../models/task';
import { TaskToSave } from '../models/task-api.model';

@injectable()
export class TaskService {

    private readonly collectionName = 'Tasks';

    constructor(@inject(TYPES.MongoDBClient) private readonly mongoClient: MongoDBClient) {
    }

    public async getAllToDos(): Promise<Task[]> {
        return this.mongoClient.find<Task>(this.collectionName);
    }

    public async newTask(task: TaskToSave): Promise<Task> {
        console.log('adding task', task)
        const finalTask: Task = {
            ...task,
            completed: false,
            dateAdded: new Date(),
            dateUpdated: new Date(),
        }
        console.log('final Task', finalTask)

        return this.mongoClient.insert<Task>(this.collectionName, finalTask);
    }

    public async updateTask(taskId: Task['_id'], task: TaskToSave): Promise<void> {
        const finalTask: Partial<Task> = {
            ...task,
            dateUpdated: new Date()
        }
        this.mongoClient.update(this.collectionName, taskId, finalTask);
    }

    private getTask(taskId: Task['_id']): Promise<Task> {
        return this.mongoClient.findOneById(this.collectionName, taskId);
    }
}
