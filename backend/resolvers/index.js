import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import courseResolver from "./course.resolver.js";


const mergedResolvers = mergeResolvers([userResolver,courseResolver]);

export default mergedResolvers;