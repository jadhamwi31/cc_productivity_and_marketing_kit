import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export class Transcriber {
	private filepath: string;
	constructor(filepath: string) {
		this.filepath = filepath;
	}

	private convertToAudio() {
		execSync(
			`sh ${path.join(__dirname, "../scripts/convert_to_audio.sh")} ${
				this.filepath
			}`
		);
	}

	public async transcribe() {
		this.convertToAudio();
		const data = fs.readFileSync(this.filepath + ".aac");

		const token = process.env.HUGGING_FACE_TOKEN;
		const response = await fetch(
			"https://api-inference.huggingface.co/models/Foxasdf/whisper-base-en",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "POST",
				body: data,
			}
		);
		const result = await response.json();
		return result;
	}
}
