'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';

import {
  collection,
  db,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from '../utils/firebase';

import { HomePageData, TechStacks, AboutPageData } from '@/utils/types';
import { jsLogo } from '@/utils/constants';

const HomePage: React.FC = () => {
  const [homepageData, setHomepageData] = useState<HomePageData | null>(null);
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [techStacks, setTechStacks] = useState<TechStacks[]>([]);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  // fetch homepage and about data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageSnapshot = await getDocs(collection(db, 'homepage'));
        const aboutSnapshot = await getDocs(collection(db, 'about'));

        const homepage = homepageSnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) =>
            doc.data() as HomePageData
        );

        const about = aboutSnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) =>
            doc.data() as AboutPageData
        );

        if (homepage.length > 0) {
          setHomepageData(homepage[0]);
          setTechStacks(homepage[0].techStacks || []);
        };

        if (about.length > 0) {
          setAboutData(about[0]);
        };
      } catch (error) {
        console.error('Error fetching homepage/about data:', error);
      };
    };

    fetchData();
  }, []);

  // rotate tech stack logos every 2.5 seconds
  useEffect(() => {
    if (!techStacks.length) return;

    const interval = setInterval(() => {
      setCurrentLogoIndex(
        (prevIndex) => (prevIndex + 1) % techStacks.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [techStacks]);

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
  }

  return (
    <main className='homepage'>
      {/* ambient side glow */}
      <div className='ambient ambient_left' />
      <div className='ambient ambient_right' />

      {/* welcome card */}
      <section className='card hero_card fade_up'>
        <h1>{homepageData.title}</h1>
        <p className='tagline'>{homepageData.welcomeMessage}</p>
      </section>

      {/* hero image */}
      {homepageData.heroImage && (
        <section className='hero_image_container fade_up delay_1'>
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
        <section className='card about_card fade_up delay_2'>

          <div className='bio_row'>
            {aboutData.bioImage && (
              <Image
                src={aboutData.bioImage}
                alt='Profile photo'
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
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

        </section>
      )}

      {/* tech stack */}
      {techStacks.length > 0 && (
        <section className='tech_stack fade_up delay_3'>
          <Image
            src={techStacks[currentLogoIndex]?.logoUrl}
            alt={techStacks[currentLogoIndex]?.name}
            width={90}
            height={90}
          />
        </section>
      )}

    </main>
  );
};

export default HomePage;
