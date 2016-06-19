/**
 * Created by yasser.s on 06/19/2016.
 */
var accountDataStoreJs = require('../../datastore/account-data-store');

var accountDataStore = new accountDataStoreJs();
var configs = require('config');

function AccountService(){}

AccountService.prototype.getUsersByUserId = function(userIds) {
    return accountDataStore.getByUserIds(userIds)
        .then(function(users){
            return users;
        });
};

module.exports = AccountService;
