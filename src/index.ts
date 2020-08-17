import 'reflect-metadata';
require('custom-env').env(true);
import { initContainer } from './utils/container';
import cors from 'cors'
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';

const port = process.env.PORT || '8090';

const container = initContainer();

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(cors());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

});

let app = server.build();
app.listen(port);

console.log('server started at port:', port)
