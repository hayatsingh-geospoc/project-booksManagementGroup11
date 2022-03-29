const jwt = require('jsonwebtoken')

const mid = function (req, res, next) {
    
    try {
        let token = req.headers['x-api-key']
        if (!token) {
            res.status(400).send({ status: false, msg: 'Token not present in the header' })
            return
        }
        let decodeToken = jwt.decode(token)
        if (!decodeToken) {
            return res.status(401).send({ status: false, msg: "Not a valid Token " })
        }
        jwt.verify(token,  "this-is-aSecretTokenForLogin");
        req.loggedInUser = decodeToken.userId
        next()


    } catch (error) {
        res.status(500).send({ status: false, msg: error })
    }
}

module.exports.mid = mid