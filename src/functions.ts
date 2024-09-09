import { Err, Ok, Result } from "./results";

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
 * ```
 * // Safe json parse
 * const [parse, parseErr] = await safePromise(req.json());
 * ```
 */
export async function safePromise<T>(prom: Promise<T>): Promise<Result<T>> {
	return prom.then(v => Ok(v)).catch((e: Error) => Err(e));
}

/**
 * `safe<T>` is a function that takes a synchronous function
 * that returns `T` as an argument. `safe<T>` wraps the the passed
 * function in a try-catch statement.
 * - If any error is catched, `Err()` wil be returned.
 * - Otherwise, `Ok()` will be returned.
 *
 * For promises, it is recommended to use the `safePromise` method.
 *
 * @example
 * ```
 * // Safe json parse
 * const [parse, parseErr] = safe(() => JSON.parse("{not valid json}"));
 * ```
 */
export function safe<T>(fn: () => T): Result<T> {
	try {
		return Ok(fn());
	} catch (e) {
		const err = e as Error;
		return Err(err);
	}
}

