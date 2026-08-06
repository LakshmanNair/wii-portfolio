'use client';

import SectionLayout from '@/components/ui/section-layout';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const education = [
    {
        institution: 'University of Toronto',
        degree: 'Bachelor of Science — Computer Science Specialist',
        dates: 'September 2022 — June 2026',
        location: 'Toronto, Ontario',
        highlights: [
            'Software Design and Systems Programming',
            'Introduction to Databases and Programming on the Web',
            'Neural Networks and Deep Learning',
            'Natural Language Processing',
            'Data Structures, Algorithms and Theory of Computation',
        ],
    },
    {
        institution: 'White Oaks Secondary School',
        degree: 'International Baccalaureate',
        dates: 'September 2020 — May 2022',
        location: 'Oakville, Ontario',
        highlights: [
            'Activities: Oakhacks member, DECA executive, CSMC participant, Euclid math contest participant, Debate team, Chess club, Soccer team, Global Awareness for Primary Education club',
        ],
    },
    {
        institution: 'White Oaks Secondary School',
        degree: 'Accelerated Learning Program',
        dates: 'September 2018 — June 2020',
        location: 'Oakville, Ontario',
        highlights: [
            'Activities: Oakhacks member, DECA, Debate team, Chess club, Soccer team, Global Awareness for Primary Education club',
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
                {education.map((edu, i) => (
                    <div key={`${edu.institution}-${edu.degree}`} className="timeline-item">
                        <div className="glass-card">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                                <div>
                                    <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-mono)' }}>
                                        {edu.institution}
                                    </h3>
                                    <p className="text-white/50 text-sm mt-1">{edu.degree}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className="flex items-center gap-1.5 text-white/40 text-xs font-mono">
                                        <Calendar size={12} />
                                        {edu.dates}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-white/30 text-xs font-mono">
                                        <MapPin size={12} />
                                        {edu.location}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-2">
                                {edu.highlights.map((h) => (
                                    <li key={h} className="text-white/50 text-sm flex items-start gap-2">
                                        <span className="text-green-400/60 mt-1.5 shrink-0">▸</span>
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </SectionLayout>
    );
}
