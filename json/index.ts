import { safe, type Result } from "../functions";

/**
 * `parse(string)` is the safe version of the
 * `JSON.parse(string)` function.
 */
function parse(str: string): Result<any> {
	return safe(() => JSON.parse(str));
}

export default {
	parse,
}
