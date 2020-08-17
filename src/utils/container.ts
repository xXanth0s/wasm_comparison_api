import {Container} from 'inversify';
import {MongoDBClient} from './mongodb/client';
import TYPES from '../constants/types';


import '../controller/home.controller';
import '../controller/task.controller';
import '../controller/video.controller';
import { TaskService } from '../services/task.service';
import { VideoService } from '../services/video.service';


export function initContainer(): Container {
    const container = new Container();

    container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient).inSingletonScope();
    container.bind<TaskService>(TYPES.TaskService).to(TaskService).inSingletonScope();
    container.bind<VideoService>(TYPES.VideoService).to(VideoService).inSingletonScope();

    return container;
}

