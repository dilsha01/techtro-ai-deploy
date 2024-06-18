import jwt from "jsonwebtoken";




const auth = (req, res, next) => {
    try {
        //access token from cookies
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."});

        //validate token
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."});  
            //sucessful 
            req.user = user;
            next();
        })
      

    }catch (err) {   
        res.status(500).json({ message: err.message });
    }
}

export default auth;