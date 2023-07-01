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
      .send({ message: "Some internal error Occurred" });
  }
};

exports.getNotification = async (req, res) => {
  try {
    let notification = await Notification.findById(req.params.id);
    if (notification) {
      return res.status(200).send(notification);
    } else {
      return res.status(200).send("ticket not found");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.sendEmail = async (req, res) => {
  try {

    const notificationObj = {
      ticketId: req.body.ticketId,
      subject: req.body.subject,
      content: req.body.content,
      recipientEmails: req.body.recipientEmails,
      requester: req.body.requester,
    }

    let notification = await Notification.create(notificationObj)

    if (notification && notification.status == "NOT_SEND") {
      let emailObj = {
        from: "omkarsonawaneomkar2@gmail.com",
        to: notification.recipientEmails,
        subject: notification.subject,
        text: notification.content,
      };
      let status = await emailService.sendMail(emailObj);
      console.log(status);
      return res.status(200).send(status);
    } else if (notification && notification.status != 'NOT_SEND') {
      return res.status(200).send("Email Already send")
    } else {
      return res.status(404).send('Notification not Found')
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal Error');
  }
};
