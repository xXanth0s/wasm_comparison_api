import {controller, httpGet} from 'inversify-express-utils';
import {inject,} from 'inversify';
import TYPES from '../constants/types';
import {MatrixService} from '../services/matrix.service';
import {Matrix} from '../models/matrix';

@controller('/matrix')
export class MatrixController {

    constructor(@inject(TYPES.MatrixService) private readonly matrixService: MatrixService) {
    }

    @httpGet('/')
    public get(): Promise<Matrix> {
        return this.matrixService.getMatrix();
    }
}
