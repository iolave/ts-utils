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

	describe(files.removeLine.name, () => {
		it("should remove line from a file", async () => {
			const tmpFile = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const lineToRemove = { idx: 10, content: "remove\n" }

			for (let i = 0; i < lineToRemove.idx - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			for (let i = 0; i < lineToRemove.idx - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}

			const err = await files.removeLine(tmpFile, lineToRemove.idx);
			expect(err).to.be.undefined;
			const fileContent = fs.readFileSync(tmpFile).toString();
			expect(fileContent.includes(lineToRemove.content)).to.be.false;
		});

		it("should return error cuz of write at the end error", async () => {
			const tmpFile = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const lineToRemove = { idx: 10, content: "remove\n" }

			for (let i = 0; i < lineToRemove.idx - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			for (let i = 0; i < lineToRemove.idx - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}

			Sinon.stub(streams, "write").resolves(new Error());

			const err = await files.removeLine(tmpFile, lineToRemove.idx);
			expect(err).not.to.be.undefined;
			expect(err).to.be.instanceOf(Error);
		});

		it("should return error cuz of read file error", async () => {
			const tmpFile = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const lineToRemove = { idx: 10, content: "remove\n" }

			for (let i = 0; i < lineToRemove.idx - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			for (let i = 0; i < lineToRemove.idx - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}

			Sinon.stub(fs, "readFileSync").throws(new Error());

			const err = await files.removeLine(tmpFile, lineToRemove.idx);
			expect(err).not.to.be.undefined;
			expect(err).to.be.instanceOf(Error);
		});

		it("should return error cuz of move error", async () => {
			const tmpFile = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const lineToRemove = { idx: 10, content: "remove\n" }

			for (let i = 0; i < lineToRemove.idx - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			for (let i = 0; i < lineToRemove.idx - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}

			Sinon.stub(fs, "renameSync").throws(new Error());

			const err = await files.removeLine(tmpFile, lineToRemove.idx);
			expect(err).not.to.be.undefined;
			expect(err).to.be.instanceOf(Error);
		});
	});

	describe(files.removeLines.name, () => {
		it("should remove line from a file", async () => {
			const tmpFile = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const lineToRemove = { idx: [10, 11], content: "remove\n" }

			for (let i = 0; i < lineToRemove.idx[0] - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			for (let i = 0; i < lineToRemove.idx[0] - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}

			const err = await files.removeLines(tmpFile, ...lineToRemove.idx);
			expect(err).to.be.undefined;
			const fileContent = fs.readFileSync(tmpFile).toString();
			expect(fileContent.includes(lineToRemove.content)).to.be.false;
		});

		it("should return error cuz of write at the end error", async () => {
			const tmpFile = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const lineToRemove = { idx: [10, 11], content: "remove\n" }

			for (let i = 0; i < lineToRemove.idx[0] - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			for (let i = 0; i < lineToRemove.idx[0] - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}

			Sinon.stub(streams, "write").resolves(new Error());

			const err = await files.removeLines(tmpFile, ...lineToRemove.idx);
			expect(err).not.to.be.undefined;
			expect(err).to.be.instanceOf(Error);
		});

		it("should return error cuz of read file error", async () => {
			const tmpFile = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const lineToRemove = { idx: [10, 11], content: "remove\n" }

			for (let i = 0; i < lineToRemove.idx[0] - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			for (let i = 0; i < lineToRemove.idx[0] - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}

			Sinon.stub(fs, "readFileSync").throws(new Error());

			const err = await files.removeLines(tmpFile, ...lineToRemove.idx);
			expect(err).not.to.be.undefined;
			expect(err).to.be.instanceOf(Error);
		});
		it("should return error cuz of move error", async () => {
			const tmpFile = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const lineToRemove = { idx: [10, 11], content: "remove\n" }

			for (let i = 0; i < lineToRemove.idx[0] - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			files.writeAtTheEnd(tmpFile, lineToRemove.content);
			for (let i = 0; i < lineToRemove.idx[0] - 1; i++) {
				await files.writeAtTheEnd(tmpFile, content);
			}

			Sinon.stub(fs, "renameSync").throws(new Error());

			const err = await files.removeLines(tmpFile, ...lineToRemove.idx);
			expect(err).not.to.be.undefined;
			expect(err).to.be.instanceOf(Error);
		});
	});
});
