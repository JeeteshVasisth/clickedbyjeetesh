import express, { type Request, Response, NextFunction, Router } from "express";
import serverless from "serverless-http";
import { storage } from "../../server/storage";

const api = express();
const router = Router();

api.use(express.json());
api.use(express.urlencoded({ extended: false }));

router.get("/photos", async (req, res) => {
  try {
    const photos = await storage.getPhotos();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photos" });
  }
});

router.get("/photos/:id", async (req, res) => {
  try {
    const photo = await storage.getPhoto(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photo" });
  }
});

router.get("/photographer", async (req, res) => {
  try {
    const info = await storage.getPhotographerInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photographer info" });
  }
});

api.use("/.netlify/functions/api", router);
api.use("/api", router);

api.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export const handler = serverless(api);
