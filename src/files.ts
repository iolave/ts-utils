import fs from "fs";
import path from "path";
import os from "os";
import streams from "./streams";
import { safe } from "./functions";

/**
 * `writeAtTheEnd` writes content to the end of a file
 * that will be opened with the given encoding (defaults to `utf8`).
 * If the path's directory does not exists, it will be created.
 *
 * - If the write is successful, undefined is returned.
 * - Otherwise an error will be returned.
 */
export async function writeAtTheEnd(filePath: string, content: string, encoding?: BufferEncoding): Promise<Error | undefined> {
	if (!fs.existsSync(path.dirname(filePath))) {
		const [_, err] = safe(() => fs.mkdirSync(path.dirname(filePath), { recursive: true }));
		if (err) return err;
	}

	const ws = fs.createWriteStream(filePath, { encoding: encoding ?? "utf8", flags: "a+" });


	return new Promise<Error | undefined>(resolve => {
		ws.on("error", (err) => {
			ws.close();
			resolve(err);
		});

		ws.once("open", async () => {
			const writeErr = await streams.write(ws, content);
			if (writeErr) ws.emit("error", writeErr);
			ws.close();
			resolve(undefined);
		});
	});
}

/**
 * `removeLine` removes a line from a file.
 *
 * - Returns undefined if the line number does not exist.
 * - Returns undefined if the line number wase removed.
 * - When an Error is encountered, it is returned.
 *
 * Warn: This methods uses `fs.readFileSync` method underneath to read the file at the moment,
 * so removing lines from a big file could cause some trouble.
 */
export async function removeLine(filePath: string, line: number): Promise<Error | undefined> {
	const tmpPath = path.join(os.tmpdir(), crypto.randomUUID());
	const [buf, bufErr] = safe(() => fs.readFileSync(filePath));
	if (bufErr) return bufErr;
	const splittedText = buf.toString().split("\n");

	for (let i = 0; i < splittedText.length; i++) {
		if (i + 1 === line) continue;

		const writeErr = await writeAtTheEnd(tmpPath, splittedText[i]);
		if (writeErr) return writeErr;
	}

	const [_, mvErr] = safe(() => fs.renameSync(tmpPath, filePath))
	if (mvErr) return mvErr;
	return;
}

/**
 * `removeLines` removes the given line number from a file.
 *
 * - Returns undefined if the line numbers does not exist.
 * - Returns undefined if the line numbers were removed.
 * - When an Error is encountered, it is returned.
 *
 * Warn: This methods uses `fs.readFileSync` method underneath to read the file at the moment,
 * so removing lines from a big file could cause some trouble.
 */
export async function removeLines(filePath: string, ...lines: number[]): Promise<Error | undefined> {
	const tmpPath = path.join(os.tmpdir(), crypto.randomUUID());
	const [buf, bufErr] = safe(() => fs.readFileSync(filePath));
	if (bufErr) return bufErr;
	const splittedText = buf.toString().split("\n");

	for (let i = 0; i < splittedText.length; i++) {
		if (lines.includes(i + 1)) continue;

		const writeErr = await writeAtTheEnd(tmpPath, splittedText[i]);
		if (writeErr) return writeErr;
	}

	const [_, mvErr] = safe(() => fs.renameSync(tmpPath, filePath))
	if (mvErr) return mvErr;
	return;
}

export default {
	writeAtTheEnd,
	removeLine,
	removeLines,
}
