'use client';

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Email,
  LinkedIn,
  GitHub,
  Phone,
  Description
} from '@mui/icons-material';
import { db } from '@/utils/firebase';
import { addDoc, collection } from 'firebase/firestore';

const ContactPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormErrors({ ...formErrors, [id]: value === '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    console.log({ name, email, message });

    if (!name || !email || !message) {
      setFormErrors({
        name: !name,
        email: !email,
        message: !message
      });
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        date: new Date()
      });
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  const handleViewResume = () => {
    window.open('/James_Odufu.pdf', '_blank');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/James_Odufu.pdf';
    link.download = 'James_Odufu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container
      maxWidth='md'
      className='contact_page'
    >
      <Typography
        variant='h3'
        component='h1'
        align='center'
        gutterBottom
        className='page_title'
      >
        Contact Me
      </Typography>
      <Typography
        variant='body1'
        align='center'
        gutterBottom
      >
        I’d love to hear from you! Whether you have a question about a project, 
        want to collaborate, or just want to say hi, feel free to drop me a message.
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        className='contact_form'
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='name'
              name='name'
              label='Name'
              fullWidth
              autoComplete='name'
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
              helperText={formErrors.name ? 'Name is required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='email'
              name='email'
              label='Email'
              fullWidth
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              helperText={formErrors.email ? 'Email is required' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='message'
              name='message'
              label='Message'
              multiline
              rows={4}
              fullWidth
              value={formData.message}
              onChange={handleChange}
              error={formErrors.message}
              helperText={formErrors.message ? 'Message is required' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              className='submit_button'
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        className='contact_info'
        mt={4}
        textAlign='center'
      >
        <Typography
          variant='h5'
          gutterBottom
        >
          Or reach out to me via:
        </Typography>
        <Grid
          container
          justifyContent='center'
          spacing={3}
        >
          <Grid item>
            <IconButton
              href='mailto:jamezjaz@gmail.com'
              color='primary'
            >
              <Email />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href='https://www.linkedin.com/in/jamesgozieodufu/'
              color='primary'
            >
              <LinkedIn />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href='https://github.com/jamezjaz'
              color='primary'
            >
              <GitHub />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href='tel:+2348064497094'
              color='primary'
            >
              <Phone />
            </IconButton>
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='secondary'
          startIcon={<Description />}
          onClick={handleOpen}
          style={{ marginTop: '20px' }}
        >
          View or Download Resume
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Resume Options</DialogTitle>
          <DialogContent>
            <Typography>Would you like to view my resume or download it?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleViewResume} color='primary'>
              View Resume
            </Button>
            <Button onClick={handleDownloadResume} color='primary'>
              Download Resume
            </Button>
            <Button onClick={handleClose} color='secondary'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ContactPage;
