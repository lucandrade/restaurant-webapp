'use strict';

import Request from '../utils/Request';

export default function CreateProduct(data, callback) {
    Request.post('/product', data).then(function (response) {
        if (response && response.data) {
            const result = response.data;
            callback(result);
        } else {
            callback({
                status: false
            });
        }
    });
}
