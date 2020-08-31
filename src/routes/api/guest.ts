import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Guest, { IGuest } from "../../models/Guest";
import { GuestObject } from "../../objectDefinitions/guest";
import { Error, isValidObjectId } from "mongoose";

/**
 * import have to be ../../ istead of src/models/...
 * otherwise the error "Module not found" will be thrown
 */

const router: Router = Router();

const onError = (res: Response, err: Error) => {
  res.status(HttpStatusCodes.BAD_REQUEST).json();
  console.log(err);
};

const onInvalidObjectId = (res: Response, id: any) => {
  res.status(HttpStatusCodes.NOT_ACCEPTABLE).json();
  console.log(id, " is not a valid ObjectId");
};

const checkGuest = [
  check("firstName", "Please include valid firstname")
    .isAlpha()
    .isLength({ max: 50 }),
  check("lastName", "Please include valid lastanme")
    .isAlpha()
    .isLength({ max: 50 }),
  check("address", "Please include valid address").isMongoId(),
  check("email", "Please include valid email").isEmail(),
  check("phoneNumber", "Please include valid phonenumber").isMobilePhone("any"),
  check("notes", "Please include valid notes")
    .optional()
    .isAlphanumeric()
    .isLength({ max: 500 }),
];

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Guest.findById(id)
      .then((guest) => {
        res.status(HttpStatusCodes.OK).json(guest);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.get("/", (req, res, next) => {
  Guest.find()
    .then((allGuests) => {
      res.status(HttpStatusCodes.OK).json(allGuests);
    })
    .catch((err) => onError(res, err));
});

router.post("/", checkGuest, (req: Request, res: Response) => {
  const body = req.body;
  const newGuest: IGuest = new Guest(body);
  newGuest.save().then((guest) => {
    res.status(200).json(guest);
  });
});

router.put("/:id", checkGuest, (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const updatedGuest: GuestObject = req.body as GuestObject;
    Guest.findOneAndUpdate({ _id: id }, { $set: updatedGuest })
      .then((oldGuest) => {
        res.status(HttpStatusCodes.OK).json(oldGuest);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Guest.findByIdAndDelete({ _id: id })
      .then((deletedGuest) => {
        res.status(HttpStatusCodes.OK).json(deletedGuest);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

export default router;
