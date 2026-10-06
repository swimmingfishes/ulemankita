import * as schema from "./schema.ts";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema);
