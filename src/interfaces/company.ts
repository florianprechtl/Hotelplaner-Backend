import { IAddress } from "src/models/Address";

export interface Company {
  name: string;
  phoneNumber: string;
  cleaner: IAddress["_id"];
  notes: string;
}
