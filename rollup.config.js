import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import { lezer } from "@lezer/generator/rollup"

export default [
    {
        input: "./src/index.js",
        output: {
            format: "es",
            file: "./dist/index.js",
            sourcemap: true,
        },
        plugins: [
            lezer(),
            nodeResolve(),
            commonjs(),
            typescript()
        ]
    },
    {
        input: "./src/demo.js",
        output: {
            format: "iife",
            file: "./dist/demo.bundle.js",
            sourcemap: true,
        },
        plugins: [
            lezer(),
            nodeResolve(),
            commonjs(),
            typescript()
        ]
    }
]
