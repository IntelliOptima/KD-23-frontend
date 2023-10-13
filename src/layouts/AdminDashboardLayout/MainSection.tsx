import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import React from "react";

const HeroSection = () => {
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to your Dashboard
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Please go to your side panel and choose your actions
      </Typography>
    </Box>
  </Container>
};

export default HeroSection;
