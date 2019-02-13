const path = require('path')
import alias from 'rollup-plugin-alias'
import typescriptPlugin from 'rollup-plugin-typescript2'

export default {
    input: 'lib/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs'
    },
    plugins: [
        alias({
            resolve: ['.ts', '.js'],
            '~/lib': path.resolve(__dirname, 'lib/'),
            '~/config': path.resolve(__dirname, 'config/')
        }),
        typescriptPlugin({
            clean: true,
            experimentalCodeSplitting: true
        })
    ],
    external: Object.keys(require('./package.json').devDependencies),
    acorn: { plugins: { dynamicImport: true } }
}
