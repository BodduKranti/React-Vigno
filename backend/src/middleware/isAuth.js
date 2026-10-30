import jwt from "jsonwebtoken";

export const isAuthMiddleWare = async (req, res, next) => {
    try {

        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null;
        // console.log('tokenheader', tokenheader)

        // // const token = req.cookies?.token;
        // console.log('get req', req)
        // console.log('get cookie', req.cookies)
        console.log('token auth', token)

        // console.log("raw cookie header:", req.headers.cookie);
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