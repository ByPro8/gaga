export interface PhotoType {
  id: string;
  src: string;
  desc: string;
  imageHash: string;
}

export interface AlbumType {
  title: string;
  albumDescription: string;
  thumbnail: string;
  albumHash: string;
  photos: PhotoType[];
}
