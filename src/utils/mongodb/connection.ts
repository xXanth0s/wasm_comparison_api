import {Db, MongoClient, MongoClientOptions} from 'mongodb';

const connStr = process.env['MongoConnectionString'];
const dbName = process.env['DatabaseName'];

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;

  public static async getConnection(): Promise<Db> {
    if (this.isConnected) {
      return this.db;
    } else {
      return this.connect();
    }
  }

  private static async connect(): Promise<Db> {
    const config: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    const client =  new MongoClient(connStr, config);
    await client.connect();
    this.db = client.db(dbName);
    this.isConnected = true;
    return this.db;
  }
}
