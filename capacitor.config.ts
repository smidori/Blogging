import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cct.blog',
  appName: 'Blog',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
