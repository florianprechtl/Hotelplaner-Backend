export interface Room {
  roomNumber: string;
  building: string;
  type: string;
  description: string;
  isHandycapAccessable: boolean;
  level: number;
  isChildFriedly: boolean;
  dateLastCleaningTask: Date;
  notes: string;
}
