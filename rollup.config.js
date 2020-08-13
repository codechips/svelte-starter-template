import commonjs from '@rollup/plugin-commonjs';
import html from 'rollup-plugin-html2';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import preprocess from 'svelte-preprocess';
import { transformSync } from '@swc/core';

const isDev = process.env.NODE_ENV === 'development';
const buildDir = 'dist';
const port = 3000;

const plugins = [
  svelte({
    dev: isDev,
    extensions: ['.svelte'],
    // extract all styles to an external file
    css: css => {
      css.write(`${buildDir}/bundle.css`);
    },
    preprocess: preprocess({
      typescript({ content }) {
        // use SWC to transpile TS scripts in Svelte files
        const { code } = transformSync(content, {
          jsc: {
            parser: { syntax: 'typescript' }
          }
        });
        return { code };
      }
    })
  }),
  typescript({ sourceMap: isDev }),
  resolve({
    browser: true,
    dedupe: ['svelte']
  }),
  commonjs(),
  html({
    template: 'src/index.html',
    fileName: 'index.html'
  })
];

if (isDev) {
  plugins.push(
    serve({
      contentBase: buildDir,
      historyApiFallback: true,
      port
    }),
    livereload({ watch: buildDir })
  );
} else {
  plugins.push(terser());
}

module.exports = {
  input: 'src/main.ts',
  output: {
    name: 'bundle',
    file: `${buildDir}/bundle.js`,
    sourcemap: isDev,
    format: 'iife'
  },
  plugins
};
