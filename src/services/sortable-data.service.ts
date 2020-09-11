import {inject, injectable} from 'inversify';
import {MongoDBClient} from '../utils/mongodb/client';
import TYPES from '../constants/types';
import {Matrix} from '../models/matrix';
import { SortableData } from '../models/sortable-data.model';

@injectable()
export class SortableDataService {

    private readonly collectionNameStrings = 'SortableData';
    private readonly collectionNameNumbers = 'SortableNumbers';

    constructor(@inject(TYPES.MongoDBClient) private readonly mongoClient: MongoDBClient) {
    }

    public async getAllSortableData(): Promise<string[]> {
     const result = await this.mongoClient.find<SortableData>(this.collectionNameStrings);
     return result.map(value => value.ID)
    }

    public async getAllSortableNumbers(): Promise<number[]> {
        const result = await this.mongoClient.find<{value: number}>(this.collectionNameNumbers);
        return result.map(value => value.value)
    }
}
