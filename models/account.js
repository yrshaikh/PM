/**
 * Created by yasser.s on 06/19/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    id: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);
