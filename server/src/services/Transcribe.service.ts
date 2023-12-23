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

		return [];
	}
}
