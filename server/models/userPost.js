import mongoose from 'mongoose';

const postSchema = mongoose.Schema({    
    title: String, //標題
    message: String, //內文
    name: String, //使用者名稱
    creator: String, //使用者id (FK)
    tags: [String], 
    selectedFile: String, //貼文圖（只有一張）(<16mb的檔案在mongodb裡可用字串存) 
    likes: { type: [String], default: [] }, //讚數
    comments: { type: [String], default: [] }, //留言陣列
},{timestamps: true})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;