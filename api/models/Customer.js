/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name:{
  		type:"string",
  		size:128,
  		required:true
  	},
  	email:{
  		type:"string",
  		email:true
  	},
  	state:{
  		type:"string"
  	},
    stocks:{
      collection:'stock',
      via:'owner'
    },
    //Override method to unwanted data back to view
    toJSON:function(){
      var obj=this.toObject();
      delete obj.email;
      delete obj.state;
      return obj;
    }
  }
};

