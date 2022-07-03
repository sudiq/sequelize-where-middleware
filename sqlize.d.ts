import { BulkRecordError } from "sequelize/types"

export declare function retrieveWhere(whereStr: string): Result | undefined;
export interface Result {
    where: BulkRecordError;
};