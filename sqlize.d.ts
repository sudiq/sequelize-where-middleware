export declare function retrieveWhere(whereStr: string): Result | undefined;
export interface Result {
    where: Record<string, any>;
}
