const express = require("express");
const { DistWiseReport,DistDrillReport } = require("../Controllers/reports-controller.js");
const authMiddleware = require("../Middlewares/auth-middleware.js");

const router = express.Router();

router.use("/distWiseReport",authMiddleware,DistWiseReport);
// router.use("/distDrillReport/:distCode",DistDrillReport); 
router.use("/distDrillReport",authMiddleware,DistDrillReport);  

module.exports=router;