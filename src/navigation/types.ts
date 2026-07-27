export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  DogDetails: { dogId: string };
  FeedingHistory: { dogId: string };
  Profile: undefined;
};