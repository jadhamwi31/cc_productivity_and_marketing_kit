import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import fs from "fs";

type Chunk = { timestamp: [number, number]; text: string };

type Transcript = {
	text: string;
	chunks: Chunk[];
};

export class Transcriber {
	private filepath: string;
	constructor(filepath: string) {
		this.filepath = filepath;
	}

	public async transcribe() {
		const data = fs.readFileSync(this.filepath + ".aac");
		const formData = new FormData();

		formData.append("file", data, "file");

		let { data: transcript } = await axios.post<
			void,
			AxiosResponse<Transcript>
		>("http://0.0.0.0:8081/transcript", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return transcript;
	}
}
