import { Request, Response } from "express";
import { get } from "lodash";
import {
  createPost,
  findPost,
  findAndUpdate,
  deletePost,
  findAllPost
} from "../service/post.service";

export async function createPostHandler(req: Request, res: Response) {
  // const userId = get(req, "user._id");
  const body = req.body;
console.log("req.body",req.body)
  const post = await createPost({ ...body});

  return res.send(post);
}

export async function updatePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const _id = get(req, "params.postId");
  const update = req.body;

  console.log("req.body",req.body,req.params.id,_id)

  // const post = await findPost({ postId });

  // if (!post) {
  //   return res.sendStatus(404);
  // }

  
  const updatedPost = await findAndUpdate(_id, update, { new: true });

  return res.send(updatedPost);
}

export async function getAllPostHandler(req: Request, res: Response) {

  const post = await findAllPost();

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}


export async function getPostHandler(req: Request, res: Response) {
  const _id = get(req, "params.postId");
  const post = await findPost({ _id });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}

export async function deletePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const _id = get(req, "params.postId");

  await deletePost({ _id });

  return res.sendStatus(200);
}
