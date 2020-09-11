import { controller, httpGet, requestParam } from 'inversify-express-utils';
import {inject,} from 'inversify';
import TYPES from '../constants/types';
import {MatrixService} from '../services/matrix.service';
import {Matrix} from '../models/matrix';
import { SortableData } from '../models/sortable-data.model';
import { SortableDataService } from '../services/sortable-data.service';

@controller('/sortable')
export class SortableController {

    constructor(@inject(TYPES.SortableDataService) private readonly sortableDataService: SortableDataService) {
    }

    @httpGet('/:count')
    public async get(@requestParam("count") count: number = 100000): Promise<string[]> {
        const data = await this.sortableDataService.getAllSortableData();
        data.length = count
        return data;
    }

    @httpGet('/numbers/:count')
    public async getNumbers(@requestParam("count") count: number = 100000): Promise<number[]> {
        const data = await this.sortableDataService.getAllSortableNumbers();
        data.length = count
        return data;
    }
}
