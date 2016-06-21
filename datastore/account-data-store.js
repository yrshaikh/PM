/**
 * Created by yasser.s on 06/19/2016.
 */
var Promise = require('bluebird');
var Account = require('../models/account');

function AccountDataStore() {
}

Promise.promisifyAll(Account);
Promise.promisifyAll(Account.prototype);

AccountDataStore.prototype = {
    getAllUsers: function(){
        return Account.findAsync();
    },
    getUserById: function (id) {
        return Account.findOneAsync({ "id": id });
    }
}

module.exports = AccountDataStore;
