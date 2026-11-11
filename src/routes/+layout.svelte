<script lang="ts">
	import '#lib/styles/main.scss';
	import favicon from '#lib/assets/favicon.svg';
	import { overflowIndicators } from '#lib/attachments/overflow-indicators.svelte.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="app" {@attach overflowIndicators}>
	{@render children()}
</div>
