'use client';

import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { TechArticlesProps } from '@/utils/types';
import { formatDate } from '@/utils/helpers';
import Image from 'next/image';
import { jsLogo } from '@/utils/constants';

const TechArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<TechArticlesProps[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesQuery = query(collection(db, 'articles'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(articlesQuery);
        const articlesData: TechArticlesProps[] = querySnapshot.docs.map((doc) => doc.data() as TechArticlesProps);
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  if (articles.length === 0) {
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
    <Container
      maxWidth='lg'
      className='tech_articles_page'
    >
      <Typography
        variant='h3'
        component='h1'
        align='center'
        gutterBottom
        className='page_title'
      >
        My Tech Articles
      </Typography>
      <Grid
        container
        spacing={4}
      >
        {articles.map((article) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={article.title}
          >
            <Card className='article_card'>
              <CardMedia
                component='img'
                alt={article.title}
                height='140'
                image={article.image}
                title={article.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  className='article_title'
                >
                  {article.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                >
                  {article.description}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className='article_date'
                >
                  Published on {formatDate(article.date)}
                </Typography>
                <Button
                  size='small'
                  color='primary'
                  href={article.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='read_more_btn'
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TechArticlesPage;
