import { Router } from "express";
import {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getTotalExpense,
  getExpenseByCategory,
} from "../controllers/expense.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addExpense").post(verifyJWT, createExpense);
router.route("/getExpense").post(verifyJWT, getExpense);
router.route("/updateExpense/:id").patch(verifyJWT, updateExpense);
router.route("/deleteExpense/:id").delete(verifyJWT, deleteExpense);
router.route("/totalExpense").get(verifyJWT, getTotalExpense);
router.route("/expenseByCategory").get(verifyJWT, getExpenseByCategory);

export default router;
