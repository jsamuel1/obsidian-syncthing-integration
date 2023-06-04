import { Notice, Plugin } from "obsidian";
import { SyncThingConfiguration } from "./models/syncthing_entities";
import { DiffModal } from "./views/syncthing_diff";
import { SampleSettingTab } from "./views/syncthing_settings_page";

//! Remember to rename these classes and interfaces!

interface MyPluginSettings {
	api_key: string | null;
	configuration: SyncThingConfiguration | null;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	api_key: null,
	configuration: null,
};

export default class MyPlugin extends Plugin {
	settings!: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("SyncThing status");
		statusBarItemEl.onClickEvent(() => {
			new Notice("SyncThing integration is not yet implemented.");
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.addRibbonIcon("construction", "Open Syncthing diff modal", () => {
			new DiffModal(this.app).open();
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
