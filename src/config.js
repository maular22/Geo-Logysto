import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const config = {
  PORT_SERVER: process.env.PORT || 3033,
  BBDD: process.env.BBDD || "localhost",
};
