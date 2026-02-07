const mongoose = require('mongoose');

const MONGODB_URI =process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}).then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  
  const Post = require('./models/Post');
  
  return Post.find().lean().exec();
}).then((posts) => {
  console.log('✅ Query successful! Found', posts.length, 'posts');
  console.log('Posts:', JSON.stringify(posts, null, 2));
  process.exit(0);
}).catch((err) => {
  console.error('❌ Error:', err.message);
  console.error('Full error:', err);
  process.exit(1);
});
