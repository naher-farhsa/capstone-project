import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    expense_description: {
      type: String,
      required: true,
    },
    expense_category: {
      type: String,
      required: true,
    },
    expense_amount: {
      type: Number,
      required: true,
    },
    expense_date: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);
