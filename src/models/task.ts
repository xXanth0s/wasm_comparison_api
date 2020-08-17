import { TaskToSave } from './task-api.model';

export interface Task extends TaskToSave {
    _id?: string;
    completed: boolean;
    dateAdded: Date;
    dateUpdated: Date;
}
