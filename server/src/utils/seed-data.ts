import fs from "fs/promises";

import config from "../config";
import type { Track, Genre } from "../generated/graphql";
import { createTrack } from "./db";
import { createSlug } from "./slug";

// Initialize directories
const initDirectories = async () => {
  try {
    await fs.mkdir(config.storage.tracksDir, { recursive: true });
    await fs.mkdir(config.storage.uploadsDir, { recursive: true });

    // Ensure genres file exists
    try {
      await fs.access(config.storage.genresFile);
    } catch {
      // Default genres
      const defaultGenres: Genre[] = [
        "Rock",
        "Pop",
        "Hip_Hop",
        "Jazz",
        "Classical",
        "Electronic",
        "RnB",
        "Country",
        "Folk",
        "Reggae",
        "Metal",
        "Blues",
        "Indie",
      ];
      await fs.writeFile(
        config.storage.genresFile,
        JSON.stringify(defaultGenres, null, 2)
      );
    }
  } catch (_error) {
    /* Ignore errors */
  }
};

// Sample data for music tracks
const artists = [
  "Taylor Swift",
  "Ed Sheeran",
  "Adele",
  "Drake",
  "Kendrick Lamar",
  "Beyoncé",
  "Coldplay",
  "Billie Eilish",
  "The Weeknd",
  "Dua Lipa",
  "Bruno Mars",
  "Ariana Grande",
  "Justin Bieber",
  "Post Malone",
  "Rihanna",
  "Lady Gaga",
  "BTS",
  "Harry Styles",
  "Bad Bunny",
  "SZA",
];

const albums = [
  "Midnight",
  "Divide",
  "30",
  "Certified Lover Boy",
  "DAMN.",
  "Renaissance",
  "Music of the Spheres",
  "Happier Than Ever",
  "Dawn FM",
  "Future Nostalgia",
  "24K Magic",
  "Positions",
  "Justice",
  "Beerbongs & Bentleys",
  "Anti",
  "Chromatica",
  "Proof",
  "Harry's House",
  "Un Verano Sin Ti",
  "SOS",
];

const trackTitles = [
  "Love Story",
  "Shape of You",
  "Hello",
  "God's Plan",
  "HUMBLE.",
  "BREAK MY SOUL",
  "Yellow",
  "bad guy",
  "Blinding Lights",
  "Levitating",
  "Uptown Funk",
  "thank u, next",
  "Peaches",
  "Circles",
  "Diamonds",
  "Rain On Me",
  "Dynamite",
  "As It Was",
  "Tití Me Preguntó",
  "Kill Bill",
  "Rocket Man",
  "Bohemian Rhapsody",
  "Thriller",
  "Smells Like Teen Spirit",
  "Sweet Child O' Mine",
  "Imagine",
  "Purple Haze",
  "Stairway to Heaven",
  "Like a Rolling Stone",
  "Respect",
  "Hey Jude",
  "What's Going On",
  "Good Vibrations",
  "Yesterday",
  "Superstition",
  "London Calling",
  "Purple Rain",
  "God Only Knows",
  "A Change Is Gonna Come",
  "Heroes",
  "Born to Run",
  "Billie Jean",
  "I Want to Hold Your Hand",
  "Gimme Shelter",
  "Waterloo Sunset",
  "Johnny B. Goode",
  "No Woman, No Cry",
  "What'd I Say",
  "Papa's Got a Brand New Bag",
  "Blowin' in the Wind",
];

// Helper to get random element from array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper to get random elements from array
const getRandomElements = <T>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate a single random track
const generateRandomTrack = async (
  genres: Genre[]
): Promise<Omit<Track, "id" | "createdAt" | "updatedAt">> => {
  const title = getRandomElement(trackTitles);
  const artist = getRandomElement(artists);
  const includeAlbum = Math.random() > 0.3; // 70% chance to have an album

  const track = {
    title,
    artist,
    album: includeAlbum ? getRandomElement(albums) : undefined,
    genres: getRandomElements(genres, 1, 3),
    slug: createSlug(title),
    coverImage: `https://picsum.photos/seed/${encodeURIComponent(
      title
    )}/300/300`,
  };

  return track;
};

// Generate and save multiple tracks
export const seedDatabase = async (count = 50): Promise<void> => {
  try {
    await initDirectories();

    const genresData = await fs.readFile(config.storage.genresFile, "utf-8");
    const genres = JSON.parse(genresData) as Genre[];

    for (let i = 0; i < count; i++) {
      const trackData = await generateRandomTrack(genres);
      await createTrack(trackData);
      process.stdout.write(`.`); // Show progress
    }
  } catch (_error) {
    // Ignore errors
  }
};

// If this script is run directly
if (require.main === module) {
  const count = process.argv[2] ? parseInt(process.argv[2], 10) : 50;
  seedDatabase(count)
    .then(() => {
      process.exit(0);
    })
    .catch((_error) => {
      process.exit(1);
    });
}
