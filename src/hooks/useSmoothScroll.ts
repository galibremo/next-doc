import { useEffect } from "react";

interface UseSmoothScrollProps {
	selector: string | string[];
	threshold?: number;
	duration?: number;
}

export const useSmoothScroll = ({
	selector,
	threshold = 0.5,
	duration = 500
}: UseSmoothScrollProps) => {
	useEffect(() => {
		const selectors = Array.isArray(selector) ? selector : [selector];
		const sections = document.querySelectorAll(selectors.join(", "));

		const smoothScroll = (element: Element) => {
			const start = window.scrollY;
			const el = element as HTMLElement;
			const elementCenter = el.offsetTop + el.clientHeight / 2;
			const target = elementCenter - window.innerHeight / 2;
			const distance = target - start;
			let startTime: number | null = null;

			const animateScroll = (currentTime: number) => {
				if (startTime === null) startTime = currentTime;
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// Easing function for smoother animation
				const easeInOutCubic =
					progress < 0.5
						? 4 * progress * progress * progress
						: 1 - Math.pow(-2 * progress + 2, 3) / 2;

				window.scrollTo(0, start + distance * easeInOutCubic);

				if (progress < 1) {
					requestAnimationFrame(animateScroll);
				}
			};

			requestAnimationFrame(animateScroll);
		};

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						smoothScroll(entry.target);
					}
				});
			},
			{ threshold }
		);

		sections.forEach(section => observer.observe(section));
		return () => observer.disconnect();
	}, [selector, threshold, duration]);
};
