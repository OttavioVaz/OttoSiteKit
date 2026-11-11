import type { Attachment } from 'svelte/attachments';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';

const targetSelector = '.pane, table';
const directions = ['top', 'bottom', 'left', 'right'] as const;
const scrollThreshold = 1;

type Direction = (typeof directions)[number];

type Indicator = {
	element: HTMLDivElement;
	bars: Record<Direction, HTMLDivElement>;
};

export const overflowIndicators: Attachment<HTMLElement> = (root) => {
	const document = root.ownerDocument;
	const window = document.defaultView;

	if (!window || !document.body) return;

	const indicators = new SvelteMap<HTMLElement, Indicator>();
	const observedElements = new SvelteSet<Element>();
	let frame = 0;

	const scheduleUpdate = () => {
		if (!frame) frame = window.requestAnimationFrame(update);
	};

	const createIndicator = (): Indicator => {
		const element = document.createElement('div');
		element.classList.add('overflow-indicator');
		element.setAttribute('aria-hidden', 'true');

		const bars = {} as Record<Direction, HTMLDivElement>;
		for (const direction of directions) {
			const bar = document.createElement('div');
			bar.classList.add('overflow-indicator__bar');
			bar.dataset.direction = direction;
			element.append(bar);
			bars[direction] = bar;
		}

		document.body.append(element);
		return { element, bars };
	};

	const addTarget = (target: HTMLElement) => {
		if (!indicators.has(target)) indicators.set(target, createIndicator());
	};

	const removeTarget = (target: HTMLElement) => {
		indicators.get(target)?.element.remove();
		indicators.delete(target);
	};

	const observeElements = () => {
		if (!resizeObserver) return;

		const currentElements = new SvelteSet<Element>([root, ...root.querySelectorAll('*')]);
		for (const element of observedElements) {
			if (!currentElements.has(element)) {
				resizeObserver.unobserve(element);
				observedElements.delete(element);
			}
		}

		for (const element of currentElements) {
			if (!observedElements.has(element)) {
				resizeObserver.observe(element);
				observedElements.add(element);
			}
		}
	};

	const discoverTargets = () => {
		for (const target of indicators.keys()) {
			if (!root.contains(target) || !target.matches(targetSelector)) removeTarget(target);
		}

		for (const target of root.querySelectorAll<HTMLElement>(targetSelector)) addTarget(target);
		observeElements();
		scheduleUpdate();
	};

	const update = () => {
		frame = 0;

		for (const [target, indicator] of indicators) {
			const rect = target.getBoundingClientRect();
			const { element, bars } = indicator;

			element.style.left = `${rect.left}px`;
			element.style.top = `${rect.top}px`;
			element.style.width = `${rect.width}px`;
			element.style.height = `${rect.height}px`;

			const maxY = Math.max(0, target.scrollHeight - target.clientHeight);
			const maxX = Math.max(0, target.scrollWidth - target.clientWidth);
			const canScrollUp = maxY > scrollThreshold && target.scrollTop > scrollThreshold;
			const canScrollDown = maxY > scrollThreshold && maxY - target.scrollTop > scrollThreshold;

			let canScrollLeft = false;
			let canScrollRight = false;
			if (maxX > scrollThreshold) {
				const scrollLeft = target.scrollLeft;
				if (window.getComputedStyle(target).direction === 'rtl') {
					if (scrollLeft < 0) {
						canScrollLeft = scrollLeft > -maxX + scrollThreshold;
						canScrollRight = scrollLeft < -scrollThreshold;
					} else {
						canScrollLeft = scrollLeft > scrollThreshold;
						canScrollRight = scrollLeft < maxX - scrollThreshold;
					}
				} else {
					canScrollLeft = scrollLeft > scrollThreshold;
					canScrollRight = maxX - scrollLeft > scrollThreshold;
				}
			}

			const visibleDirections: Record<Direction, boolean> = {
				top: canScrollUp,
				bottom: canScrollDown,
				left: canScrollLeft,
				right: canScrollRight
			};

			for (const direction of directions) {
				bars[direction].hidden = !visibleDirections[direction];
			}

			element.hidden =
				rect.width <= 0 ||
				rect.height <= 0 ||
				!directions.some((direction) => visibleDirections[direction]);
		}
	};

	const resizeObserver =
		typeof window.ResizeObserver === 'function'
			? new window.ResizeObserver(scheduleUpdate)
			: undefined;
	const mutationObserver = new window.MutationObserver(discoverTargets);

	root.addEventListener('scroll', scheduleUpdate, true);
	window.addEventListener('scroll', scheduleUpdate, { passive: true });
	window.addEventListener('resize', scheduleUpdate, { passive: true });
	mutationObserver.observe(root, {
		attributes: true,
		characterData: true,
		childList: true,
		subtree: true
	});

	discoverTargets();

	return () => {
		root.removeEventListener('scroll', scheduleUpdate, true);
		window.removeEventListener('scroll', scheduleUpdate);
		window.removeEventListener('resize', scheduleUpdate);
		mutationObserver.disconnect();
		resizeObserver?.disconnect();
		if (frame) window.cancelAnimationFrame(frame);
		for (const indicator of indicators.values()) indicator.element.remove();
		indicators.clear();
		observedElements.clear();
	};
};
