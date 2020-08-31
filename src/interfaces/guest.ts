import { IAddress } from "src/models/Address";

export interface Guest {
  firstName: string;
  lastName: string;
  address: IAddress["_id"];
  email: string;
  phoneNumber: string;
  notes: string;
}
