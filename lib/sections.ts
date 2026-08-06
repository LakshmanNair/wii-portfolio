import type { PreviewVariant } from '@/components/wii/channel-preview';

export interface Section {
    id: string;
    label: string;
    route: string;
    subtitle: string;
    accentColor: string;
    variant: PreviewVariant;
}

/**
 * Menu order, also used for prev/next traversal on the section pages.
 * Contact sits last — the natural endpoint once someone has read everything.
 */
export const sections: Section[] = [
    { id: 'about', label: 'About', route: '/about', subtitle: 'Who I am', accentColor: '#4FC3F7', variant: 'hero' },
    { id: 'experience', label: 'Experience', route: '/experience', subtitle: 'My career', accentColor: '#CE93D8', variant: 'timeline' },
    { id: 'education', label: 'Education', route: '/education', subtitle: 'Academic journey', accentColor: '#81C784', variant: 'list' },
    { id: 'skills', label: 'Skills', route: '/skills', subtitle: 'Technical toolkit', accentColor: '#FFB74D', variant: 'badges' },
    { id: 'projects', label: 'Projects', route: '/projects', subtitle: 'Things I\'ve built', accentColor: '#EF5350', variant: 'cards' },
    { id: 'contact', label: 'Contact', route: '/contact', subtitle: 'Get in touch', accentColor: '#4DD0E1', variant: 'contact' },
];

export function getSectionNeighbours(route: string) {
    const i = sections.findIndex((s) => s.route === route);
    if (i === -1) return { prev: null, next: null };
    // Wraps around so the arrows never dead-end.
    return {
        prev: sections[(i - 1 + sections.length) % sections.length],
        next: sections[(i + 1) % sections.length],
    };
}
