const passw = "bbvh hors bgbq pxjm";
const email = "noreply.springworthbooks@gmail.com";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",

  secure: true, // use SSL
  auth: {
    // user: "itesa.getViral@gmail.com",
    // pass: "rtspkviskcrhorey",

    user: email, // generated ethereal user
    pass: passw, // generated ethereal password
  },
});

async function sendEmail({ name, email, phone, message, subject, adress ,cart }) {
  const emailOptions = {
    form: `${name}`,
    to: "sweetsips.tr@gmail.com",
    subject: `Order Message from ${email}`,
    html: ` <h2 style="font-size: 3rem; color: #F20F38; background-color: #110B10; padding: 50px; text-align: center;">Order Email</h2>
    <ul>
        <li><h3 style=" color: #110B10;">Name:</h3> <span>${name}</span></li>
        <li><h3 style=" color: #110B10;">Email:</h3> <span>${email}</span></li>
        <li><h3 style=" color: #110B10;">Phone:</h3> <span>${phone}</span></li>
        <li><h3 style=" color: #110B10;">Message:</h3> <span>${message}</span></li>
        <li><h3 style=" color: #110B10;">Adress:</h3> <span>${adress}</span></li>
        <li><h3 style=" color: #110B10;">Subject:</h3> <span>${subject}</span></li>
    </ul>
   
    <table style="border-collapse: collapse; width: 100%; border-spacing: unset;">
        <thead style="background-color: #110B10; color: #F20F38;">
            <tr style="border: 1px solid #F20F38;">
                <th style="border: none; padding: 8px; text-align: left;">Name</th>
                <th style="border: none; padding: 8px; text-align: left;">Quantity</th>
               
            </tr>
        </thead>
        <tbody style="background-color: #E8F0EB;">
            ${cart
              .map(
                (item) => `
            <tr style="border: 1px solid #490511;">
                <td style="border: none; padding: 8px;">${item.name}</td>
                <td style="border: none; padding: 8px;">${item.qty}</td>
                
             
              
            </tr>
            `
              )
              .join("")}
        </tbody>
    </table>
`,
  };

  return transporter.sendMail(emailOptions);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("DATA-,", req.body);
    const emailRes = await sendEmail(req.body);
    if (emailRes.messageId) {
      return res.status(200).json({ message: `Email sent successfuly` });
    }

    return res.status(400).json({ message: "Error sending email" });
  }

  return res
    .status(400)
    .json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });
}
