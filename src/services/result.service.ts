import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import TYPES from '../constants/types';
import { Task } from '../models/task';
import { TaskToSave } from '../models/task-api.model';
import { Result } from '../models/result';
import { Request, Response } from 'express';
import { response } from 'inversify-express-utils';

@injectable()
export class ResultService {

    private readonly collectionName = 'Results';

    constructor(@inject(TYPES.MongoDBClient) private readonly mongoClient: MongoDBClient) {
    }

    public async newResult(result: Result): Promise<Result> {
        const finalResult: Result = {
            ...result,
            dateAdded: new Date(),
        }

        return this.mongoClient.insert<Result>(this.collectionName, finalResult);
    }

    public async deleteSepcific(filter: Object): Promise<void> {
        return this.mongoClient.delteForFilter<Result>(this.collectionName, filter);
    }

    public async getAvarage(): Promise<any> {
        const aggregation = [{}];

        const result= await this.mongoClient.aggregate<any>(this.collectionName, aggregation);
        return result.map(data => {

            delete data._id;
            return data
        })
    }

}
