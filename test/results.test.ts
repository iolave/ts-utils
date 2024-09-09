import { Ok, Err } from "../src/results";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("./src/results", () => {
	describe(Ok.name, () => {
		const value = "value";

		it("should return result with value", async () => {
			const [val, err] = Ok("value")

			expect(err).to.be.null;
			expect(val).not.to.be.null;
			expect(val).to.be.eq(value);
		});
	});

	describe(Err.name, () => {
		const errMsg = "error";
		const error = new Error(errMsg);

		it("should return result with error from a given error", async () => {
			const [val, err] = Err(error);

			expect(val).to.be.null;
			expect(err).not.to.be.null;
			expect(err?.message).to.be.eq(errMsg);
		});

		it("should return result with error from a given message", async () => {
			const [val, err] = Err(errMsg);

			expect(val).to.be.null;
			expect(err).not.to.be.null;
			expect(err?.message).to.be.eq(errMsg);
		});
	});
});
