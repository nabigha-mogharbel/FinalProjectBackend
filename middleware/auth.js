import jwt from "jsonwebtoken";
/**
 * @description multi-role authentication middleware. In order to work, it needs these headers
 * {id: `${objectId}`, authorization: `Bearer ${jwt token}`, role: "admin"||"superAdmin"||"user"}
 * @param {Array} role
 * @param {object} req
 *
 */
export const authorize = (role = []) => {
    let decoded;
  return [
    (req, res, next) => {
      try {
        let token = req.headers.authorization.split(" ")[1] || "none";
         decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          return res
            .status(401)
            .json({ error: true, message: "You are not logged in" });
        }
      } catch (error) {
        return res
          .status(401)
          .json({
            error: true,
            message: "We faced a problem checking your logged session",
          });
      }
      try {
        let reqRole = decoded.role || "none";
        if (role.includes(reqRole)) {
          next()
        } else {
          return res.status(403).send({
            message: "Access Denied. You can't access this page",
          });
        }
      } catch (e) {
        next(e)
      }
    },
  ];
};
export default authorize;