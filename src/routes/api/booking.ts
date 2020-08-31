import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Booking, { IBooking } from "../../models/Booking";
import { BookingObject } from "../../objectDefinitions/booking";
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

const checkBooking = [
  check("checkinDate", "Please include valid checkin date")
    .isString()
    .isLength({ max: 50 }),
  check("checkoutDate", "Please include valid checkout date")
    .isString()
    .isLength({ max: 50 }),
  check("guest", "Please include valid guest id").isMongoId(),
  check("company", "Please include valid company id").isMongoId(),
  check("hasBreakfast", "Pleasse include valid breakfast status").isBoolean(),
  check("paymentMethod", "Please include valid payment method")
    .isString()
    .isLength({ max: 50 }),
  check("isPayed", "Please include valid payment status").isBoolean(),
  check("notes", "Please include valid notes")
    .optional()
    .isAlphanumeric()
    .isLength({ max: 500 }),
];

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Booking.findById(id)
      .then((booking) => {
        res.status(HttpStatusCodes.OK).json(booking);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.get("/", (req, res, next) => {
  Booking.find()
    .then((allBookings) => {
      res.status(HttpStatusCodes.OK).json(allBookings);
    })
    .catch((err) => onError(res, err));
});

router.post("/", checkBooking, (req: Request, res: Response) => {
  const body = req.body;
  const newBooking: IBooking = new Booking(body);
  newBooking.save().then((booking) => {
    res.status(200).json(booking);
  });
});

router.put("/:id", checkBooking, (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const updatedBooking: BookingObject = req.body as BookingObject;
    Booking.findOneAndUpdate({ _id: id }, { $set: updatedBooking })
      .then((oldBooking) => {
        res.status(HttpStatusCodes.OK).json(oldBooking);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Booking.findByIdAndDelete({ _id: id })
      .then((deletedBooking) => {
        res.status(HttpStatusCodes.OK).json(deletedBooking);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

export default router;
