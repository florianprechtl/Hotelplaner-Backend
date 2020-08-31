import { Router, Response, Request } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Address, { IAddress } from "../../models/Address";
import { Error, isValidObjectId } from "mongoose";
import { AddressObject } from "src/objectDefinitions/address";

const router: Router = Router();

const onError = (res: Response, err: Error) => {
  res.status(HttpStatusCodes.BAD_REQUEST).json();
  console.log(err);
};

const onInvalidObjectId = (res: Response, id: any) => {
  res.status(HttpStatusCodes.NOT_ACCEPTABLE).json();
  console.log(id, " is not a valid ObjectId");
};

const checkAddress = [
  check("street", "Please include valid street")
    .exists()
    .isString()
    .isLength({ max: 50 }),
  check("postCode", "Please include valid postCode")
    .exists()
    .isString()
    .isLength({ max: 5 }),
  check("city", "Please include valid city")
    .exists()
    .isString()
    .isLength({ max: 50 }),
  check("country", "Please include valid country")
    .exists()
    .isString()
    .isLength({ max: 50 }),
  check("notes", "Please include valid notes")
    .optional()
    .isLength({ max: 500 }),
];

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Address.findById(id)
      .then((address) => {
        res.status(HttpStatusCodes.OK).json(address);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.get("/", (req, res, next) => {
  Address.find()
    .then((allAddresses) => {
      res.status(HttpStatusCodes.OK).json(allAddresses);
    })
    .catch((err) => onError(res, err));
});

router.post("/", checkAddress, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const addressInformation: IAddress = req.body;
  const newAddress = new Address(addressInformation);
  newAddress
    .save()
    .then((address) => {
      res.status(HttpStatusCodes.OK).json(address);
    })
    .catch((err) => onError(res, err));
});

router.put("/:id", checkAddress, (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const updatedAddress: AddressObject = req.body as AddressObject;
    Address.findOneAndUpdate({ _id: id }, { $set: updatedAddress })
      .then((updatedAddress) => {
        res.status(HttpStatusCodes.OK).json(updatedAddress);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Address.findByIdAndDelete({ _id: id })
      .then((deletedAddress) => {
        res.status(HttpStatusCodes.OK).json(deletedAddress);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

export default router;
