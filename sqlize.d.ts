export declare function retrieveWhere(whereStr: string, options: Record<'blacklist', Array<string>>): Result | undefined;
export interface Result {
    where: Record<string, any>;
}
