import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

require("dotenv").config();

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const host = process.env.HOST;
const port = parseInt(process.env.SMTP_PORT || '587');
const service = process.env.SMTP_SERVICE;

// auth
const mail = process.env.MAIL;
const password = process.env.PASSWORD;

const sendMail = async (option: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: host,
    port: port,
    service: service,
    auth: {
      user: mail,
      pass: password,
    },
  });

  const { email, subject, template, data } = option;

  // get the path_data to the email template file 
  const templatePath = path.join(__dirname, '../mails', template);

  //render the email template with EJS
  const html:string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: mail,
    to: email,
    subject,
    html
  };
  await transporter.sendMail(mailOptions);
};

export default sendMail;