import { getCurrentEnvironment } from '@/utils/environment';

export const IS_DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true';

export const IS_PRODUCTION = getCurrentEnvironment() === 'production';

export const PUBLIC_URL = process.env.NEXT_PUBLIC_PUBLIC_URL;

IS_DEBUG &&
  console.log('@/config', {
    IS_DEBUG,
    IS_PRODUCTION,
    PUBLIC_URL,
  });
