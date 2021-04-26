const nodemailer = require("nodemailer");
const path = require("path");

module.exports.sendWelcomeMail = async (receiver, data) => {
  let design = `
  <div
  style="max-width: 560px; padding: 20px; border-radius: 5px; margin: auto; font-size: 15px;background: #414242; font-family: Open Sans,Helvetica,Arial; ">
  <div style="text-align: center;">
    <img src="cid:logo" alt="logo" width="200" />
  </div>
  <div style="border-bottom: 3px solid #eeeeee; text-align: center; color: #ffffff;">
    <p style="font-size: 16px; ">
      Hi ${data.username}, thanks for using this template.
    </p>
    <p style="font-size: 30px; ">
      <strong>Data: Extra Data</strong>
    </p>
    <p style="font-size: 14px; ">
      Or extra data by clicking the following link <a target="_blank"
        style="background-color: #fff;padding: 5px;border-radius: 5px;" href=${'https://google.com'}>Extra Link</a>.
    </p>
    <p style="padding: 15px 0px; background: rgba(255,255,255,.16)!important; border-radius: 3px; line-height: 15px;">
      If you think this was a mistake, just ignore this email and nothing will happen.
    </p>
    <p style="padding: 10px 20px; text-align: left;">
      Best Regards,<br />
      ${emailSender}
    </p>
  </div>
</div>`

  // Add attachment to the email
  let attachment = [{
    filename: 'File_001.pdf',
    path: `${rootPath}/assets/Sample_Attachment.pdf`
  }]

  sendMail('Welcome to Node.js Template', receiver, design, attachment);

}

const sendMail = async (subject, receiver, content, attachment = []) => {

  // logo
  attachment.push({ path: `${rootPath}/assets/logo.png`, cid: 'logo' });

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false // do not fail on invalid or self signed cert
    }
  });

  let info = await transporter.sendMail({
    from: 'Shye Chern <noreply@domain.com>',
    to: receiver, // separate string by comma for multiple receiver (abc@domain.com, def@domain.ccom, ...)
    subject: subject,
    html: content,
    attachments: attachment
  });

  // console.log(info) for debugging
}