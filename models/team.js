/**
 * Created by yasser.s on 06/25/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamMember = new Schema({
    mapId: String,
    accountId: String,
    role: String
});

var Team = new Schema({
    id: String,
    name: String,
    createdDate: String,
    createdByAccountId: String,
    updatedDate: String,
    updatedBy: String,
    members: [TeamMember]
});

module.exports = mongoose.model('Team', Team);

