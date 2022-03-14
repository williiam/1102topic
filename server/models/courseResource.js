import mongoose from 'mongoose';

const CourseResourceSchema = mongoose.Schema({    
  id:String, // (PK)
  introduction: String, //懶人包
  description: String, //課程資源描述
  user: String,//使用者id (FK)
  user_nickname: String, //使用者暱稱
  file_photo:String, //封面照
  file: String,
  file_name: String,
  file_url: String,
  course: String, //課程id (FK)
  course_semester: String, //學期(４碼) e.g."1101"
  course_code: String, //科目代碼
  num_of_thumbsup: Number, //按讚數
},{timestamps: true})

var CourseResource = mongoose.model('CourseResource', CourseResourceSchema);

export default CourseResource;