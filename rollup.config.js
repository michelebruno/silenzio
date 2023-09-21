import dts from 'rollup-plugin-dts';

let files = [
    'index',
    'next'
]
export default files.map(file => ([{
    input: `dist/${file}.js`,
    output: {
        file: `dist/${file}.js`,
    },
}, {
    input: `dist/${file}.d.ts`,
    output: {
        file: `dist/${file}.d.ts`,
    },
    plugins: [dts()]
},]))