export type RoomObject = {
  roomNumber: string;
  building: string;
  type: string;
  description: string;
  isHandycapAccessable: boolean;
  level: number;
  isChildFriendly: boolean;
  dateLastCleaningTask: Date;
  notes: string;
};

export interface Room {
  roomNumber: string;
  building: string;
  type: string;
  description: string;
  isHandycapAccessable: boolean;
  level: number;
  isChildFriendly: boolean;
  dateLastCleaningTask: Date;
  notes: string;
}
