'use strict';

import Env from '../utils/Env';

let api_url;
let server_url;

switch (Env.get()) {
    case 'dev':
        api_url = '//localhost:3000/';
        server_url = '//localhost:3000/';
        break;
    case 'homolog':
        api_url = '';
        server_url = '';
        break;
    case 'prod':
        api_url = '//54.214.109.179:3000/';
        server_url = '//54.214.109.179:3000/';
        break;
}


export default {
    api_url,
    server_url
}
