import Sinon from "sinon";
import crypto from "crypto";
import os from "os";
import path from "path";
import fs from "fs";
import streams from "../src/streams";
import { expect } from "chai";

afterEach(() => {
	Sinon.restore();
})

describe("./src/streams", () => {
	describe(streams.write.name, () => {
		it("should return an error", async () => {
			const p = path.join(os.tmpdir(), crypto.randomUUID());
			const content = "content\n";
			const ws = fs.createWriteStream(p);
			ws.close();
			const err = await streams.write(ws, content);
			expect(err).to.exist;
			expect(err).to.be.instanceOf(Error)
		});

	});
});
