const Post = require('./models/Post.model')
const resolvers = {
    Query: {
      hello: () => {
        return "Hello World";
      },
      getAllPosts: async ( )=>{
        const posts = await Post.find()
        return posts
      },
      getPostById: async (parent,{id},context,info)=>{
        return await Post.findById(id)
      }
    },
    Mutation:{
      createPost:async (parent,args,context,info)=>{
        const { title,description} = args.post
        const post =new Post({title,description})
        await post.save();
        return post;
      },
      deletePost: async(parent,args,context,info)=>{
        const {id} = args
        await Post.findByIdAndDelete(id)
        return "Ok post deleted"
      },
      updatePost:async(parent,args,context,info)=>{
        const {id} = args
        const { title,description} = args.post
        const post =await Post.findByIdAndUpdate(id,{ title,description},{new:true});
        return post
      }
    }
  };

module.exports = resolvers