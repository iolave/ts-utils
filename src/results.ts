/**
 * `Result<T>` is inspired in the way golang handles errors.
 * This type is ment to be used as the return type of a function.
 */
export type Result<T> = [T, null] | [null, Error];

/**
 * `PResult<T>` is just an alias to `Promise<Result<T>>`.
 */
export type PResult<T> = Promise<Result<T>>;

/**
 * `Ok<T>` maps a value `v` of type `T` to `Result<T>`.
 */
export function Ok<T>(v: T): Result<T> {
	return [v, null];
}

/**
 * `Err` accepts either an `Error` or a `string`.
 * - If an `Error` is given, it will map the error
 * to `Result<any>`
 * - Otherwise, a new `Error` is created out of the
 * given string, then the error is mapped to `Result<any>`.
 */
export function Err(e: Error | string): Result<any> {
	if (e instanceof Error) return [null, e];

	return [null, new Error(e)];
}

export default { Ok, Err }
