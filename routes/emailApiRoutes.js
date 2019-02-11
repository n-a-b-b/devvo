//Questions Email
const nodeMailer = require("nodemailer");
module.exports = function (app) {

  app.post("/api/email/send-email", function (req, res) {
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_EMAIL,
        clientId: process.env.GMAIL_CLIENTID,
        clientSecret: process.env.GMAIL_CLIENTSECRET,
        refreshToken: process.env.GMAIL_REFRESHTOKEN
      }
    });

    transporter.set("oauth2_provision_cb", (user, renew, callback) => {
      let accessToken = userTokens[user];
      if (!accessToken) {
        return callback(new Error("Unknown user"));
      } else {
        return callback(null, accessToken);
      }
    });

    let mailOptions = {
      from: process.env.GMAIL_EMAIL, // sender address
      to: process.env.GMAIL_EMAIL, // list of receivers
      subject: req.body.subject, // Subject line
      text: `[Message from: ${req.body.from}]\r\n \r\n ${req.body.body}`, // plain text body
    };

    console.log(mailOptions);

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