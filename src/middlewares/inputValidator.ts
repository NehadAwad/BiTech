import { Request, Response, NextFunction } from "express";
import { Schema } from "yup";

export const yupInputValidator = (
    bodySchema?: Schema<any> | null,
    paramsSchema?: Schema<any> | null,
    querySchema?: Schema<any> | null
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (bodySchema) {
                await bodySchema.validate(req.body, { abortEarly: false });
            }
            if (paramsSchema) {
                await paramsSchema.validate(req.params, { abortEarly: false });
            }
            if (querySchema) {
                await querySchema.validate(req.query, { abortEarly: false });
            }
            next();
        } catch (error: any) {
            const err = {};
            error.inner.forEach((e) => {
                err[e.path] = e.message;
            });
            res.status(400).json(err);
        }
    };
};