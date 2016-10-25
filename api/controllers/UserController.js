/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
		res.view();
	},
	'create':function(req,res,next){
		User.create(req.params.all(), function (err,user){
			if(err){ 
				//policy checking error 
				req.session.flash={
					err:err
				}
				return res.redirect('/user/new');
			}
			res.redirect('/user/show/'+user.id);
		});
	},
	'show':function(req,res,next){
		User.findOne(req.param('id'),function (err,user){
			if(err)return next(err);
			if(!user) return next();
			res.view({user:user});
		});
	},
	'index':function(req,res,next){
		User.find(function(err,user){
			if(err)return next(err);
			res.view({users:user})
		});
	},
	'edit':function(req,res,next){
		User.findOne(req.param('id'),function(err,user){
			if(err) return req.session.flash={err:"User not found!"};
			if(!user) req.session.flash={err:"User not found!"};
			res.view({user:user});
		});
	},
	'update':function(req,res,next){

		User.update(req.param('id'),req.params.all(),function(err, user){
		  if (err) {
		    return res.negotiate(err);
		  }
		  res.redirect('/user/');
		});
	},
	'destroy':function(req,res,next){

		User.findOne(req.param('id'),function (err,user){
			if(err) return next(err);
			if(!user) return next('User not exist');

			User.destroy(req.param('id'),function(err){
				if(err)return next(err);
			});
			res.redirect('/user/');
		});
	}
};

