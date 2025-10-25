import { type Photo } from "@shared/schema";

// Configuration for easy photo management
// To add new photos, simply add them to this array
export const PHOTO_CONFIG: Omit<Photo, "id">[] = [
  {
    title: "City Shadows",
    description: "Exploring the interplay of light and shadow in urban architecture, this photograph captures the geometric beauty found in everyday city structures.",
    category: "Architecture",
    tags: ["urban", "shadows", "buildings", "geometric", "city"],
    date: "March 2024",
    location: "New York, NY",
    camera: "Sony A7R IV",
    lens: "24-70mm f/2.8",
    iso: "400",
    aperture: "f/8.0",
    shutterSpeed: "1/125s",
    focalLength: "35mm",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
    aspectRatio: "portrait",
    featured: true,
  },
  {
    title: "Natural Grace",
    description: "A study in natural light and human emotion, capturing authentic moments that tell a deeper story.",
    category: "Portrait",
    tags: ["portrait", "natural light", "emotion", "people", "grace"],
    date: "February 2024",
    location: "Central Park, NY",
    camera: "Canon EOS R5",
    lens: "85mm f/1.4",
    iso: "200",
    aperture: "f/2.0",
    shutterSpeed: "1/200s",
    focalLength: "85mm",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1067",
    aspectRatio: "portrait",
    featured: false,
  },
  // Add more photos here following the same structure
  // Example of required fields for new photos:
  // {
  //   title: "Photo Title",
  //   description: "Photo description here",
  //   category: "Category (e.g., Portrait, Landscape, Street, Architecture)",
  //   tags: ["moon", "flowers", "sunset", "city", "nature"], // searchable tags
  //   date: "Month Year",
  //   location: "City, State/Country",
  //   camera: "Camera model",
  //   lens: "Lens model (optional)",
  //   iso: "ISO value (optional)",
  //   aperture: "f/X.X (optional)",
  //   shutterSpeed: "1/XXXs (optional)",
  //   focalLength: "XXmm (optional)",
  //   imageUrl: "https://your-image-url.com",
  //   aspectRatio: "square" | "portrait" | "landscape" | "wide" | "tall",
  //   featured: true/false,
  // }
];

// Utility functions for photo management
export const getAspectRatioClass = (aspectRatio: Photo["aspectRatio"]) => {
  switch (aspectRatio) {
    case "square":
      return "aspect-square";
    case "portrait":
      return "aspect-[4/5]";
    case "landscape":
      return "aspect-[5/4]";
    case "wide":
      return "aspect-[16/9]";
    case "tall":
      return "aspect-[3/5]";
    default:
      return "aspect-square";
  }
};
