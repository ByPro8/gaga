export interface VideoType {
  id: string;
  embedUrl?: string; // Make embedUrl optional
  thumbnail: string;
  hash: string;
  aspectRatio: string;
  title: string;
}
