const messageModel = require('../model/messageModel');

const sendMsg = async (req, res) => {
  const { from, to, message } = req.body;

  try {
    const data = await messageModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });

    if (data) {
      console.log(data);
      return res.json({ message: "Message sent" });
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: err.message });
  }
};

const recieveMsg = async (req,res) => {
    try{
        const { from, to } = req.body;
        const msg=await messageModel.find({users:{$all:[from,to]}}).sort({updatedAt:1});
        const data=msg.map((item)=>{
        return{
            fromSelf:item.sender==from,
            message:item.message.text,
        }
    })
    return res.json(data);
    }
    catch(err){
        // console.error(err);
        return res.json({ message: "receiver error" });
    }
    
};

module.exports = { sendMsg, recieveMsg };
