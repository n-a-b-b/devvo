//Questions Email
const nodeMailer = require("nodemailer");
module.exports = function (app) {

  app.post("/api/email/send-email", function (req, res) {
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "devvo.nabb@gmail.com",
        pass: "5@0e54xbR0X&1aZ9cK"
      }
    });
    let mailOptions = {
      from: req.body.from, // sender address
      to: "devvo.nabb@gmail.com", // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.body, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(404).send("Error sending email");
      } else {
        console.log("Message %s sent: %s", info.messageId, info.response);
        res.json(info);
      }
    });
  });
};