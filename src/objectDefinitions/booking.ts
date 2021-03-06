import { IGuest } from "src/models/Guest";
import { ICompany } from "src/models/Company";

export type BookingObject = {
  checkinDate: Date;
  checkoutDate: Date;
  guest: IGuest["_id"];
  company: ICompany["_id"];
  hasBreakfast: boolean;
  paymentMethod: string;
  isPayed: boolean;
  notes: string;
};

export interface Booking {
  checkinDate: Date;
  checkoutDate: Date;
  guest: IGuest["_id"];
  company: ICompany["_id"];
  hasBreakfast: boolean;
  paymentMethod: string;
  isPayed: boolean;
  notes: string;
}
