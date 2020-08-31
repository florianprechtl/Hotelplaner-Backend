import { Router, Response, Request } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import { Error, isValidObjectId } from "mongoose";
import { CompanyObject } from "src/objectDefinitions/company";
import Company, { ICompany } from "../../models/Company";

const router: Router = Router();

const onError = (res: Response, err: Error) => {
  res.status(HttpStatusCodes.BAD_REQUEST).json();
  console.log(err);
};

const onInvalidObjectId = (res: Response, id: any) => {
  res.status(HttpStatusCodes.NOT_ACCEPTABLE).json();
  console.log(id, " is not a valid ObjectId");
};

const checkCompany = [
  check("name", "Please include valid company name")
    .exists()
    .isString()
    .isLength({ max: 50 }),
  check("phoneNumber", "Please include valid phonenumber")
    .exists()
    .isString()
    .isMobilePhone("any")
    .isLength({ max: 50 }),
  check("email", "Please include valid company objectId")
    .exists()
    .isString()
    .isEmail()
    .isLength({ max: 50 }),
  check("address", "Please include valid email with a length of 12 bytes/chars")
    .exists()
    .isString()
    .isLength({ max: 24, min: 24 }),
  check("notes", "Please include valid notes")
    .optional()
    .isLength({ max: 500 }),
];

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Company.findById(id)
      .then((company) => {
        res.status(HttpStatusCodes.OK).json(company);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.get("/", (req, res, next) => {
  Company.find()
    .then((allCompanies) => {
      res.status(HttpStatusCodes.OK).json(allCompanies);
    })
    .catch((err) => onError(res, err));
});

router.post("/", checkCompany, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const companyInformation: ICompany = req.body;
  const newCompany = new Company(companyInformation);
  newCompany
    .save()
    .then((company) => {
      res.status(HttpStatusCodes.OK).json(company);
    })
    .catch((err) => onError(res, err));
});

router.put("/:id", checkCompany, (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    const updatedCompany: CompanyObject = req.body as CompanyObject;
    Company.findOneAndUpdate({ _id: id }, { $set: updatedCompany })
      .then((oldCompany) => {
        res.status(HttpStatusCodes.OK).json(oldCompany);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    Company.findByIdAndDelete({ _id: id })
      .then((deletedCompany) => {
        res.status(HttpStatusCodes.OK).json(deletedCompany);
      })
      .catch((err) => onError(res, err));
  } else {
    onInvalidObjectId(res, id);
  }
});

export default router;
