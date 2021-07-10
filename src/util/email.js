/**
 * Email function with nodemailer
 * Consist of all the email with html template
 *
 * Email sender can be set at constants.js
 */
const path = require('path');
const nodemailer = require('nodemailer');
const { errorLog } = require('./log');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
	tls: {
		rejectUnauthorized: false, // do not fail on invalid or self signed cert
	},
});

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
      ${EMAIL_SENDER}
    </p>
  </div>
</div>`;

	// Add attachment to the email
	let attachment = [
		{
			filename: 'File_001.pdf',
			path: path.join(ROOT_PATH, 'assets/Sample_Attachment.pdf'),
		},
	];

	return sendMail('Welcome to Node.js Template', receiver, design, attachment);
};

const sendMail = async (subject, receiver, content, attachment = []) => {
	// logo
	attachment.push({ path: path.join(ROOT_PATH, 'assets/logo.png'), cid: 'logo' });

	try {
		const info = await transporter.sendMail({
			from: 'Shye Chern <noreply@domain.com>',
			to: receiver, // separate string by comma for multiple receiver (abc@domain.com, def@domain.ccom, ...)
			subject: subject,
			html: content,
			attachments: attachment,
		});

		// for debugging
		console.log(info);

		/* Sample return result
    {
      accepted: [ 'chern-97@hotmail.com' ],
      rejected: [],
      envelopeTime: 1336,
      messageTime: 4810,
      messageSize: 599859,
      response: '250 2.0.0 OK  1621857604 s6sm9951112pjr.29 - gsmtp',
      envelope: { from: 'noreply@domain.com', to: [ 'chern-97@hotmail.com' ] },
      messageId: '<ebbc072b-2a4b-1502-91c1-ab45aafd3b0a@domain.com>'
    }
    */
	} catch (err) {
		err.message += `\nFail to send ${subject} email to ${receiver}`;
		errorLog(err);
	}
};
