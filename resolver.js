import Post from './models/Post.model'
const resolvers = {
    Query: {
      hello: () => {
        return "Hello World";
      },
      getAllPosts: async ( )=>{
        const posts = await Post.find()
        return posts
      },
      getPostById: async ({id})=>{
        return await Post.findById(id)
      }
    },
    Mutation:{
      createPost:async (args)=>{
        const { title,description} = args.post
        const post =new Post({title,description})
        await post.save();
        return post;
      },
      deletePost: async(args)=>{
        const {id} = args
        await Post.findByIdAndDelete(id)
        return "Ok post deleted"
      },
      updatePost:async(args)=>{
        const {id} = args
        const { title,description} = args.post
        const post =await Post.findByIdAndUpdate(id,{ title,description},{new:true});
        return post
      }
    }
  };

module.exports = resolvers
