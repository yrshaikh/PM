/**
 * Created by yasser.s on 06/19/2016.
 */
var accountDataStoreJs = require('../../datastore/account-data-store');
var AccountResponseFormatter = require('../../services/account/account-response-formatter');
var Underscore = require('underscore');

var accountDataStore = new accountDataStoreJs();

function AccountService(){
    this.accountResponseFormatter = new AccountResponseFormatter();
}

AccountService.prototype = {
    getAllUsers: function(){
        var that = this;
        return accountDataStore.getAllUsers()
            .then(function(users){
                var userResponse = [];
                Underscore.forEach(users, function(user){
                    userResponse.push(that.accountResponseFormatter.getUser(user));
                });
                return userResponse;
            });
    },
    getUserById: function(userId){
        var that = this;
        return accountDataStore.getUserById(userId).
            then(function(user){
                return that.accountResponseFormatter.getUser(user);
            })
    }
};

module.exports = AccountService;
