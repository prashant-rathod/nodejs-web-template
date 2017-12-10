var handlers = {};
var settings = require(__dirname + '/settings');
var nodemailer = require('nodemailer');
var Recaptcha = require('node-recaptcha2').Recaptcha;
var Boom = require('boom');

// create reusable transporter object using the default SMTP transport
var smtpConfig = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    requireTLS: true,
    auth: {
        user: 'administrator@example.com',
        pass: 'ddhfjfkkgk'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

handlers.sendEmail = function (request, reply) {
    var emailData = request.payload;
   
    var response = {
        success: false,
        message: ''
    }

    var contactPoint = emailData.phone ? emailData.phone : emailData.eitherEmailPhone;
    

    var subject = "You have received an enquiry from " + contactPoint;

    var comments;
    if(emailData.comments){
        comments = '<p>Hello Example,</p>' + '<p>' + contactPoint + ' have made an enquiry.</p><p> Message - ' + emailData.comments + '</p><p>Regards,</p><p>' + contactPoint;
    }else{
        comments = '<p>Hello Example,</p>' + '<p>' + contactPoint + ' have made an enquiry.</p><p>Regards,</p><p>' + contactPoint;
    }

    var mailOptions = {
        from: 'administrator@example.in',
        to: 'connect@example.in',
        subject: subject,
        text: comments,
        html: comments
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            reply({success : false});
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);
        reply({ success: true });
    });
}

module.exports = handlers;