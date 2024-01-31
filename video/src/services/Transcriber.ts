import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import fs from "fs";

type Chunk = { timestamp: [number, number]; text: string };

type Transcript = {
	text: string;
	chunks: Chunk[];
};

export enum EnLanguage {
	ENGLISH = "english",
	ARABIC = "arabic",
}

export class Transcriber {
	private filepath: string;
	private language: EnLanguage;
	constructor(filepath: string, lang: EnLanguage) {
		this.filepath = filepath;
		this.language = lang;
	}

	public async transcribe() {
		const data = fs.readFileSync(this.filepath + ".aac");
		const formData = new FormData();

		formData.append("file", data, "file");

		let { data: transcript } = await axios.post<
			void,
			AxiosResponse<Transcript>
		>(`${process.env.AI_URL!}/transcript/${this.language}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return transcript;
	}
}
