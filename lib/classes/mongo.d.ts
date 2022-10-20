import { FilterQuery, HydratedDocument, Model, UpdateQuery } from "mongoose";
import { Cache, MongoConstructor } from "../typings/types";
export default class Mongo<T> implements MongoConstructor<T> {
    cache?: Cache<T>;
    model: Model<T>;
    query: FilterQuery<T>;
    private key?;
    constructor(params: MongoConstructor<T>);
    delete(): Promise<HydratedDocument<T, {}, {}>>;
    /**
     * Find a document or an array of documents similar to [Model.findOne](https://mongoosejs.com/docs/api.html#model_Model-findOne). Passing in a parameter will return an array of documents that matches the filter similar to [Model.find](https://mongoosejs.com/docs/api.html#model_Model-find).
     * @example
     * new Mongo({ id: "123" }).findOne();
     * new Mongo().find({ isHuman: true });
    */
    find(filter?: FilterQuery<T>): Promise<HydratedDocument<T, {}, {}> | HydratedDocument<T, {}, {}>[]>;
    update(query: UpdateQuery<T>): Promise<HydratedDocument<T>>;
}
