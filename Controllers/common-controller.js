const { mongoose } = require("mongoose")

const getDistricts = async (req, res) => {
    try {
        const districtCollection = mongoose.connection.db.collection('districts_mst');
        const districtsData = await districtCollection.find({}, {
            projection: { _id: 0 }   ,    //without displaying the _id column
            sort:{dist_name:1}
        }).toArray();
        if(!districtsData){
            return res.status(404).json({
                success: false,
                message: 'Data Not Found',
                // Data: districtsData,
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Data Found',
            Data: districtsData,
        })

    } catch (e) {
        console.log(e.message);

       return res.status(500).json({
            success: false,
            message: 'An Error Occurred'
        })
    }
};

const getMandals = async (req, res) => {
    try {
        const mandalsCollection = mongoose.connection.db.collection('mandals_mst');
        const mandalsData = await mandalsCollection.find({}, {
            projection: { _id: 0 },
            sort:{mandal_name:1}
        }).toArray();
        res.status(200).json({
            success: true,
            message: 'Data Found',
            Data: mandalsData,
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            message: 'An error Occurred',
        })
    }
};

const getVillages = async (req, res) => {

    try {
        const villagesCollection = mongoose.connection.db.collection('villages_mst');
        const villagesData = await villagesCollection.find({}, {
            projection: { _id: 0 },
            sort:{village_name:1}
        }).toArray();
        res.status(200).json({
            success: true,
            message: 'Data Found',
            Data: villagesData
        })

    } catch (e) {
        res.status(500).json({
            succes: false,
            message: 'An Error occurred',
        })
    }
};

module.exports = {
    getDistricts,
    getMandals, 
    getVillages
}