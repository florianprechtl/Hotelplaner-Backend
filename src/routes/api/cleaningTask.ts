import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import CleaningTask, { ICleaningTask } from "../../models/CleaningTask";
import { CleaningTaskObject } from "../../objectDefinitions/cleaningTask";
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

const checkCleaningTask = [
  check("date", "Please include valid date").isString().isLength({ max: 50 }),
  check("room", "Please include valid room id").isMongoId(),
  check("cleaner", "Please include valid cleaner id").isMongoId(),
  check("notes", "Please include valid notes")
    .optional()
    .isAlphanumeric()
    .isLength({ max: 500 }),
];

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    CleaningTask.findById(id)
      .then((cleaningTask) => {
        res.status(HttpStatusCodes.OK).json(cleaningTask);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.get("/", (req, res, next) => {
  CleaningTask.find()
    .then((allCleaningTasks) => {
      res.status(HttpStatusCodes.OK).json(allCleaningTasks);
    })
    .catch((err) => onError(res, err));
});

router.post("/", checkCleaningTask, (req: Request, res: Response) => {
  const body = req.body;
  const newCleaningTask: ICleaningTask = new CleaningTask(body);
  newCleaningTask.save().then((cleaningTask) => {
    res.status(200).json(cleaningTask);
  });
});

router.put("/:id", checkCleaningTask, (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const updatedCleaningTask: CleaningTaskObject = req.body as CleaningTaskObject;
    CleaningTask.findOneAndUpdate({ _id: id }, { $set: updatedCleaningTask })
      .then((oldCleaningTask) => {
        res.status(HttpStatusCodes.OK).json(oldCleaningTask);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    CleaningTask.findByIdAndDelete({ _id: id })
      .then((deletedCleaningTask) => {
        res.status(HttpStatusCodes.OK).json(deletedCleaningTask);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

export default router;
