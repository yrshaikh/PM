/**
 * Created by yasser.s on 06/19/2016.
 */
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var uuid = require('node-uuid');
var staticFunctionsJs = require('../utils/staticFunctions');
var staticFunctions = new staticFunctionsJs();
var accountServiceJs = require('../services/account/account-service');
var accountService = new accountServiceJs();

router.get('/', staticFunctions.isAuthenticated, function (req, res) {
    res.redirect("/dashboard");
    //res.render('home', { user : req.user });
});

router.get('/sign-up', function (req, res) {
    res.render('account/sign-up');
});

router.post('/sign-up', function (req, res) {
    var account = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    Account.register(new Account(
        {
            id: uuid.v1(),
            username : account.username,
            firstname: account.firstname,
            lastname: account.lastname
        }), account.password, function (err, account) {
        if (err) {
            account.error = true;
            return res.render('account/sign-up', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/sign-in', function (req, res) {
    var loginFailed = req.flash('error').length > 0;
    res.render('account/sign-in', { user : req.user, error: loginFailed });
});

router.post('/sign-in', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/sign-in', failureFlash: true }), function (err, req, res) {
    res.redirect('/');
});

router.get('/sign-out', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/forgot-password', function (req, res) {
    res.render('account/forgot-password', { user : req.user });
});

router.post('/forgot-password', function (req, res) {
    var result = { msg: '' };
    accountService.sendForgotPasswordMail(req.body.e, req.header('host'))
        .then(function(emailSentTo){
            if(emailSentTo)
                result.msg = 'sent';
            else
                result.msg = 'not-found';
            res.json(result);
        })
        .catch(function(){
            result.msg = 'error';
            res.json(result);
        });
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;
