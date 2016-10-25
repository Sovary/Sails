/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req,res){
		var oldDate=new Date();
		var curDate=new Date(oldDate.getTime() + 60000);
		req.session.cookie.expires=curDate;
		res.view("session/new");
	},
	'login':function(req,res){
		if(!req.param('email') || !req.param('password')){
			var uPwRequire=[{"name":'usernameRequired',message:'You must fill all blank!'}];
			req.session.flash={
				err:uPwRequire
			}
			 
			  res.redirect("session/new");
			  return;
		}

		User.findOneByEmail(req.param('email'), function (err,user){

			 var fail=[{name:"loginFailed",message:"Username or password wrong!"}]
			 if(err) return next(err);
			 if(!user){
			 	req.session.flash={
			 		err:fail
			 	}
			 	 res.redirect('session/new');
			 	 return;
			 }
			req.session.auth=true;
			req.session.User=user;
			console.log(req.session);

			res.redirect('user/show'+user.id);
		});
		

	}
};

