import { writable } from 'svelte/store';
import { INAPP_NOTIFICATION_TTL } from '../../const';
import type { InAppNotification } from '../../custom';

export const store = writable<InAppNotification[]>([]);

export default store;

export function addInappNotification(notification: InAppNotification) {
	store.update((notifications) => [...notifications, notification]);
	setTimeout(() => {
		removeInappNotification(notification);
	}, INAPP_NOTIFICATION_TTL);
}

export function removeInappNotification(notification: InAppNotification) {
	store.update((notifications) => notifications.filter((n) => n !== notification));
}
