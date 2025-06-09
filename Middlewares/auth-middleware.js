const Jwt =require('jsonwebtoken');

const authMiddleware =(req,res,next) =>{

    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Unauthorized Access'
        })
    }

    try{

        const decodedToken=Jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("decodedToken",decodedToken);
        
        req.userInfo=decodedToken;

        next();

    }catch(e){
        return res.status(401).json({
            success:false,
            message:'Access Denied'
        })
    }
}

module.exports=authMiddleware;