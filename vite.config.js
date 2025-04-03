import path from 'path';
import framework7 from 'rollup-plugin-framework7';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './public');

export default async () => {
  return {
    plugins: [
      framework7({ emitCss: false }),
    ],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
      outDir: BUILD_DIR,
      assetsInlineLimit: 0,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,  // Optional: increase chunk size limit
      rollupOptions: {
        treeshake: false,
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
    server: {
      host: true,
    },
    esbuild: {
      jsxFactory: '$jsx',
      jsxFragment: '"Fragment"',
    },
  };
};
