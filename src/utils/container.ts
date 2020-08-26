import {Container} from 'inversify';
import {MongoDBClient} from './mongodb/client';
import TYPES from '../constants/types';


import '../controller/home.controller';
import '../controller/task.controller';
import '../controller/video.controller';
import '../controller/matrix.controller';
import '../controller/person.controller';
import '../controller/sortable.controller';
import { TaskService } from '../services/task.service';
import { VideoService } from '../services/video.service';
import {PersonService} from '../services/person.service';
import {MatrixService} from '../services/matrix.service';
import { SortableDataService } from '../services/sortable-data.service';


export function initContainer(): Container {
    const container = new Container();

    container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient).inSingletonScope();
    container.bind<TaskService>(TYPES.TaskService).to(TaskService).inSingletonScope();
    container.bind<VideoService>(TYPES.VideoService).to(VideoService).inSingletonScope();
    container.bind<PersonService>(TYPES.PersonService).to(PersonService).inSingletonScope();
    container.bind<MatrixService>(TYPES.MatrixService).to(MatrixService).inSingletonScope();
    container.bind<SortableDataService>(TYPES.SortableDataService).to(SortableDataService).inSingletonScope();

    return container;
}

