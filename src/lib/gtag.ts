import { getGtag } from "./getGtag";

export const pageview = (url: string): void => {
	getGtag()("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
		page_path: url,
	});
};

interface GTagEvent {
	action: string;
	category: string;
	label: string;
	value: string;
}

export const event = (event: GTagEvent): void => {
	// console.log("GA event");
	// console.log(event);
	getGtag()("event", event.action, {
		event_category: event.category,
		event_label: event.label,
		value: event.value,
	});
};
