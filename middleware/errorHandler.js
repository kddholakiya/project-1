
const{constant} = require('../constant')
const errorHandler = (err, req, res, next) => {
    // var code = err.code
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch (statuscode) {
        case constant.validation_error:
            res.json({
                title: 'not valid',
                messege: err.messege,
                stackTrace: err.stack
            })
            break;
        case constant.notfound:
            res.json({
                title: 'not found',
                messege: err.messege,
                stackTrace: err.stack
            })
            break;
        case constant.unauthorize:
            res.json({
                title: 'unauthorized',
                messege: err.messege,
                stackTrace: err.stack
            })
            break;
        case constant.forbidden:
            res.json({
                title: 'forbidden',
                messege: err.messege,
                stackTrace: err.stack
            })
            break;
        case constant.server_error:
            res.json({
                title: 'server error',
                messege: err.messege,
                stackTrace: err.stack
            })
            break;
        default:
            console.log('!! no error all good');
            break;
    }
}


module.exports = errorHandler;

