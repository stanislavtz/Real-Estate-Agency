const Housing = require('../models/Housing');

const getAll = (params) => {
    if (params) {
        return Housing.find().limit(params).sort({ createdAt: -1 }).lean();
    }

    return Housing.find().lean();
}

const create = (data) => Housing.create(data);

const getOne = (id) => Housing.findById(id).populate('tenants').lean();

const update = (id, offer) => Housing.findByIdAndUpdate(id, offer, { runValidators: true });

module.exports = {
    create,
    getAll,
    getOne,
    update
}