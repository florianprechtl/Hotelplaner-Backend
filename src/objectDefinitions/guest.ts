import { IAddress } from "src/models/Address";

export type GuestObject = {
  firstName: string;
  lastName: string;
  address: IAddress["_id"];
  email: string;
  phoneNumber: string;
  notes: string;
};

export interface Guest {
  firstName: string;
  lastName: string;
  address: IAddress["_id"];
  email: string;
  phoneNumber: string;
  notes: string;
}
