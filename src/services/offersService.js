const Housing = require('../models/Housing');

const getAll = (params) => 
    params ? Housing.find().limit(params).sort({ createdAt: -1 }).lean() : Housing.find().lean();

const getSearched = (text) => Housing.find({type: {'$regex': text, $options:'i'}}).lean();

const create = (data) => Housing.create(data);

const getOne = (id) => Housing.findById(id).populate('tenants').lean();

const update = (id, offer) => Housing.findByIdAndUpdate(id, offer, { runValidators: true });

const deleteOne = (id) => Housing.findByIdAndDelete(id);

module.exports = {
    create,
    getAll,
    getOne,
    update,
    deleteOne,
    getSearched
}