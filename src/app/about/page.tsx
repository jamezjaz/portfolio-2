'use client';

import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  collection,
  db,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot
} from '@/utils/firebase';
import { AboutPageData } from '@/utils/types';
import Box from '@mui/material/Box';
import { jsLogo } from '@/utils/constants';

const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'about'));
        const data: AboutPageData[] = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as AboutPageData
        );

        if (data.length > 0) {
          setAboutData(data[0]);
        }
      } catch (error) {
        console.error('Error fetching about page data:', error);
      }
    };

    fetchData();
  }, []);

  if (!aboutData) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        bgcolor='#f0f2f5'
        position='relative'
      >
        <div className='loader'>
          <Image
            src={jsLogo.logoUrl}
            alt={jsLogo.name}
            width={50}
            height={50}
            className='tech_icon'
          />
        </div>
      </Box>
    );
  };

  return (
    <div className='about_page'>
      <header className='header'>
        <h1>About Me</h1>
      </header>
      <section className='bio_section'>
        <div className='profile_image'>
          {aboutData.bioImage && (
            <Image
              src={aboutData.bioImage}
              alt='Profile'
              width={200}
              height={200}
              quality={100}
              priority={true}
              className='profile_image'
            />
          )}
        </div>
        <div className='bio'>
          <p>{aboutData.bio}</p>
        </div>
      </section>
      <section className='summary'>
        <h2>Summary</h2>
        <ul>
          {aboutData.details.map((summary, index) => (
            <li key={index}>{summary}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
