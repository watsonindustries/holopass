<script lang="ts">
	import ProfileItem from '$lib/components/ProfileItem.svelte';
	import type { Tables } from '$lib/database.types';

	interface Props {
		self_id?: string | number | undefined;
		profiles: Tables<'profiles'>[] | any;
	}

	let { self_id = undefined, profiles }: Props = $props();
</script>

<table class="table">
	<tbody>
		{#each profiles as profile}
			<tr>
				<td>
					<ProfileItem {self_id} {...profile} />
				</td>
				<td>
					<!-- <span class="badge badge-ghost badge-sm"></span> -->
				</td>
			</tr>
		{/each}
	</tbody>
</table>
