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
        console.log('adding result', result)
        const finalResult: Result = {
            ...result,
            dateAdded: new Date(),
        }

        return this.mongoClient.insert<Result>(this.collectionName, finalResult);
    }

    public async deleteSepcific(filter: Object): Promise<void> {
        console.log('deleting for filter', filter)

        return this.mongoClient.delteForFilter<Result>(this.collectionName, filter);
    }

    public async getAvarage(): Promise<any> {
        const agg = [
            {
                '$group': {
                    '_id': {
                        'framework': '$framework',
                        'browser': '$browser',
                        'sortType': '$sortType',
                        'count': '$count'
                    },
                    'browser': {
                        '$first': '$browser'
                    },
                    'framework': {
                        '$first': '$framework'
                    },
                    'sortType': {
                        '$first': '$sortType'
                    },
                    'count': {
                        '$first': '$count'
                    },
                    'avarage time': {
                        '$avg': '$time'
                    }
                }
            }, {
                '$sort': {
                    'sortType': 1,
                    'browser': 1,
                    framework: 1,
                    'count': -1,
                }
            }
        ];

        const result= await this.mongoClient.aggregate<any>(this.collectionName, agg);
        return result.map(data => {

            delete data._id;
            console.log(data)
            return data
        })
    }

}
