import fs from "fs";

async function write(ws: fs.WriteStream, content: string): Promise<Error | undefined> {
	return new Promise(resolve => {
		ws.write(content, (err) => {
			console.log({ err })
			if (err) resolve(err);
			resolve(undefined);
		});
	});
}

async function writeAtTheEnd(path: string, content: string, encoding?: BufferEncoding): Promise<Error | undefined> {
	const ws = fs.createWriteStream(path, { encoding, flags: "a+" });

	return new Promise<Error | undefined>(resolve => {
		ws.on("error", (err) => {
			ws.close();
			resolve(err);
		});

		ws.once("open", async () => {
			const writeErr = await write(ws, content);
			if (writeErr) ws.emit("errer", writeErr);
			ws.close();
			resolve(undefined);
		});
	});
}

export default {
	write,
	writeAtTheEnd,
}
