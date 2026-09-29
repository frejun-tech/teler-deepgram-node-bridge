import { TelerException, UnprocessableRequestException, BadParametersException, type TelerErrorResponseBody } from "@frejun/teler";
import { NextFunction, Response, Request } from "express";

interface SerializedError {
  message: string;
  error: {
    name: string;
    status: number;
    errorCode?: string;
    type?: string;
    param?: string;
    details?: TelerErrorResponseBody;
  };
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof TelerException) {
    const status = typeof err.status === 'number' && !isNaN(err.status) ? err.status : 500;

    const errorResponse: SerializedError = {
      message: err.message,
      error: {
        name: err.name,
        status,
        ...(err.errorCode && { errorCode: err.errorCode }),
        ...(err.type && { type: err.type }),
        ...(err.param && { param: err.param }),
        ...(typeof err.details === "object" && err.details !== null
          ? { details: err.details as TelerErrorResponseBody }
          : {})
      }
    };

    return res.status(status).json(errorResponse);
  }

  return res.status(500).json({ message: "An unexpected error occurred" });
}