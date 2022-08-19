const common = require('../common/common');
const chatbox = require('../../model/chatbox');
require('dotenv').config();

class chatboxController {

  //add chat box
  async addChatBox(req,res){
    try{
      let message = req.body.message;
      let key    = req.body.type;
      let obj = {};
      let arrlist_mess = [];
      obj[key] = message;
      obj["date"] = new Date();
      arrlist_mess.push(obj);
      let chatb = new chatbox({ listMess: arrlist_mess });
      await chatb.save(function(error,result){
        if (error) {
          return res.json({
            status: 0,
            mess:"Không thể gửi tin nhắn"
          }) 
        }
        else{
          return res.json({
            status: 1,
            mess: result._id
          })
        }          
      });      
    }
    catch (error) {
      console.log(error);
    }
  }
  //update chat box
  async updateChatBox(req,res){
    try{
      let RoomID = req.body.RoomID;
      let message = req.body.message;
      let key    = req.body.type;
      let obj = {};
      obj[key] = message;
      obj["date"] = new Date();
      let room =  await chatbox.findOne({_id: RoomID}); 
      if(room){
        room.listMess.push(obj);

        await chatbox.updateOne({ _id: RoomID }, { listMess: room.listMess }, function (err, result) {
          if (err) {
            return res.json({
              status: 0,
              mess: "Không thể gửi tin nhắn"
            })
          }
          else {
            return res.json({
              status: 1,
              mess: RoomID
            })
          }
        });
      }
      else{
        return res.json({
          status: 0,
          mess: "Không thể gửi tin nhắn"
        })
      }
             
    }
    catch (error) {
      console.log(error);
    }
  }
  //load chat
  async loadChatBox(req,res){
    try{
      let RoomID = req.query.RoomID;
      let room = await chatbox.findOne({ _id: RoomID }); 
      let listMess;
      if(room){
        listMess = room.listMess
      }
      else{
        listMess = [];
      }
      return res.json({
        list: listMess
      });
    }
    catch (error) {
      console.log(error);
    }
  }
  //loadListChat
  async loadListChat(req,res){
    try{
      let rooms = await chatbox.find({}, function (err, rooms) {
        if (err) throw err;
        return rooms;
      }) 
      return res.json({
        rooms: rooms
      });
    }
    catch (error) {
      console.log(error);
    }
  }
  async sendFiles(req,res){
    let arrayFiles = [];
    let roomID = req.body.roomid || false;
    let room_test = false;
    if(roomID){
      room_test =  await chatbox.findOne({_id: roomID});
    }
    
    let key = req.body.type;
    for(let i=0; i<req.files.length;i++){
      if(req.files[i].fieldname = 'attachFile[]'){
        arrayFiles.push('/imgs/chatbox_imgs/'+req.files[i].filename);
      }
    }
    let obj = {};
    obj[key] = arrayFiles;
    obj["files"] = req.files.length;
    obj["date"] = new Date();
    //insert db
    if(room_test){
      
      room_test.listMess.push(obj); 
      await chatbox.updateOne({ _id: req.body.roomid }, {listMess: room_test.listMess }, function (err, result) {
        if (err) {
          return res.json({
            status: 0,
            mess: "Không thể gửi tin nhắn"
          })
        }
        else {
          return res.json({
            status: 1,
            mess: obj[key],
            roomID: req.body.roomid
          })
        }
      });
      
    }
    else{
      let chatb = new chatbox({ listMess: [obj] });
      await chatb.save(function(error,result){
        if (error) {
          return res.json({
            status: 0,
            mess:"Không thể gửi tin nhắn"
          }) 
        }
        else{
          return res.json({
            status: 2,
            mess: obj[key],
            roomID: result._id
          })
        }          
      });
    }
    
  }
}
module.exports = new chatboxController