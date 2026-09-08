'use client';

import SectionLayout from '@/components/ui/section-layout';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

// A school can hold more than one program, so consecutive stints at the same
// institution share a single card instead of repeating the name.
const education = [
    {
        institution: 'University of Toronto',
        location: 'Toronto, Ontario',
        programs: [
            {
                degree: 'Bachelor of Science — Computer Science Specialist',
                dates: 'September 2022 — June 2026',
                highlights: [
                    'Software Design and Systems Programming',
                    'Introduction to Databases and Programming on the Web',
                    'Neural Networks and Deep Learning',
                    'Natural Language Processing',
                    'Data Structures, Algorithms and Theory of Computation',
                ],
            },
        ],
    },
    {
        institution: 'White Oaks Secondary School',
        location: 'Oakville, Ontario',
        programs: [
            {
                degree: 'International Baccalaureate',
                dates: 'September 2020 — May 2022',
                highlights: [
                    'Extracurriculars: Oakhacks member, DECA executive, CSMC participant, Euclid math contest participant, Debate team, Chess club, Soccer team, Global Awareness for Primary Education club',
                ],
            },
            {
                degree: 'Accelerated Learning Program',
                dates: 'September 2018 — June 2020',
                highlights: [
                    'Extracurriculars: Oakhacks member, DECA, Debate team, Chess club, Soccer team, Global Awareness for Primary Education club',
                ],
            },
        ],
    },
];

export default function EducationPage() {
    return (
        <SectionLayout title="Education" subtitle="Academic journey" accentColor="#81C784">
            <div className="mono-label" style={{ marginBottom: '2rem' }}>
                <GraduationCap size={14} />
                Academic Timeline
            </div>

            <div className="timeline">
                {education.map((school) => (
                    <div key={school.institution} className="timeline-item">
                        <div className="glass-card">
                            <div className="edu-card-head">
                                <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-mono)' }}>
                                    {school.institution}
                                </h3>
                                <span className="flex items-center gap-1.5 text-white/30 text-xs font-mono shrink-0">
                                    <MapPin size={12} />
                                    {school.location}
                                </span>
                            </div>

                            {school.programs.map((program) => (
                                <div key={program.degree} className="edu-program">
                                    <div className="edu-program-head">
                                        <p className="text-white/60 text-sm">{program.degree}</p>
                                        <span className="flex items-center gap-1.5 text-white/40 text-xs font-mono shrink-0">
                                            <Calendar size={12} />
                                            {program.dates}
                                        </span>
                                    </div>

                                    <ul className="space-y-2">
                                        {program.highlights.map((h) => (
                                            <li key={h} className="text-white/50 text-sm flex items-start gap-2">
                                                <span className="text-green-400/60 mt-1.5 shrink-0">▸</span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SectionLayout>
    );
}
