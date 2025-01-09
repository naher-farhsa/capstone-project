import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Reminder } from "../models/reminder.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";

const createReminder = asyncHandler(async (req, res) => {
  const { title, amount, date } = req.body;
  if ([title].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const reminder = await Reminder.create({
    title,
    amount,
    date,
    user: req.user._id,
  });

  const createdReminder = await Reminder.findById(reminder._id);

  if (!createdReminder) {
    throw new ApiError(500, "Something went wrong while creating the reminder");
  }

  //  query to get user email
  const user = await User.findById(req.user._id);

  const reminderDate = createReminder.date;
  const currentDate = new Date();

  sendEmail(
    user.email,
    "Reminder",
    `You have a reminder for ${title} on ${date}`
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdReminder, "Reminder created successfully")
    );
});

const getReminder = asyncHandler(async (req, res) => {
  const reminder = await Reminder.find({
    user: req.user._id,
    isDeleted: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, reminder, "Reminder retrieved successfully"));
});

const updateReminder = asyncHandler(async (req, res) => {
  const reminder = await Reminder.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
});

const deleteReminder = asyncHandler(async (req, res) => {});

export { createReminder, getReminder, updateReminder, deleteReminder };
