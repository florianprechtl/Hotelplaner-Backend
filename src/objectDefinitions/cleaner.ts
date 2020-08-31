import { IAddress } from "src/models/Address";

export type CleanerObject = {
  firstName: string;
  lastName: string;
  address: IAddress["_id"];
  email: string;
  phoneNumber: string;
  notes: string;
};

export interface Cleaner {
  firstName: string;
  lastName: string;
  address: IAddress["_id"];
  email: string;
  phoneNumber: string;
  notes: string;
}
