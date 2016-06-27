/**
 * Created by yasser.s on 06/27/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    teamId: String,
    id: String,
    name: String,
    createdDate: String,
    createdByAccountId: String,
    updatedDate: String,
    updatedBy: String
});

module.exports = mongoose.model('Project', Project);

