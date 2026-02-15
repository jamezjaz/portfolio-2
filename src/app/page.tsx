'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';

import {
  collection,
  db,
  getDocs,
} from '../utils/firebase';

import {
  HomePageData,
  TechStacks,
  AboutPageData
} from '@/utils/types';
import { jsLogo } from '@/utils/constants';

const HomePage: React.FC = () => {
  const [homepageData, setHomepageData] = useState<HomePageData | null>(null);
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [techStacks, setTechStacks] = useState<TechStacks[]>([]);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const mainRef = useRef<HTMLElement | null>(null);

  // fetch homepage and about data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homepageSnapshot, aboutSnapshot] = await Promise.all([
          getDocs(collection(db, 'homepage')),
          getDocs(collection(db, 'about'))
        ]);

        const homepage = homepageSnapshot.docs.map(doc => doc.data() as HomePageData);
        const about = aboutSnapshot.docs.map(doc => doc.data() as AboutPageData);

        if (homepage.length > 0) {
          setHomepageData(homepage[0]);
          setTechStacks(homepage[0].techStacks || []);
        };
        if (about.length > 0) setAboutData(about[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      };
    };
    fetchData();
  }, []);

  // intersection observer for scroll animations
  useEffect(() => {
    if (!homepageData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is_visible');
          };
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [homepageData, aboutData]);

  // rotate tech stack logos every 2.5 seconds
  useEffect(() => {
    if (!techStacks.length) return;
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % techStacks.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [techStacks]);

  // mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mainRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mainRef.current.style.setProperty('--mouse-x', x.toString());
      mainRef.current.style.setProperty('--mouse-y', y.toString());
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!homepageData) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        bgcolor='#fafafa'
      >
        <div className='loader'>
          <Image
            src={jsLogo.logoUrl}
            alt={jsLogo.name}
            width={50}
            height={50}
          />
        </div>
      </Box>
    );
  };

  return (
    <main
      className='homepage'
      ref={mainRef}
    >
      {/* welcome card */}
      <section className='card hero_card reveal'>
        <div className='reveal_clip'>
          <h1>{homepageData.title}</h1>
        </div>
        <p className='tagline'>{homepageData.welcomeMessage}</p>
      </section>

      {/* hero image */}
      {homepageData.heroImage && (
        <section
          className='hero_image_container reveal'
          style={{ transitionDelay: '200ms' }}
        >
          <Image
            src={homepageData.heroImage}
            alt='Hero Image'
            width={700}
            height={350}
            className='hero_image'
            priority
          />
        </section>
      )}

      {/* introduction intentionally removed to avoid redundancy */}
      {/*
      <section className='introduction'>
        <p>{homepageData.introduction}</p>
      </section>
      */}

      {/* bio card */}
      {aboutData && (
        <section className='card about_card reveal'>
          <div className='bio_row'>
            {aboutData.bioImage && (
              <Image
                src={aboutData.bioImage}
                alt='Profile'
                width={150}
                height={150}
                className='avatar'
              />
            )}
            <p className='bio'>{aboutData.bio}</p>
          </div>

          {aboutData.details?.length > 0 && (
            <ul className='highlights'>
              {aboutData.details.map((item, index) => (
                <li
                  key={index}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* tech stack */}
      {techStacks.length > 0 && (
        <section className='tech_stack reveal'>
          <Image
            key={currentLogoIndex}
            src={techStacks[currentLogoIndex]?.logoUrl}
            alt={techStacks[currentLogoIndex]?.name}
            width={90}
            height={90}
            className='stack_logo'
          />
        </section>
      )}
    </main>
  );
};

export default HomePage;
