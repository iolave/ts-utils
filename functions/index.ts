/**
 * `Result<T>` is inspired in the golang error handling
 * and is ment to be used as the return type of a function.
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
 * - If an `Error` is passed to it, it will simply map that error
 * to `Result<any>`
 * - Otherwise, it creates a new `Error` object with the
 * string passed, and will map that error a `Result<any>`.
 */
export function Err(e: Error | string): Result<any> {
	if (e instanceof Error) return [null, e];

	return [null, new Error(e)];
}

/**
 * `safePromise<T>` converts a promise return type to a safe
 * return `Return<T>`.
 * - If the promise does not throw, `Ok()` will be returned.
 * - If the promise throws an error, it will be catched and
 * `Err()` will be returned.
 *
 * For synchronous operations, it is recommended to use the
 * `safe` method.
 
 * @example
 * // Safe json parse
 * const [parse, parseErr] = await safePromise(req.json());
 */
export async function safePromise<T>(prom: Promise<T>): Promise<Result<T>> {
	return prom.then(v => Ok(v)).catch((e: Error) => Err(e));
}

/**
 * `safe<T>` is a function that takes a synchronous function
 * that returns `T` as an argument. It will wrap the the passed
 * function in a try-catch statement.
 * - If any error is catched, `Err()` wil be returned.
 * - Otherwise, `Ok()` will be returned.
 *
 * For promises, it is recommended to use the `safePromise` method.
 *
 * @example
 * // Safe json parse
 * const [parse, parseErr] = safe(() => JSON.parse("{not valid json}"));
 */
export function safe<T>(fn: () => T): Result<T> {
	try {
		return Ok(fn());
	} catch (e) {
		const err = e as Error;
		return Err(err);
	}
}

