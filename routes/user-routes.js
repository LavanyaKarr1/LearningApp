const express = require('express');
const { UserAddressDetails, userStudyDetails,getAddressDetails ,getStudyDetails} = require('../Controllers/user-controller');
const authMiddleware = require('../Middlewares/auth-middleware');


const router=express.Router();

router.post('/userAddressDetails',authMiddleware, UserAddressDetails);
router.post('/userStudyDetails',authMiddleware, userStudyDetails);
router.get("/address-details",authMiddleware,getAddressDetails);
router.get("/study-details",authMiddleware,getStudyDetails)

module.exports=router;