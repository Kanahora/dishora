/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { MongoCache, MongoConstructor } from "../typings/types";
export default class Mongo implements MongoConstructor {
    query: FilterQuery<unknown>;
    private sQuery;
    model: Model<unknown, unknown, unknown, {}, any>;
    cache: MongoCache;
    constructor(params: MongoConstructor);
    find(): Promise<import("mongoose").Document<any, any, any>>;
    update(query: UpdateQuery<unknown>): Promise<import("mongoose").Document<unknown, any, unknown> & Required<{
        _id: unknown;
    }>>;
    delete(): Promise<import("mongoose").Document<unknown, any, unknown> & Required<{
        _id: unknown;
    }>>;
}
