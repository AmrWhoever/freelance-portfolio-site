import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    build: {
        rollupOptions: {
            output: {
                // Improvement: split large third-party dependencies into dedicated chunks to reduce app entry chunk size.
                manualChunks(id) {
                    if (id.includes('node_modules/three')) {
                        return 'vendor-three';
                    }

                    if (id.includes('node_modules/@tsparticles')) {
                        return 'vendor-particles';
                    }

                    if (id.includes('node_modules/@inertiajs') || id.includes('node_modules/vue')) {
                        return 'vendor-core';
                    }
                },
            },
        },
    },
});