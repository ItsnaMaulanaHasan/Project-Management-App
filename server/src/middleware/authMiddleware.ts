import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return; // Pastikan selalu return jika sudah mengirimkan response
  }

  const blacklisted = await prisma.blacklistedToken.findUnique({
    where: { token },
  });

  if (blacklisted) {
    res.status(401).json({ message: "Token is expired. Please login again." });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return; // Return setelah response
    }

    // Jika token valid, tambahkan data user ke request object
    (req as any).user = user;
    next(); // Lanjutkan ke middleware berikutnya
  });
};
