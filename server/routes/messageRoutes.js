 import express from "express"; 
import { protectRoute } from "../middleware/auth";
import { getMessages, getUserForSideBar, markMessageAsSeen } from "../Controller/messageController";

 const messageRouter = express.Router();

 messageRouter.get("/users", protectRoute, getUserForSideBar);
 messageRouter.get("/:id", protectRoute, getMessages);
 messageRouter.put("mark/:id", protectRoute, markMessageAsSeen);

 export default messageRouter;