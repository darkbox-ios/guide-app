import path from 'path';
import framework7 from 'rollup-plugin-framework7';

// Resolve directory paths
const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');  // Static assets
const BUILD_DIR = path.resolve(__dirname, './dist');    // Output build directory (dist)

// Export Vite config
export default async () => {
  return {
    plugins: [
      framework7({ emitCss: false }), // Framework7 plugin (optional)
    ],
    root: SRC_DIR,
    base: '', // Base path for the project
    publicDir: PUBLIC_DIR,  // Static assets directory
    build: {
      outDir: BUILD_DIR,  // Output build directory is 'dist'
      assetsInlineLimit: 0,  // Do not inline assets
      emptyOutDir: true,  // Clear the output directory before each build
      chunkSizeWarningLimit: 1000,  // Optional: increase the chunk size limit
      rollupOptions: {
        treeshake: false,  // Disable tree-shaking
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';  // Group all node_modules into a vendor chunk
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': SRC_DIR,  // Alias to resolve '@' to the src directory
      },
    },
    server: {
      host: true,  // Serve the app on any network interface (useful for testing on devices)
    },
    esbuild: {
      jsxFactory: '$jsx',  // Customize JSX factory if needed
      jsxFragment: '"Fragment"',  // Customize JSX fragment if needed
    },
  };
};
