import { observable, action, runInAction } from "mobx";
import { getJson } from "utils/fetch";
import links from "../routes/links";

class AppStore {
	@observable error = "";
	@observable samples = [];
	@observable loading = false;

	@action async fetchSamples() {
		try {
			this.loading = true;
			const samples = await getJson(links.api.sample);
			this.setSample(samples);
		} catch (err) {
			runInAction(() => {
				this.error = err;
			});
		}
	}

	@action setSample(samples) {
		this.samples = samples;
		this.loading = false;
		this.error = "";
	}
}

export default new AppStore();
