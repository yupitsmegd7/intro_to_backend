import { Router } from 'express';
import { CreatePost, deletePosts, getPosts, updatePosts } from '../controllers/post.controller.js';

const router=Router();
router.route('/create').post(CreatePost);
router.route('/get').get(getPosts);
router.route('/update/:id').patch(updatePosts)
router.route('/delete/:id').delete(deletePosts)
export default router;
/*Because router was exported using export default, 
you can name it anything you want when importing it.
 In app.js, it is imported with the identifier userRouter. */