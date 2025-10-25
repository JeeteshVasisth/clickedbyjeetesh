# Photo Management Guide

## How to Add Your Own Photos

Your portfolio uses a simple code-based photo management system. All photos are configured in the `server/storage.ts` file.

### Step 1: Upload Your Photos
1. Upload your photos to an image hosting service like:
   - **Imgur** (free, easy to use)
   - **Cloudinary** (professional, free tier available)
   - **Your own web server**
   - **GitHub** (for public photos)

2. Get the direct image URL for each photo

### Step 2: Add Photo Data
Open `server/storage.ts` and add your photo to the `mockPhotos` array:

```typescript
{
  id: "9", // Use a unique number
  title: "Your Photo Title",
  description: "A detailed description of your photo and what makes it special.",
  category: "Landscape", // Nature, Portrait, Urban, Street, etc.
  tags: ["sunset", "mountains", "golden hour"], // Searchable keywords
  date: "January 2024",
  location: "Your Location",
  camera: "Your Camera Model",
  lens: "Your Lens",
  iso: "100",
  aperture: "f/8.0",
  shutterSpeed: "1/125s",
  focalLength: "24mm",
  imageUrl: "https://your-image-hosting-service.com/your-photo.jpg",
  aspectRatio: "landscape", // "landscape", "square", or "tall"
  featured: false, // Set to true for homepage highlights
},
```

### Step 3: Photo Requirements
- **Image Format**: JPG or PNG
- **Recommended Size**: 1200-2000px on the longest side
- **Aspect Ratios**: 
  - `landscape`: 4:3 or 3:2 ratio (horizontal)
  - `square`: 1:1 ratio
  - `tall`: 3:4 or 2:3 ratio (vertical)

### Step 4: Save and Reload
After adding your photo data, save the file. The website will automatically reload and show your new photos.

## Example: Adding a Real Photo

Here's a complete example of adding a landscape photo:

```typescript
{
  id: "my-sunset-1",
  title: "Golden Hour at the Lake",
  description: "A breathtaking sunset reflection captured during the perfect golden hour, showcasing nature's daily masterpiece with warm colors dancing across the calm water surface.",
  category: "Landscape",
  tags: ["sunset", "lake", "golden hour", "reflection", "nature"],
  date: "March 2024",
  location: "Lake Tahoe, CA",
  camera: "Canon EOS R6",
  lens: "24-70mm f/2.8",
  iso: "100",
  aperture: "f/11",
  shutterSpeed: "1/60s",
  focalLength: "35mm",
  imageUrl: "https://i.imgur.com/your-photo-id.jpg",
  aspectRatio: "landscape",
  featured: true,
},
```

## Tips for Great Photos
- Use descriptive titles that tell a story
- Write engaging descriptions (2-3 sentences work well)
- Add 3-5 relevant tags for better searchability
- Include technical camera data if available
- Set `featured: true` for your best 3-4 photos

## Removing Sample Photos
To replace the sample photos with your own:
1. Delete the sample photo objects from the `mockPhotos` array
2. Add your own photo objects
3. Keep the array structure intact

The website will automatically update to show only your photos!