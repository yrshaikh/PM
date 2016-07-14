/**
 * Created by yasser.s on 07/12/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Issue = new Schema({
    projectId: String,
    id: Number,
    title: String,
    description: String,
    sprint: Number,
    category: Number,
    assignedTo: String,
    createdDate: Date,
    createdBy: String,
    updatedDate: Date,
    updatedBy: String
});

module.exports = mongoose.model('Issue', Issue);
