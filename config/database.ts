import dotenv from "dotenv";
import { createPool } from "mysql2/promise";
import { database } from "../config/config.development";

dotenv.config();

const db = createPool({
  host: database.db_host,
  user: database.db_user,
  password: database.db_password,
  database: database.db_name,
  port: database.db_port,
});

export default db;
