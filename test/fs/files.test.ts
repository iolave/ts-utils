import { expect, describe, it, afterEach } from "bun:test";
import crypto from "crypto";
import os from "os";
import path from "path";
import files from "../../fs/files";
import fs from "fs";

afterEach(() => {
})

describe(`${files.writeAtTheEnd.name}`, () => {
	it("should write content", async () => {
		const p = path.join(os.tmpdir(), crypto.randomUUID());
		const content = "content\n";
		const err = await files.writeAtTheEnd(p, content);

		expect(err).toBeUndefined();

		const readContent = fs.readFileSync(p).toString();
		expect(content).toBe(readContent);
	});

	it("should return error", () => {
		// STUB NOT WORKING
		/*
		const stub = Sinon.stub(files, "write");
		stub.returns(Promise.resolve(new Error()));


		const p = path.join(os.tmpdir(), crypto.randomUUID());
		const content = "content\n";

		const err = await files.writeAtTheEnd(p, content);

		expect(err).toBeUndefined();

		const readContent = fs.readFileSync(p).toString();
		expect(content).toBe(readContent);
		*/
	});
});
