import { SortType } from './enum/sort-type.enum';
import { Framework } from './enum/framework';

export interface Result {
    sortType: SortType,
    framework: Framework,
    count: number,
    time: number,
    browser: string,
    dateAdded: Date
}
