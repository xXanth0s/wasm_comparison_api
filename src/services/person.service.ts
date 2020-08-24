import {inject, injectable} from 'inversify';
import {MongoDBClient} from '../utils/mongodb/client';
import TYPES from '../constants/types';
import {Person} from '../models/person';

@injectable()
export class PersonService {

    private readonly collectionName = 'Persons';

    constructor(@inject(TYPES.MongoDBClient) private readonly mongoClient: MongoDBClient) {
    }

    public async getAllPersons(): Promise<Person[]> {
        return this.mongoClient.find<Person>(this.collectionName);
    }
}
