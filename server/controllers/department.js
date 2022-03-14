import express from "express";
import mongoose from "mongoose";
import { departments } from "../constants/data.js";
import Department from "../models/department.js";

const router = express.Router();

export const dumpDepartment = async (req, res) => {
  const book = req.body;

  departments.forEach(async function (item) {
    const newDepartment = new Department(item);

    try {
      await newDepartment.save();
      // console.log(newCourse);
    } catch (error) {}
  });

  res.status(201).json({ result: "done" });
};
