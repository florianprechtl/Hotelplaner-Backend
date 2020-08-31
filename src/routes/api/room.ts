import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Room, { IRoom } from "../../models/Room";
import { RoomObject } from "../../objectDefinitions/room";
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

const checkRoom = [
  check("roomNumber", "Please include valid room number")
    .isString()
    .isLength({ max: 3 }),
  check("building", "Please include valid building")
    .isString()
    .isLength({ max: 50 }),
  check("type", "Please include valid room type")
    .isString()
    .isLength({ max: 50 }),
  check("description", "Please include valid description")
    .isString()
    .isLength({ max: 500 }),
  check(
    "isHandycapAccessable",
    "Please include valid handicap accessability status"
  ).isBoolean(),
  check("level", "Please include valid level").isNumeric(),
  check(
    "isChildFriendly",
    "Please include valid child friendlyness status"
  ).isBoolean(),
  check(
    "dateLastCleaningTask",
    "Please include valid date of the last cleaning task"
  )
    .optional()
    .isString(),
  check("notes", "Please include valid notes")
    .optional()
    .isLength({ max: 500 }),
];

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Room.findById(id)
      .then((room) => {
        res.status(HttpStatusCodes.OK).json(room);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.get("/", (req, res, next) => {
  Room.find()
    .then((allRooms) => {
      res.status(HttpStatusCodes.OK).json(allRooms);
    })
    .catch((err) => onError(res, err));
});

router.post("/", checkRoom, (req: Request, res: Response) => {
  const body = req.body;
  const newRoom: IRoom = new Room(body);
  newRoom.save().then((room) => {
    res.status(200).json(room);
  });
});

router.put("/:id", checkRoom, (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const updatedRoom: RoomObject = req.body as RoomObject;
    Room.findOneAndUpdate({ _id: id }, { $set: updatedRoom })
      .then((oldRoom) => {
        res.status(HttpStatusCodes.OK).json(oldRoom);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Room.findByIdAndDelete({ _id: id })
      .then((deletedRoom) => {
        res.status(HttpStatusCodes.OK).json(deletedRoom);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

export default router;
