import { Post } from "../models/post.model.js"
// create a post
const CreatePost = async (req,res) =>{
    try {
        const { name, description, age } = req.body || {};     //things needed in the body of request
        if (!name || !description || !age){
            return res.status(400).json({
                message:"Required fields are mandatory"
            });
        }
        //Post is name taken from model
        const post= await Post.create({name,description,age});
        res.status(201).json({
            message: "Post created Successfully",post
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error: error.message
        });
    }
}
const getPosts = async(req,res) =>{
try {
      const posts=await Post.find();
      res.status(200).json(posts);  
} catch (error) {
    res.status(500).json({
        message: "Internal Server error",error
    });
}
}
const updatePosts = async(req,res) =>{
    try {
        //basic validation
        if(Object.keys(req.body).length===0)
            return res.status(400).json({
        message: "Cannot pass empty fields"});
        //{name:x description:y age:z}->[name,description,age] counted as fields
        //{} truthy values

        const post=await Post.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!post) return res.status(404).json({
            message: "Could not find post"
        })

        res.status(200).json({
            message: "Post Updated Successfully",post
        })

    } catch (error) {
        res.status(500).json({
        message: "Internal Server error",error
    });
    }
}
const deletePosts=async(req,res) =>{
    try {
        const deleted=await Post.findByIdAndDelete(req.params.id);
        if(!deleted)return res.status(404).json({
            message: "Could not find the Required Post"
        });
    res.status(200).json({
    message: "Successfully deleted the Post"
    });
    } catch (error) {
    res.status(500).json({
        message: "Internal Server error",error
    });
    }
}
export {
    CreatePost,
    getPosts,
    updatePosts,
    deletePosts
};