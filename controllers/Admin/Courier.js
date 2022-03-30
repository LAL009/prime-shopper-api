const Couriers = require('./../../models/schemas/CourierSchema');

exports.getAllCouriors = async (req, res) => {
    try {

        let allCouriers= await Couriers.find();

        res.status(200).json({
            status: 'success',
            data: allCouriers
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.addCourior = async (req, res) => {
    try {
        // console.log(req.body);
        await Couriers.create(req.body);
        let allCouriers = await Couriers.find();

        res.status(200).json({
            status: 'success',
            data: allCouriers
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.deleteCourior = async (req, res) => {
    try {
        if(!req.body.id){
            throw new Error("Please enter id")
        }
        
        await Couriers.findByIdAndDelete(req.body.id);

        let allCouriers= await Couriers.find();

        res.status(200).json({
            status: 'success',
            data: allCouriers
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}
