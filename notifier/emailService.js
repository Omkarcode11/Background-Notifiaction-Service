let nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "omkarsonawaneomkar2",
    pass : "fztkgusjmvveunjs",
  },
  secure: true,
});


