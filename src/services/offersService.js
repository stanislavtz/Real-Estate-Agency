const Housing = require('../models/Housing');

const getAll = (params) => {
    if(params) {
        return Housing.find().limit(params).sort({ createdAt: -1 }).lean();
    }

    return Housing.find().lean();
}


module.exports = {
    getAll,
}