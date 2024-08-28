import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

const authenticateToken = async (req, res, next) => {
    try {
       
        const token = req.headers.authorization;
       // const token = req.headers.authorization.split(' ')[1]; // Extract token without "Bearer" prefix

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }


        const decoded = jwt.verify(token, JWT_SECRET);
        req.employeeId = decoded.id; // Attach employee id
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        console.error("Error in authenticateToken middleware:", error);
        res.status(403).json({ message: 'Forbidden' });
    }
};

export default authenticateToken;
