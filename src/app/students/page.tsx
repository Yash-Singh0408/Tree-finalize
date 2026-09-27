'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getStudentName, getStudentRollNumber, studentImages } from '@/data/students';
import Image from 'next/image';

const HERO_DURATION = 5000;
const FRAME_DURATION = 10;
const GRID_BUILD_DURATION = 3800;
type StudentStage = 'hero' | 'film' | 'grid-building' | 'grid' | 'induction';

export default function StudentsPage() {
  const [frame, setFrame] = useState(0);
  const [stage, setStage] = useState<StudentStage>('hero');

  useEffect(() => {
    if (stage === 'hero') {
      const timer = window.setTimeout(() => setStage('film'), HERO_DURATION);
      return () => window.clearTimeout(timer);
    }

    if (stage === 'grid-building') {
      const timer = window.setTimeout(() => setStage('grid'), GRID_BUILD_DURATION);
      return () => window.clearTimeout(timer);
    }

    if (stage !== 'film') return;

    const timer = window.setInterval(() => {
      setFrame((current) => {
        if (current >= studentImages.length - 1) {
          window.clearInterval(timer);
          setStage('grid-building');
          return current;
        }
        return current + 1;
      });
    }, FRAME_DURATION);

    return () => window.clearInterval(timer);
  }, [stage]);

  if (stage === 'hero') {
    return (
      <main className="students-hero relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050706] px-6 text-center text-[#f4efe4]">
        <div className="students-grain pointer-events-none absolute inset-0" />
        <div className="students-hero-copy relative z-10 max-w-5xl">
          <p className="font text-[10px] uppercase tracking-[0.55em] text-[#d4af37]">SIESCOMS · MCA 2026—28</p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.95] text-[#fff6dc] md:text-9xl">
            Let us introduce you to the upcoming cohort
          </h1>
        </div>
      </main>
    );
  }

  if (stage === 'induction') {
    return (
      <main className="induction-screen relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030403] px-6 text-center text-[#fff6dc]">
        <div className="golden-shower pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 42 }, (_, index) => (
            <span
              key={index}
              className="golden-particle"
              style={{
                left: `${(index * 37) % 101}%`,
                animationDelay: `${(index % 9) * 0.24}s`,
                animationDuration: `${2.2 + (index % 5) * 0.35}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-5xl induction-copy">
          <p className="induction-kicker font-mono text-[10px] uppercase tracking-[0.55em] text-[#d4af37]">SIESCOMS · MCA 2026—28</p>
          <h1 aria-label="Welcome to SIES family. You have been officially inducted into the 2026 and 28 batch of MCA department." className="mt-6 font-serif text-5xl leading-tight text-[#fff6dc] md:text-8xl">
            <span className="induction-welcome block">Welcome to SIES family</span>
            <span className="induction-detail mt-5 block text-[#f8e7b4]">You have been officially inducted into the 2026 and 28 batch of MCA department.</span>
          </h1>
        </div>
      </main>
    );
  }

  if (stage === 'grid-building' || stage === 'grid') {
    return (
      <main className={`students-grid-page min-h-screen bg-[#050706] px-5 py-12 text-[#f4efe4] md:px-10 ${stage === 'grid-building' ? 'students-grid-build' : ''}`}>
        <header className="mx-auto max-w-7xl text-center">
          <p className="font text-[10px] uppercase tracking-[0.5em] text-[#d4af37]">SIESCOMS · MCA 2026—28</p>
          <h1 className="mt-3 font-serif text-5xl italic text-[#f8f0dc] md:text-7xl">
            {stage === 'grid-building' ? 'Building the cohort' : 'The complete cohort'}
          </h1>
          {stage === 'grid-building' && <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">Every beginning has a face</p>}
        </header>
        <section className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7" aria-label="All students">
          {studentImages.map((image, index) => (
            <figure key={image} style={{ animationDelay: `${Math.min(index * 18, 1600)}ms` }} className="student-grid-item group relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#111712]">
              <Image
                src={image}
                alt={`MCA 2026-28 student ${index + 1}`}
                className="h-full w-full object-cover  transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                width={500} // Set the width of the image
                height={500} // Set the height of the image
                loading="lazy" // Enable lazy loading
                quality={100} // Set the image quality
                sizes="(max-width: 768px) 100vw" // Set the image sizes for different screen sizes
                blurDataURL="data:image/jpeg;base64,..." // Set the blur data URL for lazy loading
                placeholder="blur" // Enable the blur placeholder
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-2 pt-7 font-mono text-[8px] uppercase tracking-[0.12em] text-white/80">
                <span className="block">{getStudentName(image)}</span>
                <span className="mt-1 block text-white/50">{getStudentRollNumber(image)}</span>
              </figcaption>
            </figure>
          ))}
        </section>
        {stage === 'grid' && (
          <div className="flex justify-center py-16">
            <button type="button" onClick={() => setStage('induction')} className="border border-[#d4af37]/70 bg-[#d4af37]/10 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#f8e7b4] shadow-[0_0_34px_rgba(212,175,55,0.16)] transition-all hover:bg-[#d4af37]/20 hover:shadow-[0_0_48px_rgba(212,175,55,0.3)]">
              Welcome 
            </button>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="students-cinema relative min-h-screen overflow-hidden bg-[#050706] text-[#f4efe4]">
      <div className="students-grain pointer-events-none absolute inset-0 z-10" />
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <header className="mb-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#d4af37]">
            SIESCOMS · MCA 2026-28 Batch
          </p>
          <h1 className="mt-3 font-serif text-4xl italic text-[#f8f0dc] md:text-6xl">
            The faces of the upcoming cohort
          </h1>
        </header>

        <section className="relative flex h-[54vh] w-full max-w-5xl items-center justify-center" aria-label="Student cohort film">
          <div key={studentImages[frame]} className="students-frame relative h-full w-full max-w-3xl overflow-hidden rounded-sm border border-[#d4af37]/35 bg-[#111712] p-2 shadow-[0_0_80px_rgba(212,175,55,0.16)]">
            <img
              src={studentImages[frame]}
              alt={getStudentName(studentImages[frame])}
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-12 font-mono text-[9px] uppercase tracking-[0.32em] text-white/65">
              <span>{getStudentName(studentImages[frame])}</span>
              <span>ROLL {getStudentRollNumber(studentImages[frame])}</span>
            </div>
          </div>
        </section>

        <div className="mt-8 h-1 w-56 overflow-hidden bg-white/10">
          <div className="h-full bg-[#d4af37] transition-[width] duration-300" style={{ width: `${((frame + 1) / studentImages.length) * 100}%` }} />
        </div>

        <Link
          href="/"
          className="mt-10 border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/65 transition-colors hover:border-[#d4af37] hover:text-[#f8e7b4]"
        >
          Return to Arborea
        </Link>
      </div>
    </main>
  );
}
