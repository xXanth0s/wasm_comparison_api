import { controller, httpDelete, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { inject, } from 'inversify';
import TYPES from '../constants/types';
import { Request, Response } from 'express';
import { ResultService } from '../services/result.service';
import { Result } from '../models/result';

@controller('/result')
export class ResultController {

    constructor(@inject(TYPES.ResultService) private readonly resultService: ResultService) {
    }

    @httpGet('/average')
    public async getAverage(@request() request: Request, @response() res: Response): Promise<any> {
        return this.resultService.getAvarage();
    }

    @httpPost('/')
    public async addResult(@request() request: Request, @response() res: Response): Promise<void> {
        let result: Result = null;

        try {
            result = await this.resultService.newResult(request.body);
        } catch (e) {
            res.status(400).json({error: e.message});
        }

        res.status(200).json(result);

    }
    @httpDelete('/')
    public async deleteSpecific(@request() request: Request, @response() res: Response): Promise<void> {
        let result: Result = null;

        try {
            await this.resultService.deleteSepcific({browser: 'console'});
        } catch (e) {
            res.status(400).json({error: e.message});
        }

        res.status(200).json(result);

    }


}
