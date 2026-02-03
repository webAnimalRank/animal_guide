import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true
    })
  ],
  build: {
    rollupOptions: {
      plugins: visualizer()
    }
  },
  base: '/animal_guide',

  // ✅ 추가
  server: {
    host: '0.0.0.0'
    // proxy: {
    // 	'/api': {
    // 		target: `http://${API_URL}:8080`,
    // 		changeOrigin: true,
    // 		secure: false
    // 	},
    // 	'/images': {
    // 		target: `http://${API_URL}:8080`,
    // 		changeOrigin: true,
    // 		secure: false
    // 	}
    // }
  }
});
