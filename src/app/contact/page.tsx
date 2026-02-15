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
import emailjs from 'emailjs-com';
import Notification from '@/components/notification/Notification';

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
  const [notification, setNotification] = useState<{
    message: string,
    type: 'success' | 'error'
  } | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // contact form handlechange function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormErrors({ ...formErrors, [id]: value === '' });
  };

  // contact form `Send Message` function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = formData.name;
    const email = formData.email;
    const message = formData.message;

    // form validations
    if (!name || !email || !message) {
      setFormErrors({
        name: !name,
        email: !email,
        message: !message
      });
      return;
    };

    // the email params and values
    const emailData = {
      from_name: name,
      to_name: 'James C. Odufu',
      message: message,
      reply_to: email,
    };

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

    emailjs.send(
      serviceID || '', // service ID
      templateID || '', // template ID
      emailData,
      userID || '' // EmailJS user ID
    ).then((response) => {
      console.log('SUCCESS!', { response });

      // custom Notification component
      setNotification({
        message: 'Message sent successfully!',
        type: 'success'
      });

      // clears form fields on successful email sent
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }).catch((error) => {
      console.error('FAILED...', error);

      setNotification({
        message: 'Failed to send message. Please try again later.',
        type: 'error'
      });
    });
  };

  // opens resume for perusal
  const handleViewResume = () => {
    window.open('/james_odufu.pdf', '_blank');
  };

  // downloads resume on user's PC
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/james_odufu.pdf';
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
      {/* invokes the custom Notification component if notification state object is not null */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
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
              href='mailto:james.c.odufu@gmail.com'
              color='primary'
              target="_blank"
              rel="noopener noreferrer"
            >
              <Email />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href='https://www.linkedin.com/in/jamesgozieodufu/'
              color='primary'
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href='https://github.com/jamezjaz'
              color='primary'
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href='tel:+234 806 449 7094'
              color='primary'
              target="_blank"
              rel="noopener noreferrer"
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
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Resume Options</DialogTitle>
          <DialogContent>
            <Typography>Would you like to view my resume or download it?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleViewResume}
              color='primary'
            >
              View Resume
            </Button>
            <Button
              onClick={handleDownloadResume}
              color='primary'
            >
              Download Resume
            </Button>
            <Button
              onClick={handleClose}
              color='secondary'
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ContactPage;
