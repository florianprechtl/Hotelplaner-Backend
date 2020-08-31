import { IAddress } from "src/models/Address";

export type CompanyObject = {
  name: string;
  phoneNumber: string;
  cleaner: IAddress["_id"];
  notes: string;
};

export interface Company {
  name: string;
  phoneNumber: string;
  cleaner: IAddress["_id"];
  notes: string;
}
