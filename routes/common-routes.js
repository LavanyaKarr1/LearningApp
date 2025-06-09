const express=require('express');
const { getDistricts, getMandals, getVillages } = require('../Controllers/common-controller');


const router=express.Router();

router.use('/getDistricts',getDistricts);
router.use('/getMandals',getMandals);
router.use('/getVillages',getVillages);

module.exports=router;