import mongoose from 'mongoose';

const textBook = mongoose.Schema({  
    id:String, //(PK)  
    ISBN:String, //國際標準書號
    introduction: String, //懶人包
    description: String, //評價內容
    price: Number, //定價
    user: String, //使用者id
    user_nickname: String, //使用者暱稱
    course: [String], //課程id (FK)
    course_semester: String, //e.g. "1101"
},{timestamps: true})

var TextBook = mongoose.model('textBook', textBook );

export default TextBook;