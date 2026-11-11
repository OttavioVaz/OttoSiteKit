<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let { href, children }: { href: string; children: Snippet } = $props();

	const routeManifest = Object.keys(import.meta.glob('/src/routes/**/+page.svelte')).map((file) => {
		const route = file.replace(/^\/src\/routes/, '').replace(/\/?\+page\.svelte$/, '');

		return route
			.split('/')
			.filter(Boolean)
			.filter((segment) => !/^\([^/]+\)$/.test(segment));
	});

	function matchesRoute(
		routeSegments: string[],
		pathSegments: string[],
		routeIndex = 0,
		pathIndex = 0
	): boolean {
		if (routeIndex === routeSegments.length) {
			return pathIndex === pathSegments.length;
		}

		const segment = routeSegments[routeIndex];
		const isOptional = segment.startsWith('[[') && segment.endsWith(']]');
		const isCatchAll = segment.startsWith('[...') && segment.endsWith(']');
		const isOptionalCatchAll = segment.startsWith('[[...') && segment.endsWith(']]');

		if (isOptionalCatchAll) {
			return (
				matchesRoute(routeSegments, pathSegments, routeIndex + 1, pathIndex) ||
				matchesRoute(routeSegments, pathSegments, routeIndex + 1, pathSegments.length)
			);
		}

		if (isCatchAll) {
			return (
				pathIndex < pathSegments.length &&
				matchesRoute(routeSegments, pathSegments, routeIndex + 1, pathSegments.length)
			);
		}

		if (isOptional) {
			return (
				matchesRoute(routeSegments, pathSegments, routeIndex + 1, pathIndex) ||
				(pathIndex < pathSegments.length &&
					matchesRoute(routeSegments, pathSegments, routeIndex + 1, pathIndex + 1))
			);
		}

		const isDynamic = segment.startsWith('[') && segment.endsWith(']');
		return (
			pathIndex < pathSegments.length &&
			(isDynamic || segment === pathSegments[pathIndex]) &&
			matchesRoute(routeSegments, pathSegments, routeIndex + 1, pathIndex + 1)
		);
	}

	function getResolvedHref(value: string): string | null {
		if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
			return null;
		}

		const suffixStart = value.search(/[?#]/);
		const pathname = suffixStart === -1 ? value : value.slice(0, suffixStart);
		const suffix = suffixStart === -1 ? '' : value.slice(suffixStart);
		const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
		const pathSegments = normalizedPathname === '/' ? [] : normalizedPathname.slice(1).split('/');

		if (pathSegments.some((segment) => !segment || segment === '.' || segment === '..')) {
			return null;
		}

		const matchesPage = routeManifest.some((routeSegments) =>
			matchesRoute(routeSegments, pathSegments)
		);

		if (!matchesPage) {
			return null;
		}

		const trailingSlash = pathname !== '/' && pathname.endsWith('/');
		const routePath =
			normalizedPathname === '/' ? '/' : `${normalizedPathname}${trailingSlash ? '/' : ''}`;

		// Route matching above validates the generated dynamic path manifest; the generic
		// resolve type only accepts compile-time-known paths, but its runtime accepts pathnames.
		const resolvePath = resolve as unknown as (pathname: string) => string;
		return resolvePath(`${routePath.slice(1)}${suffix}`);
	}

	const resolvedHref = $derived(getResolvedHref(href));
</script>

{#if resolvedHref}
	<a href={resolvedHref}>{@render children()}</a>
{:else}
	{@render children()}
{/if}
