const mongoose = require('mongoose')

const vopVariancesSchema = new mongoose.Schema({

})

const vopVariancesModel = mongoose.model('vop variance', vopVariancesSchema, 'vop variances')

module.exports = vopVariancesModel