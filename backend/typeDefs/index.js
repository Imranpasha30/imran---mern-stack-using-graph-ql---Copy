import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef.js";
import courseTypeDef from "./course.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef,courseTypeDef]);

export default mergedTypeDefs;
