exports._create = (schema, data) => {

	return new Promise(resolve => {
		let create = new schema(data)
		create.save((err, saved) => {
			if (err) {
				// console.error(err)
				resolve(err)
			} else {
				resolve(saved)
			}
		})
	})
}

exports._findOne = (schema, condition = {}, options = {}, lean = true) => {
	return new Promise(resolve => {
		var q = schema.findOne(condition);
		if (lean) {
			q.lean();
		}
		if (Array.isArray(options)) {
			options.forEach(key => {
				q[Object.keys(key)[0]](key[Object.keys(key)[0]]);
			})
		} else {
			if (Object.keys(options).length !== 0) {
				Object.keys(options).forEach(key => {
					q[key](options[key]);
				});
			}
		}
		q.exec((err, result) => {
			if (err) {
				resolve(false);
			} else {
				resolve(result);
			}
		})
	})
}

exports._find = (schema, condition = {}, options = {}) => {
	return new Promise(resolve => {
		var q = schema.find(condition);
		if (Array.isArray(options)) {
			options.forEach(key => {
				q[Object.keys(key)[0]](key[Object.keys(key)[0]]);
			})
		} else {
			if (Object.keys(options).length !== 0) {
				Object.keys(options).forEach(key => {
					q[key](options[key]);
				});
			}
		}
		q.exec((err, result) => {
			if (err) {
				console.error(err);
				resolve(false);
			} else {
				resolve(result);
			}
		})
	})
}


exports._count = (schema, condition = {}) => {
	return new Promise(resolve => {
		var q = schema.count(condition);
		q.exec((err, result) => {
			if (err) {
				console.error(err);
				resolve(0);
			} else {
				resolve(result);
			}
		})
	})
}

exports.group = (schema, condition = {}, group, sort = { _id: -1 }) => {
	return new Promise(resolve => {
		schema
			.aggregate()
			.match(condition)
			.group(group)
			.sort(sort)
			.exec((err, data) => {
				if (err || data.length === 0) {
					console.log('error', err)
					resolve([]);
					return;
				}
				resolve(data);
			})

	})
}

exports._chatInfo = (schema, condition, user) => {
	return new Promise(resolve => {
		schema
			.aggregate()
			.match(condition)
			.sort({ _id: -1 })
			.group({
				_id: { from: '$from', to: '$to' },
				message: { $first: '$message' },
				created_at: { $first: '$created_at' },
			})
			.exec((err, chat) => {
				if (err || chat.length === 0) {
					resolve([]);
					return;
				}
				// resolve(chat);
				resolve(_filterChat(chat, user));
			})

	})
}

_filterChat = async (chats, user) => {

	console.log('chats', chats)

	var result = [];
	for (let i = 0; i < chats.length; i++) {
		const chat = chats[i];

		var x = chat._id.from;
		chat.sendByMe = false;
		if (user == chat._id.from) {
			x = chat._id.to;
			chat.sendByMe = true;
		}
		result.push({
			message: chat.message,
			created_at: chat.created_at,
			shop: await Model._findOne(_Shop, { _id: x }, { select: 'name banner' })
		})

	}

	return result;
}