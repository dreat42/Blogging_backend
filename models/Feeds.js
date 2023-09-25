const mongoose = require('mongoose');


var FollowersSchema = new mongoose.Schema( {
    email: {type:String    
        
    }
 } );

  var FollowingSchema = new mongoose.Schema( 
  { email: {type:String
        
    }}
  );
  var blogsSchema = new mongoose.Schema( 
    {email:{type:String
        
    }}
  );

  var bookmarkedSchema = new mongoose.Schema( 
   { email:{type:String
        
    }}
  );

  var countSchema = new mongoose.Schema( 
   { email:{type:String
        
    }}
  );

  var downvoteSchema = new mongoose.Schema( 
   { email:{type:String
        
    }}
  );
  var upvoteSchema = new mongoose.Schema( 
   { email:{type:String
        
    }}
  );


const feedSchema = new mongoose.Schema({
    email:{
        type:String
        
    },
    name:{
        type:String
        
    },
    Followers:[FollowersSchema],
    Following:[FollowingSchema],
    blogs:[blogsSchema],
    bookmarked:[bookmarkedSchema],
    category:{
        type:String,
        
    },
    content:{
        type:String,
        
    },
    count:[countSchema],
    date:{
        type:String,
        
    },
    downvote:[downvoteSchema],
    upvote:[upvoteSchema],
    imgPath:{
        type:String,
        
    },
    profilePhoto:{
        type:String,
        
    },
    title:{
        type:String,
        
    },
    views:{
        type:Number,
       
    },
    votes:{
        type:Number,
     
    },

    about:{
        type:String,
        
    },
    profession:{
        type:String,
     
    },





})


// mongoose.model('UpVote',upvoteSchema);




mongoose.model('Feeds',feedSchema);