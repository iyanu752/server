const nodemailer = require("nodemailer");
const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'iyanu752@gmail.com', 
      pass: 'kuty icvd olmp fyzr',
    },
  });
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

const sendEmail = ({ name, email, message}) => {
  const options = {
    from: `Speedtype⚜️`,
    to: 'iyanu752@gmail.com',
    subject: 'Message from Speedtype',
    html: `
   <div style="width: 100%; background-color: #333346; padding: 5rem 0">
            <div style="max-width: 700px; background-color: #71c3f7; margin: 0 auto;">
              <div style="width: 100%; background-color: #FFFFFF; padding: 20px 0">
              <a href="https://speedtype-five.vercel.app/" >
                <img
                  src="https://res.cloudinary.com/dlxrzazn6/image/upload/v1740336148/speedlogo_hfmhwo.svg"
                  style="width: 100%; height: 70px; object-fit: contain"
                />
              </a> 
              </div>
              <div style="width: 100%; gap: 10px; color: #333346;text padding: 30px 0; display: grid">
                <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                  Speedtype
                </p>
                <div style="font-size: 1rem;  margin: 0 30px">
                    <p>Full Name: <b>${name}</b></p>
                    <p>Email: <b>${email}</b></p>
                    <p>Message: <b>${message}</b></p>
                </div>
              </div>
            </div>
        </div>
      `
  };

  Email(options)
};

module.exports = sendEmail;
