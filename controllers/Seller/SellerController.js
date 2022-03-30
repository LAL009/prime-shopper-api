exports.register = async (req, res) => {
    try {
        req.body = _._form(req.body)
        var required = ["name", "email", "password"]
        var validate = _._checkFields(req.body, required)
        if (validate !== true) throw new Error(validate.message)

        req.body.password = _._hashPass(req.body.password)

        const seller = await Model._create(_Seller, req.body)

        _.res(res, seller, 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.doLogin = async (req, res) => {
    try {
        const condition = {
            email: req.body.email,
        }

        const seller = await Model._findOne(_Seller, condition, {}, false)
        if (!seller) throw new Error('Email Not Exists!Please Check Your Email')

        if (!_._comparPass(req.body.password, seller.password)) throw new Error('Invalid Password! Please check your password.');

        var sellerToken = JWT.sign({
            seller: seller._id
        }, CONFIG.JWT_KEY);

        _.res(res, await _.authResponse(seller, sellerToken), 200)

    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const condition = {
            _id: req.SellerAuth._id
        }

        const updateProfile = await Model._findOne(_Seller, condition, {}, false)
        if (!updateProfile) throw new Error('Invalid Argument')

        const updateFields = Object.keys(req.body);
        const allowFields = ['name', 'email', 'phoneNumber', 'status'];
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
            _id: req.SellerAuth._id
        }
        const seller = await Model._findOne(_Seller, condition, {})
        if (!seller) throw new Error('Not Found seller Profile')

        _.res(res, seller, 200)
    } catch (error) {
        _.res(res, error.message, 404)
    }
}

exports.changePassword = async (req, res) => {
    try {
        req.body = _._form(req.body);
        if (req.body.oldPassword && req.body.oldPassword != '') {
            const condition = {
                _id: req.SellerAuth._id,
                status: 'Active'
            }

            const seller = await Model._findOne(_Seller, condition, {}, false)

            if (!_._comparPass(req.body.oldPassword, seller.password)) {
                throw new Error('Invalid Old_Password');
            }
            else {
                if (req.body.password) {
                    seller.password = _._hashPass(req.body.password);
                    seller.save();
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

        const findSeller = await Model._findOne(_Seller, condition, {}, false)
        if (!findSeller) throw new Error('Oops ! Email is Not Accessed ! Please Enter Valid Email')

        var otp = _._generateToken(6, 'numeric')

        // // SAVE OTP
        var data = {
            otp: otp,
            user: findSeller._id,
        }
        const addOTP = await Model._create(_OTP, data);

        addOTP.save();

        // Send Mail
        const mail = {
            to: req.body.email,
            subject: 'PrimeShopper Seller Verification Code',
            template: 'otp.html',
            context: {
                subject: 'PrimeShopper Seller Verification Code',
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
            user: req.body.seller,
            otp: otp,
            status: 'Active',
        }

        const findOTP = await Model._findOne(_OTP, conditions, {}, false);
        if (!findOTP) throw new Error('Oops ! Invalid OTP');

        const seller = await Model._findOne(_Seller, { _id: conditions.user }, {}, false);
        if (!seller) throw new Error('Oops! Invalid seller');

        req.body = _._form(req.body);
        if (req.body.password && req.body.password != '') {

            seller.password = _._hashPass(req.body.password);

            seller.save();

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

exports.Statistics = async (req, res) => {
    try {
        const countConditions = {
            seller: req.SellerAuth._id
        }

        const products = await Model._count(_Products, countConditions);
        const sellerOrders = await Model._count(_Order, countConditions);
        const condition = {
            seller: req.SellerAuth._id,
            paymentStatus: 'Paid'
        }
        const group = {
            _id: null,
            totalAmount: {
                $sum: "$amount"
            }
        }
        const conditions = {
            seller: req.SellerAuth._id,
            status: 'Sent'
        }
        const groups = {
            _id: null,
            totalIncome: {
                $sum: "$total"
            }
        }
        const income = await Model.group(_Order, conditions, groups)
        const totalTransaction = await Model._count(_Payment, condition)
        const Amount = await Model.group(_Payment, condition, group)

        var totalIncome = income && income.length ? income[0].totalIncome : 0
        var totalAmount = Amount && Amount.length ? Amount[0].totalAmount : 0

        _.res(res, { products, sellerOrders, totalIncome, totalAmount, totalTransaction }, 200)
    } catch (error) {
        _.res(res, error.message, 404);
    }
}
