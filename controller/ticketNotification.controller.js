const emailService = require("../notifier/emailService");
let Notification = require("./../model/Notification");

exports.acceptNotification = async (req, res) => {
  const notificationObject = {
    ticketId: req.body.ticketId,
    subject: req.body.subject,
    content: req.body.content,
    recipientEmails: req.body.recipientEmails,
    requester: req.body.requester,
  };

  try {
    const notification = await Notification.create(notificationObject);

    if (notification) {
      return res.status(201).json({
        message: "Your Request Accepted",
        requestId: notification._id,
        status: notification.status,
      });
    } else {
      return res.status(200).send("Your Request is Not Accepted");
    }
  } catch (err) {
    return res
      .status(500)
      .send({ err, message: "Some internal error Occurred" });
  }
};

exports.getNotification = async (req, res) => {
  try {
    let ticket = await Notification.findById(req.params.id);
    if (ticket) {
      return res.status(200).send(ticket);
    } else {
      return res.status(200).send("ticket not found");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.sendEmail = async (req, res) => {
  try {
    let notification = await Notification.findById(req.params.id);

    if (notification && notification.status == "NOT_SEND") {
      let emailObj = {
        from: "omkarsonawaneomkar2@gmail.com",
        to: notification.recipientEmails,
        subject: notification.subject,
        text: notification.content,
      };
      let status = await emailService.sendMail(emailObj, async(err,info)=>{
        if(err){
          console.log(err)
        }else{
          console.log(info)
        }
      });
      console.log(status);
      return res.status(200).send(status);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
