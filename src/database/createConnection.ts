import mongoose from "mongoose";
import logger from "../util/winston";

export function createConnectionAndInitialize(dbUrl: string): Promise<null> {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(dbUrl)
        .then(() => {
          resolve(null);
        })
        .catch((err) => {
          logger.error("DB not connected ", err);
          reject(err);
        });
    });
  }
  