import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all photos
  app.get("/api/photos", async (req, res) => {
    try {
      const photos = await storage.getPhotos();
      res.json(photos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch photos" });
    }
  });

  // Get single photo by ID
  app.get("/api/photos/:id", async (req, res) => {
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

  // Get photographer info
  app.get("/api/photographer", async (req, res) => {
    try {
      const info = await storage.getPhotographerInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch photographer info" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
