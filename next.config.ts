import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

const lanHost = process.env.DINOCO_LAN_HOST;

export default {
  allowedDevOrigins: lanHost ? ['127.0.0.1', lanHost] : ['127.0.0.1'],
  output: 'export',
  devIndicators: false,
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
} satisfies NextConfig;
