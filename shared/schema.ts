import { z } from "zod";

export const photoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  date: z.string(),
  location: z.string(),
  camera: z.string(),
  lens: z.string().optional(),
  iso: z.string().optional(),
  aperture: z.string().optional(),
  shutterSpeed: z.string().optional(),
  focalLength: z.string().optional(),
  imageUrl: z.string(),
  aspectRatio: z.enum(["square", "portrait", "landscape", "wide", "tall"]),
  featured: z.boolean().default(false),
});

export const photographerInfoSchema = z.object({
  name: z.string(),
  bio: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  specialties: z.array(z.string()),
});

export type Photo = z.infer<typeof photoSchema>;
export type PhotographerInfo = z.infer<typeof photographerInfoSchema>;
