import mongoose from 'mongoose';

const department = mongoose.Schema({  
    id:String, //(PK)  
    name: String, //名稱
    short: String, //短名稱
    chinese_name: String, //中文名稱
    note: String, //備註
    logo_img_url: String, //logo網址
    official_website_url: String, //官方網站網址
},{timestamps: true})

var Department = mongoose.model('department', department );

export default Department;