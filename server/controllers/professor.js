import express from "express";
import mongoose from "mongoose";
import { professors } from "../constants/data.js";
import Professor from "../models/professor.js";

const router = express.Router();

export const dumpProfessor = async (req, res) => {
  const book = req.body;

  professors.forEach(async function (item) {
    const newProfessor = new Professor(item);

    try {
      await newProfessor.save();
      // console.log(newCourse);
    } catch (error) {}
  });

  res.status(201).json({ result: "done" });
};
