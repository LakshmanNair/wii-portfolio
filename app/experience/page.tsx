'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLayout from '@/components/ui/section-layout';

gsap.registerPlugin(ScrollTrigger);

type CareerEvent = {
    role: string;
    company: string;
    year: string;
    description: string;
    links?: { href: string; label: string }[];
};

// Newest first — the rail fills downward as you scroll back through the years.
const careerEvents: CareerEvent[] = [
    {
        role: 'Developer Role',
        company: 'U of T → Clearway Construction Inc.',
        year: '26/27',
        description:
            'I graduated from University of Toronto and started as a Junior Full Stack Systems Developer at Clearway Construction. Within three months, I completely independently shipped an end-to-end expense management app with custom functionality for ~600 employees using React, TypeScript, Django and PostgreSQL. I also built GIST, a geospatial analytics platform for upper management, and cut 400–500ms of latency off core ERP pages.',
        links: [],
    },
    {
        role: 'Machine Learning, NLP & Shipping Projects',
        company: 'U of T · Rays Sports Network Inc.',
        year: '25/26',
        description:
            'Spent the Summer as a Frontend Developer at Rays Sports Network building cross-platform dashboards and UIs. My last year of university: neural networks, deep learning and natural language processing. In my free time, I architected an agentic AI web automation engine using TypeScript, Playwright and the Gemini API driving real medical forms to 100% submission reliability. I\'d be happy to discuss it further if you\'re interested!',
        links: [],
    },
    {
        role: 'Machine Learning Intro & Web Development',
        company: 'U of T · MyEdMaster LLC',
        year: '24/25',
        description:
            'My first machine learning courses on models, training, and practical applications. I was also introduced to web programming with the web stack: JavaScript, React, HTML and CSS. In the second half of the year, I worked as a Software Engineer at MyEdMaster building Next.js REST backends against a React frontend, and helped develop and deploy a fitness web app for them.',
        links: [],
    },
    {
        role: 'Data Structures, Algorithms & Systems',
        company: 'University of Toronto',
        year: '23/24',
        description:
            'Second year of university, I learned Java in my Software Development course which gave me a foundation in code architecture and design patterns. I also studied data structures and algorithms, which introduced me to CS theory. Additionally, I learned systems programming in C which gave me a deeper understanding of compilers and memory management.',
        links: [],
    },
    {
        role: 'Where It Started',
        company: 'University of Toronto',
        year: '22/23',
        description:
            'First year. Python and introductory computer science, writing my first real programs after tinkering around in high school not really knowing what I was doing. Check out my first-year checkers project in the projects section!',
        links: [],
    },
];

export default function ExperiencePage() {
    const timelineRef = useRef<HTMLDivElement>(null);
    const boxRefs = useRef<HTMLDivElement[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = timelineRef.current;
        const boxes = boxRefs.current.filter(Boolean);
        if (!timeline || boxes.length === 0) return;

        const ctx = gsap.context(() => {
            // The rail fills as the section scrolls past
            gsap.to(timeline, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                },
            });

            // Each entry brightens as it reaches the middle of the viewport
            boxes.forEach((box) => {
                gsap.to(box, {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 65%',
                        end: 'top 40%',
                        scrub: true,
                    },
                });
            });
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => ctx.revert();
    }, []);

    return (
        <SectionLayout title="Experience" subtitle="My career & experience" accentColor="#CE93D8">
            <section className="career-section" ref={sectionRef}>
                <div className="career-container">
                    <h2 className="career-heading">
                        My career <span>&amp;</span><br />experience
                    </h2>

                    <div className="career-info">
                        {/* The vertical progress line */}
                        <div className="career-timeline" ref={timelineRef}>
                            <div className="career-dot" />
                        </div>

                        {/* Timeline Items */}
                        {careerEvents.map((event, i) => (
                            <div
                                key={i}
                                className="career-info-box"
                                ref={(el) => { if (el) boxRefs.current[i] = el; }}
                            >
                                <div className="career-info-in">
                                    <div className="career-role">
                                        <h4>{event.role}</h4>
                                        <h5>{event.company}</h5>
                                    </div>
                                    <h3>{event.year}</h3>
                                </div>
                                <p>{event.description}</p>
                                {event.links && event.links.length > 0 && (
                                    <p className="career-links">
                                        {event.links.map((link) => (
                                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        ))}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </SectionLayout>
    );
}
