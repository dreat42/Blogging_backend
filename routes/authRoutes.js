const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const Feeds = mongoose.model('Feeds');



const requireToken = require('../middleware/requireToken')








router.post('/signup',async (req,res)=>{
   
    const {email,password,name} = req.body;

    try{
      const user = new User({email,password,name});
      await  user.save();
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})

    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error :"must provide email or password"})
    }
    try{
      await user.comparePassword(password);    
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})
    }catch(err){
        return res.status(422).send({error :"must provide email or password"})
    }
    


})


router.post('/feeds',(req,res)=>{

  const {email,name,Followers,Following,blogs,bookmarked,category,content,count,date,downvote,upvote,imgPath,profilePhoto,title,views,votes} = req.body;


  const feed = new Feeds({email,name,Followers,Following,blogs,bookmarked,category,content,count,date,downvote,upvote,imgPath,profilePhoto,title,views,votes});

  res.send(feed);
  // res.json(feed)
  async function run() {
    await mongoose.connect('mongodb+srv://myler:root@cluster0.zkkiupy.mongodb.net/');
    await Feeds.create(feed);
  }
  run();
 

})

router.get('/feeds',(req,res)=>{
  Feeds.find()
  .then(data => res.json(data))
  .catch(err => res.status(400).json('Error: '+ err));
})




router.post('/feeds/UpVote/Insert/:id',async (req,res)=>{

  const ID = req.params.id;

  console.log(ID);

  const {email} =req.body


  console.log(email);

async function findObjectByIdAndCreateInsideField(objectId, fieldName, objectData) {
  try {
    const object = await Feeds.findOne({_id:objectId})



    if (object) {

      object.votes = object.votes + 1;


      object[fieldName].push(objectData);
      await object.save();
      // console.log('Object created inside field:', object);
    } else {
      console.log('Object not found');
    }
  } catch (error) {
    console.log('Error finding or creating object inside field:', error);
  }
}

// Usage
const objectId = ID // Replace with the actual object ID
const fieldName = 'upvote';
const objectData = {email};

findObjectByIdAndCreateInsideField(objectId, fieldName, objectData);

})


router.post('/feeds/UpVoteAdd_DownVoteDelete/:id',async (req,res)=>{

  const ID = req.params.id;

  console.log(ID);

  const {email} =req.body


  console.log(email);

async function findObjectByIdAndCreateInsideField(objectId, fieldName, objectData) {
  try {
    const object = await Feeds.findOne({_id:objectId})



    if (object) {

      object.votes = object.votes + 2;


      object[fieldName].push(objectData);
      await object.save();
      // console.log('Object created inside field:', object);
    } else {
      console.log('Object not found');
    }
  } catch (error) {
    console.log('Error finding or creating object inside field:', error);
  }
}

// Usage
const objectId = ID // Replace with the actual object ID
const fieldName = 'upvote';
const objectData = {email};

findObjectByIdAndCreateInsideField(objectId, fieldName, objectData);

})

router.post('/feeds/UpVoteDelete_DownVoteAdd/:id',async (req,res)=>{

  const ID = req.params.id;

  console.log(ID);

  const {email} =req.body


  console.log(email);

async function findObjectByIdAndCreateInsideField(objectId, fieldName, objectData) {
  try {
    const object = await Feeds.findOne({_id:objectId})



    if (object) {

      object.votes = object.votes - 2;


      object[fieldName].push(objectData);
      await object.save();
      // console.log('Object created inside field:', object);
    } else {
      console.log('Object not found');
    }
  } catch (error) {
    console.log('Error finding or creating object inside field:', error);
  }
}

// Usage
const objectId = ID // Replace with the actual object ID
const fieldName = 'upvote';
const objectData = {email};

findObjectByIdAndCreateInsideField(objectId, fieldName, objectData);

})

 



router.post('/feeds/UpVote/Delete/:id',async (req,res)=>{

  const ID = req.params.id;
  const {email} =req.body
  console.log(ID);

  

async function findObjectByIdAndDeleteInsideField(objectId, fieldName, objectData) {
  try {
    const object = await Feeds.findOne({_id:objectId})
    if (object) {


      object.votes = object.votes - 1;

      object[fieldName].pop(objectData);
      await object.save();
    } 
  } catch (error) {
    console.log('Error finding or deleteing object inside field:', error);
  }
}

const objectId = ID 
const fieldName = 'upvote';
const objectData = {email};

findObjectByIdAndDeleteInsideField(objectId, fieldName, objectData);

})


router.post('/feeds/DownVote/Insert/:id',async (req,res)=>{

  const ID = req.params.id;

  // console.log(ID);

  const {email} =req.body


  // console.log(email);

async function findObjectByIdAndCreateInsideField(objectId, fieldName, objectData) {
  try {
    const object = await Feeds.findOne({_id:objectId})
    if (object) {

      object.votes = object.votes - 1;


      object[fieldName].push(objectData);
      await object.save();
      // console.log('Object created inside field:', object);
    } else {
      console.log('Object not found');
    }
  } catch (error) {
    console.log('Error finding or creating object inside field:', error);
  }
}

// Usage
const objectId = ID // Replace with the actual object ID
const fieldName = 'downvote';
const objectData = {email};

findObjectByIdAndCreateInsideField(objectId, fieldName, objectData);

})


router.post('/feeds/DownVote/Delete/:id',async (req,res)=>{

  const ID = req.params.id;
  const {email} =req.body
  console.log(ID);

  

async function findObjectByIdAndDeleteInsideField(objectId, fieldName, objectData) {
  try {
    const object = await Feeds.findOne({_id:objectId})
    if (object) {
      object.votes = object.votes + 1;


      object[fieldName].pop(objectData);
      await object.save();
    } 
  } catch (error) {
    console.log('Error finding or deleteing object inside field:', error);
  }
}

const objectId = ID 
const fieldName = 'downvote';
const objectData = {email};

findObjectByIdAndDeleteInsideField(objectId, fieldName, objectData);

})

// router.post('/feeds/Bookmark/Insert/:id', async (req, res) => {
//   const ID = req.params.id;
//   console.log(ID);
//   console.log(req.body.email);
//   const { email } = req.body;

//   async function findObjectByIdAndCreateInsideField(objectId, fieldName, objectData) {
//     try {
//       const object = await Feeds.findOne({ _id: objectId });
//       const userobject = await User.findOne({ email: useremail });

      

//       if (!userobject) {
//         console.log('User not found');
//         return;
//       }

//       // Check if the object is already bookmarked by the user
//       const isAlreadyBookmarked = userobject[fieldName].some((bookmark) => bookmark.equals(objectId));
//       if (isAlreadyBookmarked) {
//         console.log('Object already bookmarked by the user');
//         return;
//       }
//       userobject[fieldName].addToSet(object);
//       await userobject.save();


     

//       if (object) {
//         object[fieldName].push(objectData);
//         await object.save();
//         console.log('Object created inside field:', object);
//       } else {
//         console.log('Object not found');
//       }
//     } catch (error) {
//       console.log('Error finding or creating object inside field:', error);
//     }
//   }

//   const objectId = ID;
//   const fieldName = 'bookmarked';
//   const objectData = { email };
//   const useremail = email;

//    findObjectByIdAndCreateInsideField(objectId, fieldName, objectData);
// });

// Define the route to handle the POST request
router.post('/feeds/Bookmark/Insert/:id', async (req, res) => {
  try {
    const ID = req.params.id;
    const email = req.body.email;

    // Define the function to handle each request
    async function handleRequest(objectId, fieldName, objectData) {
      const userobject = await User.findOne({ email: objectData.email });

      if (!userobject) {
        console.log('User not found');
        return;
      }

      // Check if the object is already bookmarked by the user
      const isAlreadyBookmarked = userobject[fieldName].some((bookmark) => bookmark.equals(objectId));
      if (isAlreadyBookmarked) {
        console.log('Object already bookmarked by the user');
        return;
      }

      // Add the object to the user's bookmarked array
      userobject[fieldName].addToSet(objectId);
      await userobject.save();

      // Find the Feeds object by its ID
      const object = await Feeds.findOne({ _id: objectId });

      if (object) {
        object[fieldName].push(objectData);
        await object.save();
        console.log('Object created inside field:', object);
      } else {
        console.log('Object not found');
      }
    }

    const objectId = ID;
    const fieldName = 'bookmarked';
    const objectData = { email };

    // Call the function to handle the request
    await handleRequest(objectId, fieldName, objectData);

    // Respond to the request appropriately (you can customize this part)
    res.status(200).send('Request processed successfully');
  } catch (error) {
    console.log('Error handling request:', error);
    // Handle errors and send an appropriate response
    res.status(500).send('Internal server error');
  }
});



// router.post('/feeds/Bookmark/Delete/:id', async (req, res) => {
//   const ID = req.params.id;
//   const { email } = req.body;
//   console.log(ID);

//   async function findObjectByIdAndDeleteInsideField(objectId, fieldName) {
//     try {
//       const object = await Feeds.findOne({ _id: objectId });
//       const userobject = await User.findOne({ email: useremail });

//       if (!userobject) {
//         console.log('User not found');
//         return;
//       }

//       // Remove the object from the user's bookmarks using pull operator
//       userobject[fieldName].pull(object);
//       await userobject.save();

//       if (object) {
//         object[fieldName].pull({ email }); // Remove the bookmark based on the email field
//         await object.save();
//       }
//     } catch (error) {
//       console.log('Error finding or deleting object inside field:', error);
//     }
//   }

//   const objectId = ID;
//   const fieldName = 'bookmarked';
//   const useremail = email;

//   findObjectByIdAndDeleteInsideField(objectId, fieldName);
// });

router.post('/feeds/Bookmark/Delete/:id', async (req, res) => {
  try {
    const ID = req.params.id;
    const { email } = req.body;
    console.log(ID);

    // Define the function to handle each request
    async function handleRequest(objectId, fieldName, userEmail) {
      const object = await Feeds.findOne({ _id: objectId });
      const userobject = await User.findOne({ email: userEmail });

      if (!userobject) {
        console.log('User not found');
        return;
      }

      // Remove the object from the user's bookmarks using pull operator
      userobject[fieldName].pull(objectId);
      await userobject.save();

      if (object) {
        const bookmarkIndex = object[fieldName].findIndex((bookmark) => bookmark.email === userEmail);
        if (bookmarkIndex !== -1) {
          object[fieldName].splice(bookmarkIndex, 1);
          await object.save();
          console.log('Bookmark deleted from object:', object);
        } else {
          console.log('Bookmark not found in object');
        }
      } else {
        console.log('Object not found');
      }
    }

    const objectId = ID;
    const fieldName = 'bookmarked';

    // Call the function to handle the request
    await handleRequest(objectId, fieldName, email);

    // Respond to the request appropriately (you can customize this part)
    res.status(200).send('Request processed successfully');
  } catch (error) {
    console.log('Error handling request:', error);
    // Handle errors and send an appropriate response
    res.status(500).send('Internal server error');
  }
});


// router.post('/feeds/Bookmark/Insert/:id',async (req,res)=>{

//   const ID = req.params.id;

//   console.log(ID);

//   console.log(req.body.email);


//   const {email} =req.body

// async function findObjectByIdAndCreateInsideField(objectId, fieldName, objectData) {
//   try {
//     const object = await Feeds.findOne({_id:objectId})
//     const userobject = await User.findOne({email:useremail})

//     // console.log(userobject);

//     if(userobject){
//       userobject[fieldName].push(objectId);

      
//       await userobject.save();
//       // console.log(userobject);
//     }
//     else{
//       console.log("Allready Present");
//     }

    
//     if (object){
//       object[fieldName].push(objectData);
//       await object.save();
//       // console.log('Object created inside field:', object);
//     }

   
//     else {
//       console.log('Object not found');
//     }
//   } catch (error) {
//     console.log('Error finding or creating object inside field:', error);
//   }
// }

// // Usage
// const objectId = ID // Replace with the actual object ID
// const fieldName = 'bookmarked';
// const objectData = {email};
// const useremail = email;




// findObjectByIdAndCreateInsideField(objectId, fieldName, objectData);

// })



// router.post('/feeds/Bookmark/Delete/:id',async (req,res)=>{

//   const ID = req.params.id;
//   const {email} =req.body
//   console.log(ID);

  

// async function findObjectByIdAndDeleteInsideField(objectId, fieldName, objectData) {
//   try {
//     const object = await Feeds.findOne({_id:objectId})
//     const userobject = await User.findOne({email:useremail})

   

//     if(userobject){
//       userobject[fieldName].pop(objectId);
//       await userobject.save();

//       console.log(userobject);
//     }


//     else{
//       console.log("Allready Present");
//     }
//     if (object) {


//       object[fieldName].pop(objectData);
//       await object.save();
//     } 
//   } catch (error) {
//     console.log('Error finding or deleteing object inside field:', error);
//   }
// }

// const objectId = ID 
// const fieldName = 'bookmarked';
// const objectData = {email};
// const useremail = email;

// findObjectByIdAndDeleteInsideField(objectId, fieldName, objectData);

// })


// router.get(`/GetBlogById/:id`,async (req,res)=>{

//   const ID = req.params.id;

//   // console.log(ID);

//   const object = await Feeds.findOne({_id:ID})

//   // console.log(object);



//   res.send(object)



// })


router.get(`/GetBlogById/:id`,async (req,res)=>{

  const ID = req.params.id;


// console.log(ID);
  const object = await Feeds.findOne({_id:ID})
  // console.log(object);

  res.send(object)



})



router.get(`/GetProfileBlogById/:id`,async (req,res)=>{

  const ID = req.params.id;

  // console.log(ID);

  const object = await Feeds.findOne({_id:ID})

  

  res.send(object)



})


router.get(`/GetUserFollowersById/:id`,async (req,res)=>{

  const ID = req.params.id;

  console.log(ID);

  const object = await User.findOne({_id:ID})

  
  console.log(object);
  res.send(object)



})


router.get(`/GetUserFollowingById/:id`,async (req,res)=>{

  const ID = req.params.id;

  // console.log(ID);

  const object = await User.findOne({_id:ID})

  
// console.log(object);
  res.send(object)



})

router.post('/Userprofile/Following/Insert/:id',async (req,res)=>{

 

  const ID = req.params.id;

  const {email} =req.body
  // console.log(ID);

  // console.log(req.body.email);



async function findObjectByIdAndCreateInsideField(objectId, fieldName, objectData,FollowersfieldName) {
  try {
    const object = await Feeds.findOne({_id:objectId})
    const userobject = await User.findOne({email:useremail})
    const Followersobject = await User.findOne({_id:objectId})

    // console.log(userobject);

    if(userobject){
      userobject[fieldName].push(objectId);
      Followersobject[FollowersfieldName].push(userobject._id);
      await userobject.save();
      await Followersobject.save();
      // console.log(userobject);
    }
    else{
      console.log("Allready Present");
    }

    
    if (object){
      object[fieldName].push(objectData);
      await object.save();
      // console.log('Object created inside field:', object);
    }

   
    else {
      // console.log('Object not found');
    }
  } catch (error) {
    console.log('Error finding or creating object inside field:', error);
  }
}

// Usage

const objectId = ID // Replace with the actual object ID
const fieldName = 'Following';
const objectData = {email};
const useremail = email;
const FollowersfieldName = 'Followers';




findObjectByIdAndCreateInsideField(objectId, fieldName, objectData,FollowersfieldName);

})



router.post('/Userprofile/Following/Delete/:id',async (req,res)=>{

  const ID = req.params.id;
  const {email} =req.body
   console.log(ID);

  console.log(req.body.email);

  

async function findObjectByIdAndDeleteInsideField(objectId, fieldName, objectData,FollowersfieldName) {
  try {
    const object = await Feeds.findOne({_id:objectId})
    const userobject = await User.findOne({email:useremail})
    const Followersobject = await User.findOne({_id:objectId})


   

    if(userobject){
      userobject[fieldName].pop(objectId);
      Followersobject[FollowersfieldName].pop(userobject._id);
      await userobject.save();
      await Followersobject.save();
      console.log(userobject);
    }
    else{
      console.log("Allready Present");
    }
    if (object) {


      object[fieldName].pop(objectData);
      await object.save();
    } 
  } catch (error) {
    console.log('Error finding or deleteing object inside field:', error);
  }
}

const objectId = ID 
const fieldName = 'Following';
const FollowersfieldName = 'Followers';
const objectData = {email};
const useremail = email;

findObjectByIdAndDeleteInsideField(objectId, fieldName, objectData,FollowersfieldName);

})







router.post('/Userprofile/Followback/Insert/:id',async (req,res)=>{

 

  const ID = req.params.id;

  const {email} =req.body
  console.log(ID);

  console.log(req.body.email);



async function findObjectByIdAndCreateInsideField(objectId, fieldName,userfieldName) {
  try {
    // const userobject = await User.findOne({email:useremail})

    const Followersobject = await User.findOne({email:useremail})

    const Userobject = await User.findOne({_id:objectId})

    // console.log(userobject);

    if(Followersobject){
      Followersobject[fieldName].push(objectId);
      Userobject[userfieldName].push(Followersobject._id);
      await Followersobject.save();
      await  Userobject.save();
      console.log(Followersobject);
    }
    else{
      console.log("Allready Present");
    }


  } catch (error) {
    console.log('Error finding or creating object inside field:', error);
  }
}

// Usage

const objectId = ID // Replace with the actual object ID
const fieldName = 'Followers';
const userfieldName = 'Following';
const useremail = email;




findObjectByIdAndCreateInsideField(objectId, fieldName,userfieldName);

})



router.post('/Userprofile/Followback/Delete/:id',async (req,res)=>{

  

  const ID = req.params.id;
  const {email} =req.body
   console.log(ID);

  console.log(req.body.email);

  

async function findObjectByIdAndDeleteInsideField(objectId, fieldName,userfieldName) {
  try {
    const Followersobject = await User.findOne({email:useremail})
    const Userobject = await User.findOne({_id:objectId})


   

    if(Followersobject){
      Followersobject[fieldName].pop(objectId);
      Userobject[userfieldName].pop(Followersobject._id);
      await Followersobject.save();
      await  Userobject.save();
      // console.log(Followersobject);
    }
    else{
      console.log("Allready Present");
    }
   
  } catch (error) {
    console.log('Error finding or deleteing object inside field:', error);
  }
}

const objectId = ID 
const fieldName = 'Followers';
const useremail = email;
const userfieldName = 'Following';

findObjectByIdAndDeleteInsideField(objectId, fieldName,userfieldName);

})



router.get('/users/:input', async (req, res) => {
  // const { username } = req.query;

  const name = req.params.input;

  console.log(name)

  try {
    const users = await User.find({ name: { $regex: name, $options: 'i' } });
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get(`/UserBlogs/:JsonUserData`, async (req, res) => {
  const Blogs = req.params.JsonUserData;
 

  const jsonString = Blogs;
const jsonData = JSON.parse(jsonString);

  const feedObjects = [];

  for (const blog of jsonData) {
    try {
      // console.log(blog);
      const feed = await Feeds.findOne({ _id: blog._id });

      if (feed) {
        feedObjects.push(feed);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // console.log(feedObjects);

  res.json(feedObjects);
});


router.post('/PostData',async (req,res)=>{

  
  
  const data = req.body;
  console.log(data);

const user = new Feeds(data);
await  user.save();

})


router.post('/AlterProfileData',async (req,res)=>{

  
  
  const data = req.body;


  const user = await User.findOne({ _id: data.id }).updateMany({name:data.name,profilePhoto:data.profilePhoto,email:data.email,profession:data.profession});

  console.log(user);

})


router.post(`/ViewsCount/:id`, async (req, res) => {
  const ID = req.params.id;

  try {
    const obj= await Feeds.findOneAndUpdate(
      { _id: ID }, 
      { $inc: { views: 1 } },
      { new: true } 
    );
console.log(obj);

   
res.send(obj)

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});



// deleteFromDatabase


router.post('/deleteFromDatabase/:id',async (req,res)=>{

  const ID = req.params.id;
  const {email} =req.body

  

async function findObjectByIdAndDeleteInsideField(objectId,  objectData) {


  try {
  await Feeds.findOneAndDelete({ _id: ID });

    const objectUser = await User.findOne({email:email})

    
    if (objectUser) {
      
      const blogsArray = objectUser.blogs;
      

     
      const indexToDelete = blogsArray.findIndex((item) => item._id == objectId);

      // console.log(indexToDelete);

      if (indexToDelete !== -1) {
        blogsArray.splice(indexToDelete, 1);
        await objectUser.save();
      }
  } 



res.status(200).json({ message: 'Object deleted successfully.' });
} catch (error) {
res.status(500).json({ error: 'Error deleting object from the database.' });
}

    
  


}

const objectId = ID 
const objectData = {email};

findObjectByIdAndDeleteInsideField(objectId, objectData);

})

router.get('/bookmarkData', requireToken, (req, res) => {
  console.log(req.user.bookmarked);

  // Fetch the user's bookmarked feeds
  Feeds.find({ _id: { $in: req.user.bookmarked } })
    .then((foundFeeds) => {
      // Send the found feeds and user ID in the response
      const responseData = {
        feeds: foundFeeds,
        userId: req.user._id,
      };

      res.send(responseData);
    })
    .catch((error) => {
      console.error('Error finding feeds:', error);
      res.status(500).json({ error: 'Error finding feeds' });
    });
});



router.post('/deleteFromUserBookmark/:id', async (req, res) => {
  const ID = req.params.id;
  const { id } = req.body;

 
  try {
    const objectUser = await User.findOne({ _id: id});

// console.log(objectUser);
    if (!objectUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    objectUser.bookmarked.pull(ID);

    await objectUser.save();

    res.status(200).json({ message: 'Object deleted successfully from user bookmark.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting object from the user bookmark.' });
  }
});

module.exports = router;












module.exports = router