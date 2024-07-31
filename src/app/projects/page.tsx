'use client';

import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { Project } from '@/utils/types';
import Image from 'next/image';
import { jsLogo } from '@/utils/constants';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Query to fetch documents from the 'projects' collection, ordered by 'position' field
        const projectsQuery = query(collection(db, 'projects'), orderBy('position', 'asc'));
        const querySnapshot = await getDocs(projectsQuery);
        const projectsData: Project[] = querySnapshot.docs.map((doc) => doc.data() as Project);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (projects?.length === 0) {
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container
      maxWidth='lg'
      className='projects_page'
    >
      <Typography
        variant='h3'
        component='h1'
        align='center'
        gutterBottom
      >
        My Projects
      </Typography>
      <Grid
        container
        spacing={4}
      >
        {projects?.map((project, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
          >
            <Card className='project_card'>
              <CardMedia
                component='img'
                alt={project.title}
                height='140'
                image={project.image}
                title={project.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                >
                  {project.title}
                </Typography>
                <Typography 
                  variant='body2'
                  color='textSecondary'
                  component='p'
                >
                  {project.description}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className='tech_stack'
                >
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </Typography>
                <div className='project_links'>
                  {project.title === 'Spryte Chat' ? (
                    <Button
                      size='small'
                      color='primary'
                      onClick={handleOpenModal}
                    >
                      GitHub
                    </Button>
                  ) : (
                    project.github && (
                      <Button
                        size='small'
                        color='primary'
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        GitHub
                      </Button>
                    )
                  )}
                  {project.demo && (
                    <Button
                      size='small'
                      color='primary'
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* private repository modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Private Repository</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To respect confidentiality agreements, I cannot make the GitHub repository for this project public. 
            Please contact me via
            {' '}
            <a
              href="mailto:jamezjaz@gmail.com"
              target='_blank'
              rel='noopener noreferrer'
            >
              email
            </a>,
            {' '}
            <a
              href="https://www.linkedin.com/in/jamesgozieodufu/"
              target='_blank'
              rel='noopener noreferrer'
            >
              LinkedIn
            </a>, or
            {' '}
            <a>+2348064497094</a>
            {' '}
            for a personal walkthrough of the code and features.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            color='primary'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectsPage;
