const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

var FollowersSchema = new mongoose.Schema(
     {
     
    email: {type:String ,   
     
    }
 } );

var FollowingSchema = new mongoose.Schema(
    {
    
   email: {type:String ,   
   }
} );


  var blogsSchema = new mongoose.Schema( 
    {
        email:{type:String
        
    }}
  );

  var bookmarkedSchema = new mongoose.Schema( 
   { 
    
    
    email:{type:String
        
    }}
  );

  



const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Followers:[FollowersSchema],
    Following:[FollowingSchema],
    blogs:[blogsSchema],
    bookmarked:[bookmarkedSchema],
    name:{
        type:String
        
    },
    votes:{
        type:Number,
        default: 0
     
    },
    
    profilePhoto:{
        type:String,
        default: 'https://www.anthropics.com/portraitpro/img/page-images/homepage/v21/new-features-B.jpg'
        
    },

    profession:{
        type:String,
     
    },

   

})

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})


userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}

mongoose.model('User',userSchema);