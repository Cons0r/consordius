import { compile } from 'nexe'

compile({
    input: './out/index.js',
    build: true,
    python: 'python3'
}).then(() => {
    console.log('success')
})