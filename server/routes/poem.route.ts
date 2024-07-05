import express from "express";
import {
    addAnswer,
    addQuestion,
  addReview,
  addReviewReply,
  editPoem,
  getAllPoems,
  getPoemsByUser,
  getSinglePoem,
  uploadPoem,
} from "../controller/poem.controller";
import { isAuthenticated } from "../middleware/auth";
import { validateRoles } from "../controller/user.controller";

const poemRouter = express.Router();

poemRouter.post(
  "/create-poem",
  isAuthenticated,
  uploadPoem
);

poemRouter.post(
  "/edit-poem/:id",
  isAuthenticated,
  editPoem
);

poemRouter.get("/get-poem/:id", getSinglePoem);

poemRouter.get("/get-poems", getAllPoems);

poemRouter.get("/get-poem-content/:id", isAuthenticated, getPoemsByUser);


poemRouter.put("/add-question", isAuthenticated, addQuestion);


poemRouter.put("/add-answer", isAuthenticated, addAnswer);

poemRouter.put("/add-review/:id", isAuthenticated, addReview);

poemRouter.put("/add-reply", isAuthenticated, addReviewReply);

export default poemRouter;
