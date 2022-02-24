import jwt from "jsonwebtoken"


const authMiddleWare = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1]

        const isGoogleLogin = accessToken.length > 500 
        let decodedToken 

        if(accessToken && !isGoogleLogin) {
            decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRETKEY)
            req.creatorId = decodedToken?.id
        }else{
            decodedToken = jwt.decode(accessToken)
            req.creatorId = decodedToken?.sub
        }

        next()
       
    } catch (error) {
        console.log(error)
    }
}

export default authMiddleWare