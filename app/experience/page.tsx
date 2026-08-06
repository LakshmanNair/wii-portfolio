'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLayout from '@/components/ui/section-layout';

gsap.registerPlugin(ScrollTrigger);

// Newest first — the rail fills downward as you scroll back through the years.
const careerEvents = [
    {
        role: 'Graduation & First Developer Role',
        company: 'U of T → Clearway Construction Inc.',
        year: '26/27',
        description:
            'Finished the Computer Science Specialist at the University of Toronto and started as a Junior Full Stack Systems Developer at Clearway Construction. Shipped an end-to-end expense management app for 585+ employees in React, TypeScript, Django and PostgreSQL, built GIST — a geospatial analytics platform for upper management — and cut 400–500ms of latency off core ERP pages. Also stood up a 500+ test PyTest suite in CI and led the team\'s move to agentic development workflows.',
        links: [],
    },
    {
        role: 'Machine Learning, NLP & Shipping Projects',
        company: 'U of T · Rays Sports Network Inc.',
        year: '25/26',
        description:
            'Deep end of the degree: neural networks, deep learning and natural language processing. Spent the summer as a Frontend Developer at Rays Sports Network building cross-platform dashboards and video players in React and Tailwind, plus 10+ reusable hooks and Selenium tests covering 80% of core flows. On the side I architected an agentic AI web automation engine — TypeScript, Playwright and the Gemini API driving real medical forms to 100% submission reliability.',
        links: [],
    },
    {
        role: 'Machine Learning Intro & Web Development',
        company: 'U of T · MyEdMaster LLC',
        year: '24/25',
        description:
            'First proper machine learning courses alongside the web stack — JavaScript, React, HTML and CSS. Worked as a Software Engineer at MyEdMaster building Next.js REST backends against a React frontend, and helped develop and deploy a fitness web app.',
        links: [{ label: 'teamrocketaifitnessappd4.vercel.app', href: 'https://teamrocketaifitnessappd4.vercel.app/' }],
    },
    {
        role: 'Data Structures, Algorithms & Systems',
        company: 'University of Toronto',
        year: '23/24',
        description:
            'The year everything got rigorous. Data structures and algorithms, theory of computation, software design in Java, and systems programming in C — learning what the machine is actually doing underneath the abstractions.',
        links: [],
    },
    {
        role: 'Where It Started',
        company: 'University of Toronto',
        year: '22/23',
        description:
            'First year. Python and introductory computer science, writing my first real programs and figuring out that I liked this a great deal more than anything else I had tried.',
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
                                {event.links.length > 0 && (
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
