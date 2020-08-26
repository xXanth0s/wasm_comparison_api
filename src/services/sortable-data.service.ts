import {inject, injectable} from 'inversify';
import {MongoDBClient} from '../utils/mongodb/client';
import TYPES from '../constants/types';
import {Matrix} from '../models/matrix';
import { SortableData } from '../models/sortable-data.model';

@injectable()
export class SortableDataService {

    private readonly collectionName = 'SortableData';

    constructor(@inject(TYPES.MongoDBClient) private readonly mongoClient: MongoDBClient) {
    }

    public async getAllSortableData(): Promise<SortableData[]> {
        return this.mongoClient.find<SortableData>(this.collectionName);
    }
}
