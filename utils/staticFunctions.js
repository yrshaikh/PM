/**
 * Created by yasser.s on 06/19/2016.
 */
function staticFunctions() {}

staticFunctions.prototype = {
    isAuthenticated: function(req, res, next){
        if (req.user)
            return next();
        res.redirect('/sign-in');
    }
};

module.exports = staticFunctions;
