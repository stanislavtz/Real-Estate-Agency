const Housing = require('../models/Housing');

const create = (data) => Housing.create(data);

const getAll = (params) => {
    if(params) {
        return Housing.find().limit(params).sort({ createdAt: -1 }).lean();
    }

    return Housing.find().lean();
}

const getOne = (id) => Housing.findById(id).populate('tenants').lean();

const update = (id, offer) => Housing.findByIdAndUpdate(id, offer);

module.exports = {
    create,
    getAll,
    getOne,
    update
}