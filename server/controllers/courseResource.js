import express from "express";
import mongoose from "mongoose";
import final_csv from "../constants/csv.js"
import { updateCourse } from "./course.js";
import CourseResource from "../models/courseResource.js";
import * as AWS from 'aws-sdk';
import * as AWSS3 from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';


// Create S3 service object
var s3 = new AWSS3.S3({apiVersion: '2021-02-02',region: "ap-northeast-3"
});

let file="courses.json"


const router = express.Router();

export const createResource = async (req, res) => {
  const resource = req.body;

  const user=resource.user;
  const file=resource.file;
  const fileName=resource.file_name;

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {Bucket: "nccu-course-resource", Key: user+"/"+fileName, Body: file};

  // Configure the file stream and obtain the upload parameters
  // var fileStream = fs.createReadStream(file);
  // fileStream.on('error', function(err) {
  //   console.log('File Error', err);
  // });
  // uploadParams.Body = fileStream;
  // uploadParams.Key = "user1/"+path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  s3.putObject(uploadParams,async function (err, data) {
    if (err) {
      console.log("Error", err);
    } if (data) {
      const newResource = new CourseResource({
        ...resource,
        file:"",
        file_url:"test",
        createdAt: new Date().toISOString(),
      });
    
      try {
        await newResource.save();
        res.status(201).json({newResource});
    
        //回傳之後，更新該課程的總評價 涼/甜/收穫
        // const course_id=feedback.course;
        // const courseFeedBacks = await CourseFeedBack.find({"course":course_id});	
        // updateCourse(courseFeedBacks,course_id);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    }
  });

  
};

export const getCourseResource = async (req, res) => {
	const { course_id } = req.body;
  try {
    const courseResources = await CourseResource.find({"course":course_id});
    // console.log("course_data",course_data);
    res.status(200).json({resource:courseResources});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
