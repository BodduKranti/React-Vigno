import jwt from "jsonwebtoken";

export const isAuthMiddleWare = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        console.log('get req', req)
        console.log('get cookie', req.cookies)
        console.log('token auth', token)
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // must match what genToken signs
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};