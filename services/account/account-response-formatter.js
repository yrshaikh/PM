/**
 * Created by yasser.s on 06/21/2016.
 */
function AccountResponseFormatter(){}

AccountResponseFormatter.prototype = {
    getUser: function(user){
        return {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
        };
    }
}

module.exports = AccountResponseFormatter;
