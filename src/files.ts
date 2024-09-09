import fs from "fs";
import streams from "./streams";

/**
 * `writeAtTheEnd` writes content to the end of a file
 * that will be opened with the given encoding (defaults to `utf8`).
 * If the write is successful, undefined is returned.
 * Otherwise an error will be returned.
 */
export async function writeAtTheEnd(path: string, content: string, encoding?: BufferEncoding): Promise<Error | undefined> {
	const ws = fs.createWriteStream(path, { encoding: encoding ?? "utf8", flags: "a+" });

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

export default {
	writeAtTheEnd,
}
