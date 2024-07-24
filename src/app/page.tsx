'use client';

import { useEffect, useState } from 'react';
import { collection, db, DocumentData, getDocs, QueryDocumentSnapshot } from '../utils/firebase';
import { HomePageData, TechStacks } from '@/utils/types';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { jsLogo } from '@/utils/constants';

const HomePage: React.FC = () => {
  const [homepageData, setHomepageData] = useState<HomePageData | null>(null);
  const [techStacks, setTechStacks] = useState<TechStacks[]>([]);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'homepage'));
        const data: HomePageData[] = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as HomePageData
        );

        if (data.length > 0) {
          setHomepageData(data[0]);
          setTechStacks(data[0].techStacks);
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % techStacks.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [techStacks.length]);

  if (!homepageData) {
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
  }

  return (
    <div className='homepage'>
      <header className='header'>
        <h1>{homepageData.title}</h1>
        <p>{homepageData.welcomeMessage}</p>
      </header>
      <div className='hero'>
        {homepageData.heroImage && (
          <Image
            src={homepageData.heroImage}
            alt='Hero'
            width={400}
            height={300}
            quality={100}
            priority={true}
            className='hero_image'
          />
        )}
      </div>
      <section className='introduction'>
        <p>{homepageData.introduction}</p>
      </section>
      <div className='tech_stack'>
        {techStacks.length > 0 && (
          <Image
            src={techStacks[currentLogoIndex]?.logoUrl}
            alt={techStacks[currentLogoIndex]?.name}
            width={100}
            height={100}
            className='tech_logo'
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
