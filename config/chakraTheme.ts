import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        minHeight: '100vh',
        overflowX: 'hidden',
        bg: '#18191a',
        // bgGradient:
        //   'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(46,46,47,1) 19%, rgba(10,34,87,1) 39%, rgba(12,45,107,1) 60%, rgba(15,82,102,0.8421646246389181) 100%);',
        bgSize: '700px',
        backgroundPositionX: '150px',
        color: 'dappTemplate.white',
      },
      '*': {
        '&::-webkit-scrollbar': {
          width: 1.5,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'dappTemplate.dark.base',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'dappTemplate.light',
          borderRadius: 1.5,
        },
        scrollbarWidth: 'auto',
        scrollbarColor: 'dappTemplate.light dappTemplate.dark.base',
      },
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  colors: {
    dappTemplate: {
      bgStripes: '#2c3440',
      shadowColor: '#141414',
      dark: {
        lighter: '#3c4757',
        base: '#222831',
        darker: '#1d222a',
      },
      light: '#FAFFFD',
      white: '#ffffff',
      color1: {
        lighter: '#59a1ea',
        base: '#3C91E6',
        darker: '#1c7bda',
      },
      color2: {
        lighter: '#4f87f7',
        base: '#375ff0',
        darker: '#2848bd',
      },
      color3: {
        lighter: '#fb9567',
        base: '#FA824C',
        darker: '#f9611c',
      },
    },
  },
  components: {
    Alert: {
      variants: {
        subtle: {
          container: {
            bg: 'dappTemplate.dark.lighter',
          },
        },
      },
    },
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1560px',
  },
});
