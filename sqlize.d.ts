export declare function retrieveWhere(whereStr: string, options: Record<'blacklist', any>): Result | undefined;
export interface Result {
    where: Record<string, any>;
}
