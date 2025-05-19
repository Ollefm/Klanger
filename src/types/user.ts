export type AppUser = {
  uid: string;
  email: string;
  username: string;
  createdAt: Date;
};

export type UserLBData = {
  uid: string;
  username: string;
  totalScore: number;
  gamesPlayed: number;
  scoreHistory: number [];
};


export type SignUpData = {
  email: string;
  password: string;
  username: string;
};

export type TrackData = {
  id: string;
  title: string;
  preview: string;
  album?: {
    cover_medium?: string;
  };
  artist?: {
    name?: string;
  };
}