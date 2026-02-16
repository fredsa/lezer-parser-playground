import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
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
            commonjs()
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
            commonjs()
        ]
    }
]
