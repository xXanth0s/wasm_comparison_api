import {controller, httpGet} from 'inversify-express-utils';
import {inject,} from 'inversify';
import TYPES from '../constants/types';
import {PersonService} from '../services/person.service';
import {Person} from '../models/person';

@controller('/person')
export class PersonController {

    constructor(@inject(TYPES.PersonService) private readonly personService: PersonService) {
    }

    @httpGet('/')
    public async get(): Promise<Person[]> {
        const result = await this.personService.getAllPersons();
        result.length = 1000
        return result

    }
}
