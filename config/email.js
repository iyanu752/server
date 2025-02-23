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
    from: `Speedtype⚜️ <iyan752@gmail.com>`,
    to: 'iyanu752@gmail.com',
    subject: 'Message from Speedtype',
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
            <div style="max-width: 700px; background-color: #feffe1; margin: 0 auto; background-image: url('https://res.cloudinary.com/dlxrzazn6/image/upload/v1725041898/jepdinustkmgor5cltdp.png'); background-repeat: no-repeat; background-size: 50%; background-position: 130% 300%;">
              <div style="width: 100%; background-color: #2b2b2b; padding: 20px 0">
              <a href="https://www.darcia.agency" >
                <img
                  src="https://res.cloudinary.com/dlxrzazn6/image/upload/v1725043148/mmciecekert56v0xc3y9.png"
                  style="width: 100%; height: 70px; object-fit: contain"
                />
              </a> 
              </div>
              <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                  Darcia Hiring Agency
                </p>
                <div style="font-size: .8rem; margin: 0 30px">
                    <p>Full Name: <b>${name}</b></p>
                    <p>Email: <b>${email}</b></p>
                    <p>Message: <b>${message}</b></p>
                </div>
              </div>
            </div>
        </div>
      `,
  };

  Email(options)
};

module.exports = sendEmail;
