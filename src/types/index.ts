export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: number;
}

export interface Dog {
  id: string;
  ownerId: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  photoURL?: string;
  createdAt: number;
}

export interface FeedingLog {
  id: string;
  dogId: string;
  foodType: string;
  amount: string;
  timestamp: number;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  dogId: string;
  type: 'vaccination' | 'vet-visit' | 'medication';
  description: string;
  date: number;
}