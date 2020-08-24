import {inject, injectable} from 'inversify';
import {MongoDBClient} from '../utils/mongodb/client';
import TYPES from '../constants/types';
import {Matrix} from '../models/matrix';

@injectable()
export class MatrixService {

    private readonly collectionName = 'Matrix';

    constructor(@inject(TYPES.MongoDBClient) private readonly mongoClient: MongoDBClient) {
    }

    public async getMatrix(): Promise<Matrix> {
        return this.mongoClient.findFirst<Matrix>(this.collectionName, {});
    }
}
