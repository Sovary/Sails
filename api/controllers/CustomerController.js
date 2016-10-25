/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
		res.view();
	},
	add:function(req,res,next){
		Customer.create(req.params.all(),function (err,customer){
			if(err) {
				console.log(err);
				req.session.flash={
					err:err
				}
			}
			res.redirect('/customer/new');
		});
	},
	show:function(req,res,next){
		Customer.findOne(req.param('id'), function (err,customer){
			if(err)return next(err);
			if(!customer) return next();
			res.view({
				customer:customer
			});
		});
	},
	index:function(req,res,next){
		console.log(req.session);
		Customer.find(function found(err,customer){
			if(err)return next(err);
			res.view({
				customers:customer
			});
		});
	},
	edit:function(req,res,next){
		Customer.findOne(req.param('id'),function (err,customer){
			if(err)return next(err);
			if(!customer) return next();

			res.view({
				customer:customer
			});
		});
	},
	update:function(req,res,next){
		Customer.update(req.param('id'),req.params.all(),function (err){
			if(err){
				return res.redirect('/customer/edit/'+req.param('id'));
			}

			res.redirect('/customer');
		});
	},

	/*destroy:function(req,res,next){
		Customer.destroy(req.param('id'),function (err){
			if(err){
				return res.redirect('customer/');
			}
			res.redirect('customer/');
		});
	},*/
	
	destroy:function(req,res,next){
		Customer.destroy(req.param('id')).exec(function (err){
		  if (err) { return res.negotiate(err); }
		  res.redirect('customer/');
		});
	}
		

};

