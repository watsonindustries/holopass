<script lang="ts">
	import dayjs from 'dayjs';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	dayjs.extend(advancedFormat);
	dayjs.extend(localizedFormat);
	dayjs.extend(utc);
	dayjs.extend(timezone);

	import { BADGE_PLACEHOLDER_URL } from '../../const';
	import type { Tables } from '$lib/database.types';

	interface Props {
		data: Tables<'badges'>;
	}

	let { data }: Props = $props();

	/** Builds a string representing the duration between two dates, in days/hours/minutes. */
	function buildDurationString(start: dayjs.Dayjs, end: dayjs.Dayjs): string {
		const duration = end.diff(start, 'hours', true);
		const days = Math.abs(Math.floor(duration / 24));
		const hours = Math.abs(Math.floor(duration % 24));
		const minutes = Math.abs(Math.floor((duration % 1) * 60));
		const seconds = Math.abs(Math.floor((((duration % 1) * 60) % 1) * 60));

		let buildStr = '';
		if (days > 0) {
			buildStr += `${days} day${days > 1 ? 's' : ''} `;
		}
		if (hours > 0) {
			buildStr += `${hours} hour${hours > 1 ? 's' : ''} `;
		}
		if (minutes > 0) {
			buildStr += `${minutes} minute${minutes > 1 ? 's' : ''}`;
		}
		if (minutes === 0) {
			buildStr += ` ${seconds} second${seconds > 1 ? 's' : ''}`;
		}
		return buildStr;
	}
</script>

<a href={`/mypass/check-in/${data.id}`} class="flex w-full py-2">
	<div
		class="card w-full flex-row place-items-center bg-slate-200 p-2 text-start transition hover:bg-slate-300"
	>
		<!-- image -->
		<div class="avatar h-20 w-20 md:h-24 md:w-24">
			<div class="w-full rounded-2xl ring-2 ring-neutral ring-offset-base-100 md:ring">
				<img
					src={data.image ?? BADGE_PLACEHOLDER_URL}
					width="1000"
					height="1000"
					loading="lazy"
					class:p-4={data.image === BADGE_PLACEHOLDER_URL}
					alt="badge-pic"
				/>
			</div>
		</div>
		<!-- /image -->
		<div class="px-2"></div>
		<div class="flex-col">
			<p class="text-lg leading-tight md:text-xl md:leading-snug"><b>{data.name}</b></p>
			<p class="hyphens-none text-sm">
				{#if dayjs() < dayjs(data.event_start)}
					Starts in {buildDurationString(dayjs(), dayjs(data.event_start))}
				{:else if dayjs() > dayjs(data.event_end)}
					Ended {buildDurationString(dayjs(), dayjs(data.event_end))} ago
				{:else}
					Ends in {buildDurationString(dayjs(), dayjs(data.event_end))}
				{/if}
			</p>
		</div>
	</div>
</a>
