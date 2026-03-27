
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroBackground = 'linear-gradient(135deg, rgba(233, 30, 99, 0.12) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 100%), radial-gradient(ellipse at 70% 20%, rgba(233, 30, 99, 0.15) 0%, transparent 50%), url("/hero-bg.jpeg")';

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: 650,
        py: { xs: 8, md: 12 },
        backgroundImage: heroBackground,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        color: 'white',
        textAlign: 'left',
        px: { xs: 3, sm: 6, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 650 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography
            variant='h1'
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              lineHeight: 1.2,
              textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em'
            }}
          >
            Unleash Your{' '}
            <Box
              component='span'
              sx={{
                background: 'linear-gradient(135deg, #E91E63 0%, #F48FB1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Radiance
            </Box>
          </Typography>

          <Typography
            sx={{
              mb: 5,
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' },
              maxWidth: '600px',
              opacity: 0.95,
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.9)'
            }}
          >
            Where luxury meets science. Elevate your beauty ritual with expert-crafted formulas that transform, protect, and illuminate
          </Typography>

          <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to='/products'
              variant='contained'
              size='large'
              sx={{
                background: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.15rem' },
                fontWeight: 700,
                borderRadius: 30,
                boxShadow: '0 8px 30px rgba(233, 30, 99, 0.45)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #C2185B 0%, #9C27B0 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 45px rgba(233, 30, 99, 0.55)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Shop Now
            </Button>

            <Button
              component={Link}
              to='/products?category=new'
              variant='outlined'
              size='large'
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'white',
                px: { xs: 4, sm: 6 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.15rem' },
                fontWeight: 600,
                borderRadius: 30,
                borderWidth: 2,
                backgroundColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#E91E63',
                  backgroundColor: 'rgba(233, 30, 99, 0.25)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              New Arrivals
            </Button>
          </Box>

          <Box
            sx={{
              mt: 5,
              display: 'flex',
              gap: { xs: 3, sm: 5 },
              opacity: 0.9,
              flexWrap: 'wrap'
            }}
          >
            {[
              { text: 'Premium Quality', icon: '✨' },
              { text: '50K+ Products', icon: '💄' },
              { text: '24/7 Support', icon: '💬' }
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>{item.icon}</Typography>
                <Typography variant='body1' sx={{ fontWeight: 600, letterSpacing: '0.5px' }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
