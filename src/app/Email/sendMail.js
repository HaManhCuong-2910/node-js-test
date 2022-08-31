const nodemailer =  require('nodemailer');
function sendMail(toEmail,sbj,ctn){
    let transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'cuonghamanhcuong12@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'lanattrbzhwuznwq' //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    
    let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        to: toEmail,
        subject: sbj,
        html: ctn //Nội dung html mình đã tạo trên kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
};

module.exports = sendMail;