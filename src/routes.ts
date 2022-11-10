import { Express, Request, Response } from "express";
import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
  getAllPostHandler
} from "./controller/post.controller";


export default function (app: Express) {
  // Create a post
  app.post(
    "/api/posts",
    createPostHandler
  );

  // Update a post
  app.put(
    "/api/update/:postId",
    updatePostHandler
  );

  //
  app.get("/api/getdata", getAllPostHandler);

  // Get a post
  app.get("/api/posts/:postId", getPostHandler);

  // Delete a post
  app.delete(
    "/api/delete/:postId",
    // [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );
}
