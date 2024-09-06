import { test, expect, describe } from "bun:test";
import { safe, safePromise } from "../../functions";

describe("safePromise", () => {
	const ret = "string"
	const errMsg = "error";
	async function func(throws: boolean): Promise<string> {
		if (throws) throw new Error(errMsg);
		return ret;
	}

	test("should return error", async () => {
		const [val, err] = await safePromise(func(true));

		expect(val).toBeNull();
		expect(err).not.toBeNull();
		expect(err?.message).toBe(errMsg);
	});

	test("should return string", async () => {
		const [val, err] = await safePromise(func(false));
		expect(err).toBeNull();
		expect(val).not.toBeNull();
		expect(val).toBe(ret);
	});
});

describe("safe", () => {
	const ret = "string"
	const errMsg = "error";
	function func(throws: boolean): string {
		if (throws) throw new Error(errMsg);
		return ret;
	}

	test("should return error", async () => {
		const [val, err] = safe(() => func(true));

		expect(val).toBeNull();
		expect(err).not.toBeNull();
		expect(err?.message).toBe(errMsg);
	});

	test("should return string", async () => {
		const [val, err] = safe(() => func(false));
		expect(err).toBeNull();
		expect(val).not.toBeNull();
		expect(val).toBe(ret);
	});
});
