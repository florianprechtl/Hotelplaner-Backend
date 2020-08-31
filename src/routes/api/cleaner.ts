import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Cleaner, { ICleaner } from "../../models/Cleaner";
import { CleanerObject } from "../../objectDefinitions/cleaner";
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

const checkCleaner = [
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
    Cleaner.findById(id)
      .then((cleaner) => {
        res.status(HttpStatusCodes.OK).json(cleaner);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.get("/", (req, res, next) => {
  Cleaner.find()
    .then((allCleaners) => {
      res.status(HttpStatusCodes.OK).json(allCleaners);
    })
    .catch((err) => onError(res, err));
});

router.post("/", checkCleaner, (req: Request, res: Response) => {
  const body = req.body;
  const newCleaner: ICleaner = new Cleaner(body);
  newCleaner.save().then((cleaner) => {
    res.status(200).json(cleaner);
  });
});

router.put("/:id", checkCleaner, (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const updatedCleaner: CleanerObject = req.body as CleanerObject;
    Cleaner.findOneAndUpdate({ _id: id }, { $set: updatedCleaner })
      .then((oldCleaner) => {
        res.status(HttpStatusCodes.OK).json(oldCleaner);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Cleaner.findByIdAndDelete({ _id: id })
      .then((deletedCleaner) => {
        res.status(HttpStatusCodes.OK).json(deletedCleaner);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

export default router;
