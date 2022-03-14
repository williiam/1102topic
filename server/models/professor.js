import mongoose from 'mongoose';

const professor = mongoose.Schema({  
    professor: String, //(PK)
    department: String, //所屬科系(FK)
    type: String, //職位 (教授/副教授/助理教授)
    email: String, //電子信箱
    extension_number: String, //校內分機號碼 
    education: String, //學歷
    person_website_url: String, //個人網站網址
    lab_website_url: String //實驗室網址
},{timestamps: true})

var Professor = mongoose.model('Professor', professor );

export default Professor;
