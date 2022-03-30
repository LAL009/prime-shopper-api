var nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var layouts = require("handlebars-layouts");

var fs = require("fs");

const EMAIL = "kdmakwana43work@gmail.com";
const PASSWORD = "kd@googlework123146new";
const FROM_EMAIL = "kdmakwana43work@gmail.com";

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial(
    "layout",
    fs.readFileSync(path.join(__dirname, "templates/layout.hbs"), "utf8")
);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

module.exports = options => {
    new Promise((resolve, reject) => {
        fs.readFile(
            path.join(__dirname, "./templates/" + options.template),
            { encoding: "utf-8" },
            (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            }
        );
    })
        .then(html => {
            var template = handlebars.compile(html);
            options.context.logo = CONFIG.BASE_URL + "assets/images/logo.jpeg";
            var htmlToSend = template(options.context);
            var FROM = `PrimeShopper 	 <${FROM_EMAIL}>`;

            let mailOptions = {
                from: FROM,
                to: options.to,
                subject: options.subject,
                html: htmlToSend
            };

            transporter.sendMail(mailOptions, function (err, info) {
                console.log(err);
                console.log(info);
            });
        })
        .catch(err => {
            console.log(err);
        });
};
