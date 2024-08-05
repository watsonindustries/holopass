<script lang="ts">
	import ProfileItem from "$lib/components/ProfileItem.svelte";
	import type { Tables } from "$lib/database.types";

	export let profiles: [{profiles: Tables<'profiles'>}] | any;
</script>

<table class="table">
	<tbody>
		{#each profiles as profile}
			<tr>
				<td>
					<ProfileItem profile={profile.profiles} />
				</td>
				<td>
					<!-- <span class="badge badge-ghost badge-sm"></span> -->
				</td>
			</tr>
		{/each}
	</tbody>
</table>