import express from "express";
import mongoose from "mongoose";
import final_csv from "../constants/csv2.js";
import Course from "../models/course.js";
import Product from "../models/product.js"
import { getUserLikes } from "./user.js";
import { checkExistFeedback } from "./courseFeedBack.js";
import CourseFeedBack from "../models/courseFeedBack.js";

const router = express.Router();

export const getProduct = async (req, res) => {
  console.log('req :', req.body);
  const sellerData = req.body;
  const result = await Product.getProduct(sellerData).catch(e => console.error(e.stack));
  console.log('result :', result);
  if(result.msg=="success"){
    res.status(200).json(result);
  }else{
    res.status(400).json(result);
  }
};

export const getAllProduct = async (req, res) => {
  console.log('req :', req.body);
  const sellerData = req.body;
  const result = await Product.getAllProduct(sellerData).catch(e => console.error(e.stack));
  console.log('result :', result);
  if(result.msg=="success"){
    res.status(200).json(result);
  }else{
    res.status(400).json(result);
  }
};

export const createProduct = async (req, res) => {
  console.log('req :', req.body);
  const product = req.body;
  const result = await Product.createProduct(product).catch(e => console.error(e.stack));
  console.log('result :', result);
  if(result.msg=="success"){
    res.status(200).json(result);
  }else{
    res.status(400).json(result);
  }
};

export default router;
