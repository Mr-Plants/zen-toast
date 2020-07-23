import vuePlugin from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import babel from 'rollup-plugin-babel';
import {terser} from "rollup-plugin-terser";

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    vuePlugin(),
    scss(),
    babel({
      exclude: 'node_modules/**'
    }),
    terser()
  ],
  external: ['vue']
}
