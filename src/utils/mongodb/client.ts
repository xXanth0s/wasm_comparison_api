import {Db, ObjectID} from 'mongodb';
import {injectable} from 'inversify';
import {MongoDBConnection} from './connection';
import { createUpdateFailedException } from '../../exceptions/update-failed.exception';

@injectable()
export class MongoDBClient {

    public async find<T>(collection: string, filter: Object = {}): Promise<T[]> {
        const connection = await this.getConnection();
        return connection.collection(collection).find<T>(filter).toArray();
    }

    public async findFirst<T>(collection: string, filter: Object): Promise<T> {
        const connection = await this.getConnection();
        return connection.collection(collection).findOne<T>(filter);
    }

    public async findOneById<T>(collection: string, id: string): Promise<T> {
        const connection = await this.getConnection();
        return connection.collection(collection).findOne<T>({_id: new ObjectID(id)});
    }

    public async insert<T>(collection: string, model: T): Promise<T> {
        const connection = await this.getConnection();
        const result = await connection.collection(collection).insertOne(model);
        return result.ops[0];
    }

    public async delte<T>(collection: string, objectId: string): Promise<void> {
        const connection = await this.getConnection();
        const result = await connection.collection(collection).deleteOne({_id: new ObjectID(objectId)});

    }

    public async update<T>(collection: string, objectId: string, model: Partial<T>): Promise<void> {
        const connection = await this.getConnection();
        const result = await connection.collection(collection).updateOne(
            {_id: new ObjectID(objectId)},
            {$set: model});

        if(!result.result.ok) {
            throw createUpdateFailedException(collection, objectId);
        }
    }

    private async getConnection(): Promise<Db> {
        return MongoDBConnection.getConnection();
    }
}
