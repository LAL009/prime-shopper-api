exports.register = async (req, res) => {
    try {
        // console.log(req.body);
        req.body = _._form(req.body)
        var required = ["name", "email", "password"]
        var validate = _._checkFields(req.body, required)
        if (validate !== true) throw new Error(validate.message)

        req.body.password = _._hashPass(req.body.password)

        const user = await Model._create(_Users, req.body)

        _.res(res, user, 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.doLogin = async (req, res) => {
    try {
        const condition = {
            email: req.body.email,
            status: 'Active'
        }

        const user = await Model._findOne(_Users, condition, {}, false)
        if (!user) throw new Error('Email Not Exists!Please Check Your Email')

        if (!_._comparPass(req.body.password, user.password)) throw new Error('Invalid Password! Please check your password.');

        var userToken = JWT.sign({
            user: user._id
        }, CONFIG.JWT_KEY);

        _.res(res, await _.authResponse(user, userToken), 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const condition = {
            _id: req.Auth._id
        }

        const updateProfile = await Model._findOne(_Users, condition, {}, false)
        console.log(updateProfile);
        if (!updateProfile) throw new Error('Invalid Argument')

        const updateFields = Object.keys(req.body);
        const allowFields = ['name', 'email', 'status'];
        const validations = updateFields.every((update) => allowFields.includes(update));
        if (!validations) throw new Error('Invalid Arguments')

        updateFields.map((update) => {
            updateProfile[update] = req.body[update];
        })

        var updatedProfile = await updateProfile.save()

        _.res(res, updatedProfile, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.getProfile = async (req, res) => {
    try {
        const condition = {
            _id: req.Auth._id
        }
        const user = await Model._findOne(_Users, condition, {})
        if (!user) throw new Error('Not Found User Profile')

        _.res(res, user, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.changePassword = async (req, res) => {
    try {
        req.body = _._form(req.body);
        console.log(req.body);
        if (req.body.oldPassword && req.body.oldPassword != '') {
            const condition = {
                _id: req.Auth._id,
                status: 'Active'
            }

            const user = await Model._findOne(_Users, condition, {}, false)

            if (!_._comparPass(req.body.oldPassword, user.password)) {
                throw new Error('Invalid Old_Password');
            }
            else {
                if (req.body.password) {
                    user.password = _._hashPass(req.body.password);
                    user.save();
                } else {
                    throw new Error('Please Enter New Password')
                }
            }
            _.res(res, 'Password Changed successfully', 200);
        } else {
            throw new Error('Old Password is Required');
        }
    } catch (error) {
        _.res(res, error.message, 404);
    }
}

exports.sendOTP = async (req, res) => {
    try {
        const condition = {
            email: req.body.email,
        }

        const findUser = await Model._findOne(_Users, condition, {}, false)
        if (!findUser) throw new Error('Oops ! Email is Not Accessed ! Please Enter Valid Email')

        var otp = _._generateToken(6, 'numeric')

        // // SAVE OTP
        var data = {
            otp: otp,
            user: findUser._id,
        }
        const addOTP = await Model._create(_OTP, data);

        addOTP.save();

        // Send Mail
        const mail = {
            to: req.body.email,
            subject: 'PrimeShopper Verification Code',
            template: 'otp.html',
            context: {
                subject: 'PrimeShopper Verification Code',
                otp: otp
            }
        }

        _Mail(mail);

        _.res(res, { id: addOTP.user }, 200)
    } catch (error) {
        _.res(res, error.message, 404);
    }
}

exports.resetPassword = async (req, res) => {
    try {
        var otp = req.body.otp;
        const conditions = {
            user: req.body.user,
            otp: otp,
            status: 'Active',
        }

        const findOTP = await Model._findOne(_OTP, conditions, {}, false);
        if (!findOTP) throw new Error('Oops ! Invalid OTP');

        const user = await Model._findOne(_Users, { _id: conditions.user }, {}, false);
        if (!user) throw new Error('Oops! Invalid user');

        req.body = _._form(req.body);
        if (req.body.password && req.body.password != '') {

            user.password = _._hashPass(req.body.password);

            user.save();

            findOTP.status = 'Inactive'
            await findOTP.save();

            _.res(res, 'Password updated successfully', 200);
        } else {
            throw new Error('Please!Enter New Password')
        }

    } catch (error) {
        _.res(res, error.message, 404);
    }
}

exports.UserStatistics = async (req, res) => {
    try {
        const countConditions = {
            user: req.Auth._id
        }

        const userOrders = await Model._count(_Order, countConditions);
        const condition = {
            seller: req.Auth._id,
            paymentStatus: 'Paid'
        }
        const group = {
            _id: null,
            totalAmount: {
                $sum: "$amount"
            }
        }
        const conditions = {
            seller: req.Auth._id,
            status: 'Sent'
        }
        const groups = {
            _id: null,
            totalIncome: {
                $sum: "$total"
            }
        }
        const totalTransaction = await Model._count(_Payment, condition)
        const Amount = await Model.group(_Payment, condition, group)

        var totalAmount = Amount && Amount.length ? Amount[0].totalAmount : 0

        _.res(res, { userOrders, totalAmount, totalTransaction }, 200)
    } catch (error) {
        _.res(res, error.message, 404);
    }
}