<script lang="ts">
	import ProfileItem from '$lib/components/ProfileItem.svelte';
	import type { Tables } from '$lib/database.types';

	export let self_id: string | number | undefined = undefined;
	export let profiles: Tables<'profiles'>[] | any;
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
