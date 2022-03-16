const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    // get Authorization header
    const fullToken = req.header('Authorization');
    // Return error if not found
    if(!fullToken) return res.status(401).json({message:"You need to be logged in to access this resource"});
    //Check if token starts with Bearer as is standard
    if(fullToken.startsWith("Bearer")){
        //Split actual token with Bearer
        let token = fullToken.substring(7, fullToken.length);
        try{
            //Verify token
            req.user = jwt.verify(token, process.env.TOKEN_SECRET);
            next();
        }catch (e) {
            //Return error if token is not valid
            res.status(400).json({message:"Invalid Token"});
        }
    }else{
        // Return error if token does not start with Bearer
       return res.status(400).json({message:"Invalid Token"});
    }


}
