import Sinon from "sinon";
import { expect } from "chai";
import crypto from "crypto";
import os from "os";
import path from "path";
import fs from "fs";
import streams from "../src/streams";
import files from "../src/files";

afterEach(() => {
	Sinon.restore();
})

describe("./src/files", () => {
	describe(files.writeAtTheEnd.name, () => {
		it("should write content", async () => {
			const p = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const err = await files.writeAtTheEnd(p, content, "utf8");

			expect(err).to.be.eq(undefined);

			const readContent = fs.readFileSync(p).toString();
			expect(content).to.be.eq(readContent);
		});

		it("should return error", async () => {
			Sinon.stub(streams, "write").resolves(new Error());

			const p = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";

			const err = await files.writeAtTheEnd(p, content);
			expect(err).not.to.be.undefined;
		});
	});
});
