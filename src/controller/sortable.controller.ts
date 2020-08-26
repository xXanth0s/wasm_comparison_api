import {controller, httpGet} from 'inversify-express-utils';
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

    @httpGet('/')
    public async get(): Promise<SortableData[]> {
        const data = await this.sortableDataService.getAllSortableData();
        return data;
    }
}
