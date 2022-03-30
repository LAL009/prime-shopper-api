
var bcrypt = require('bcryptjs');
var fs = require('fs-extra');

module.exports = {

	_checkFields: function (body, required, skip = []) {

		for (var i = 0; i < required.length; i++) {

			// console.log(Object.keys(body).length);
			if (Object.keys(body).indexOf(required[i]) == -1) {
				return {
					is_valid: false,
					message: required[i].split('_').join(' ') + ' is required.'
				};
			}

		}


		for (var i = 0; i < Object.keys(body).length; i++) {
			var field = Object.keys(body)[i];
			// console.log(field);
			if (body[field] == null) {
				body[field] = ""
			}
			if (body[field].toString().trim() == "" && field !== 'image' &&
				required.indexOf(field) !== -1) {
				return {
					is_valid: false,
					message: field + ' is required.'
				};
			}

			if (field == "phoneNumber" && isNaN(Number(body[field]))) {
				return {
					is_valid: false,
					message: 'Please enter valid phone number.'
				};

			}

			if (field == 'email' && !this._validateEmail(body[field].toString().trim())) {
				return {
					is_valid: false,
					message: 'Please enter valid email address.'
				};
			}
		}

		return true;
	},

	res: function (res, message, status, is_api = true) {
		if (status !== 200) {
			if (message == 'default')
				message = 'Oops! something went wrong,Please try again.';
			var response = {
				status: 0,
				code: status,
				data: message
			}
			if (is_api) {
				res.send(JSON.stringify(response)).status(200);
			} else {
				res.status(status).send(message);
			}
			return;
		}


		var response = {
			status: 1,
			code: status,
			data: message
		}

		if (is_api) {
			res.send(JSON.stringify(response)).status(200);
		} else {
			res.send(message).status(status);
		}
		return;
	},
	_hashPass: function (pass) {
		return bcrypt.hashSync(pass, 10);
	},
	_comparPass: function (pass, hash) {
		return bcrypt.compareSync(pass, hash);
	},
	_form: function (body) {
		Object.keys(body).forEach(key => {
			if (typeof body[key] === 'string') {
				body[key] = body[key].replace(/<[^>]*>/g, '').split("db.").join("");
			}
		});
		return body;
	},
	_validateEmail: function (email) {
		// console.log(email);
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	},
	authResponse: async function (user, token = false) {

		var response = {
			_id: user._id,
			name: user.name,
			email: user.email,
			phoneNumber: user.phoneNumber,
			status: user.status,
			createdAt: user.createdAt
		}

		if (token) {
			response.token = token;
		}
		return response;
	},
	ext: function (name) {
		var ext = name.split('.')
		return ext[ext.length - 1]
	},
	_generateToken: function (size, type) {
		var token = randomstring.generate({
			length: size,
			charset: type
		})
		return token;
	},
	_checkDirectory: function (type) {
		return new Promise((resolve, reject) => {
			const directoryPath = APP_PATH + '/public'
			fs.readdir(directoryPath, (err, files) => {
				if (err) {
					reject(err);
				}
				var addImage = []
				files.forEach(file => {
					if ([type].indexOf([file]) == -1) {
						addImage = type
					}
					else {
						addImage = type
					}
				});
				resolve(addImage)
			})
		})
	},
	_findSeller: function (data) {
		var sellers = []
		data.map((order) => {
			order.products.map((products) => {
				sellers.push(products.seller)
			})
		})
		return sellers
	},
	_convertToSlug: function (Text) {
		return Text.toLowerCase()
			.replace(/ /g, '-')
			.replace(/[^\w-]+/g, '');
	},
	_moveFile: function (oldPath, newPath) {
		fs.move(oldPath, newPath, function (err) {
			if (err) return console.error(err)
			console.log("success!")
		})
	}
}


