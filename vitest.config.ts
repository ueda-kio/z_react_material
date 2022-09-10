/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
	},
});
