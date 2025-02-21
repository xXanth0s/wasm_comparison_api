import {Container} from 'inversify';
import {MongoDBClient} from './mongodb/client';
import TYPES from '../constants/types';


import '../controller/home.controller';
import '../controller/task.controller';
import '../controller/video.controller';
import '../controller/person.controller';
import '../controller/sortable.controller';
import '../controller/result.controller';
import { TaskService } from '../services/task.service';
import { VideoService } from '../services/video.service';
import {PersonService} from '../services/person.service';
import { SortableDataService } from '../services/sortable-data.service';
import { ResultService } from '../services/result.service';


export function initContainer(): Container {
    const container = new Container();

    container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient).inSingletonScope();
    container.bind<TaskService>(TYPES.TaskService).to(TaskService).inSingletonScope();
    container.bind<VideoService>(TYPES.VideoService).to(VideoService).inSingletonScope();
    container.bind<PersonService>(TYPES.PersonService).to(PersonService).inSingletonScope();
    container.bind<ResultService>(TYPES.ResultService).to(ResultService).inSingletonScope();
    container.bind<SortableDataService>(TYPES.SortableDataService).to(SortableDataService).inSingletonScope();

    return container;
}

