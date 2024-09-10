import fs from "fs";

function streamsVoidListener(): void { }

/**
 * `write` is the asynchronous version of the `fs.WriteStream.prototype.write` method.
 *
 * Writes content to a writeable stream: 
 * - If the write is successful, undefined is returned.
 * - Otherwise, any error will be catched and returned.
 */
export async function write(ws: fs.WriteStream, content: string): Promise<Error | undefined> {
	const listenerIdx = ws.listeners("error").findIndex(l => l.name === streamsVoidListener.name);
	if (listenerIdx === -1) ws.on("error", streamsVoidListener);

	return new Promise((resolve) => {
		ws.write(content, (err) => resolve(err ?? undefined));
	});
}

export default {
	write,
}
