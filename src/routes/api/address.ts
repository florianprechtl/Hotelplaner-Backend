import { Router, Response, Request, json } from "express";
import { check, validationResult, body } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Address, { IAddress } from "../../models/Address";
import { Error } from "mongoose";

const router: Router = Router();

const onError = (res: Response, err: Error) => {
  res.status(HttpStatusCodes.BAD_REQUEST).json();
  console.log(err);
};

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Address.findById(id)
    .then((address) => {
      res.status(HttpStatusCodes.OK).json(address);
    })
    .catch((err) => onError(res, err));
});

router.get("/", (req, res, next) => {
  Address.find()
    .then((address) => {
      res.status(HttpStatusCodes.OK).json(address);
    })
    .catch((err) => onError(res, err));
});

router.post("/", (req, res, next) => {
  const body = req.body;
  const newAddress = new Address({
    street: body.street,
    postCode: body.postCode,
    city: body.city,
    country: body.country,
    notes: body.notes,
  });
  newAddress
    .save()
    .then((address) => {
      res.status(HttpStatusCodes.OK).json(address);
    })
    .catch((err) => onError(res, err));
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const address = {
    street: body.street,
    postCode: body.postCode,
    city: body.city,
    country: body.country,
    notes: body.notes,
  };
  Address.updateOne({ _id: id }, { $set: address })
    .then((address) => {
      res.status(HttpStatusCodes.OK).json(address);
    })
    .catch((err) => onError(res, err));
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Address.findByIdAndDelete({ _id: id })
    .then((address) => {
      res.status(HttpStatusCodes.OK).json(address);
    })
    .catch((err) => onError(res, err));
});

export default router;
