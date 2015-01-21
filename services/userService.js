'use strict';

var async = require('async');
var crypto = require('crypto');
var Q = require('q');

var LocalStrategy = require('passport-local').Strategy;


module.exports = function(User){

    return {
                makeSalt: function () {
                    return crypto.randomBytes(16).toString('base64');
                },

                encryptPassword: function (password, salt) {
                    if (!password || !salt) return '';
                    var salt = new Buffer(salt, 'base64');
                    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
                },

                validatePassword : function(password,encryptedPass,salt){
                    if (!password || !salt) return false;
                    var salt = new Buffer(salt, 'base64');
                    return encryptedPass === crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
                },

                getAccountByEmail: function (email) {

                    var deffered = Q.defer();

                     User.findOne({ email: email }, function (err, user) {
                          if (err) { return deffered.reject(err); }
                          if (!user) {
                            return deffered.resolve(null);
                          }

                          return deffered.resolve(user);
                    });

                     return deffered.promise;
                },

                getAccountById: function (id) {
                    
                    var deffered = Q.defer();

                     User.findById(id, function (err, user) {
                          if (err) { return deffered.reject(err); }
                          if (!user) {
                            return deffered.reject('Incorrect ID');
                          }
                          
                          return deffered.resolve(user);
                    });

                    return deffered.promise;

                },

            
                register: function (data) {
                    var deffered = Q.defer();

                    var self = this;

                    self.getAccountByEmail(data.email).then(function (user) {

                        if (user) {
                            return deffered.reject('A user with this email already exists');
                        }

                        data.provider = 'local';
                        
                        //create a new user
                        self.createUser(data).then(function(user){
                            deffered.resolve(user);
                        },function(error){
                            deffered.reject(error);
                        });
                    },function(error){
                        deffered.reject(error);
                    });

                    return deffered.promise;
                },

                createUser: function(data) {

                     var deffered = Q.defer();

                     var self = this;

                     var user = new User();
                     user.email = data.email;
                     user.name = data.name;

                     if(data.password) {
                        user.salt = self.makeSalt();
                        user.password = self.encryptPassword(data.password, user.salt);
                     }

                     user.save(function (err) {
                          if (err) deffered.reject(err);
                          else deffered.resolve(user);
                     });

                     return deffered.promise;
                   
                },

                updateUser: function(data) {
                   //TODO.
                },

                removeUser: function(id, callback) {
                   //TODO
                }
        }

};