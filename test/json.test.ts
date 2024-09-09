import json from "../src/json";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("./src/json", () => {
	describe(json.parse.name, () => {
		const invalid = "{json}";

		it("should return result with error when invalid json is given", async () => {
			const [val, err] = json.parse(invalid);

			expect(val).to.be.null;
			expect(err).not.to.be.null;
		});
	});
});
