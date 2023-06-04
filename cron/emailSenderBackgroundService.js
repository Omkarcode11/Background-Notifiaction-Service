
const EmailTransporter = require("../notifier/emailService");
const cron = require("node-cron");
const Notification = require("../model/Notification");


exports.backgroundService = cron.schedule("*/30 * * * * *", async () => {
  let result = [];
   console.log('Background Running ')
  const tickets = await Notification.find({ status: "NOT_SENT" }).limit(50);

  for (let i = 0; i < tickets.length; i++) {
    const emailObj = {
      from: "omkarsonawaneomkar2@gmail.com",
      to: tickets[i].recipientEmails,
      subject: tickets[i].subject,
      text: tickets[i].content,
    };

    EmailTransporter.sendMail(emailObj, async function (err, info) {
      if (err) {
        result.push(err.message);
      } else {
        //Mark the status as SENT
        result.push(info);
        tickets[i].status = "SEND";
        await tickets[i].save();
      }
    });
  }
  return result;
});
