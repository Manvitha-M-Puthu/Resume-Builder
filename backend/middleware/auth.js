
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const token = req.header('x-auth-token') || req.headers.token;

    if (!token) {
        return res.status(401).json({ success: false, msg: "No token, authorization denied. Please login again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!token_decode.id) {
             return res.status(401).json({ success: false, msg: "Invalid token payload: User ID missing." });
        }

        req.user = token_decode.id;
        next(); 
    } catch (error) {
        console.error("Authentication Error:", error.message);
        res.status(401).json({ success: false, msg: `Token is not valid: ${error.message}` });
    }
};

export default authUser;