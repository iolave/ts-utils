import { safe } from "./functions";
import { Result } from "./results";

/**
 * `parse(string)` is the safe version of the
 * `JSON.parse(string)` function.
 */
export function parse(str: string): Result<any> {
	return safe(() => JSON.parse(str));
}

export default {
	parse,
}
