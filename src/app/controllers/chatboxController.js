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
      let room =  await chatbox.findOne({_id: RoomID},function(err,room){
          if (err) throw err;
          return room;
      }) 
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
      let room = await chatbox.findOne({ _id: RoomID }, function (err, room) {
        if (err) throw err;
        return room;
      }) 
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
}
module.exports = new chatboxController