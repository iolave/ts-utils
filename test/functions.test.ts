import { safe, safePromise } from "../src/functions";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("./src/functions", () => {
	describe(safePromise.name, () => {
		const ret = "string"
		const errMsg = "error";
		async function func(throws: boolean): Promise<string> {
			if (throws) throw new Error(errMsg);
			return ret;
		}

		it("should return error", async () => {
			const [val, err] = await safePromise(func(true));

			expect(val).to.be.null;
			expect(err).not.to.be.null;
			expect(err?.message).to.be.eq(errMsg);
		});

		it("should return string", async () => {
			const [val, err] = await safePromise(func(false));
			expect(err).to.be.null;
			expect(val).not.to.be.null;
			expect(val).to.be.eq(ret);
		});
	});

	describe(safe.name, () => {
		const ret = "string"
		const errMsg = "error";
		function func(throws: boolean): string {
			if (throws) throw new Error(errMsg);
			return ret;
		}

		it("should return error", async () => {
			const [val, err] = safe(() => func(true));

			expect(val).to.be.null;
			expect(err).not.to.be.null;
			expect(err?.message).to.be.eq(errMsg);
		});

		it("should return string", async () => {
			const [val, err] = safe(() => func(false));
			expect(err).to.be.null;
			expect(val).not.to.be.null;
			expect(val).to.be.eq(ret);
		});
	});
});
