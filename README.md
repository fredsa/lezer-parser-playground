# lezer-6502

A [Lezer](https://lezer.codemirror.net/) grammar for 6502 assembly language.

## Features

- Complete 6502 instruction set support (standard opcodes).
- Support for labels, comments, directives, numbers (hex, binary, decimal), strings, and all addressing modes.
- Line-oriented parsing to resolve ambiguities.
- Ready for integration with [CodeMirror 6](https://codemirror.net/).

## Installation

```bash
npm install
```

## Build

To build the parser:

```bash
npm run build
```

This generates the parser artifacts in `dist/`.

## Development

To run the development server with watch mode:

```bash
npm start
```

This will start an HTTP server at `http://127.0.0.1:8080` (or another available port) and automatically rebuild the project when files change.

## Testing

To run the test harness:

```bash
npm test
```

## Usage

```javascript
import { Lezer6502 } from "./dist/index.js";

const code = `
; Example
START:
  LDA #$00
  STA $D020
  RTS
`;

const tree = Lezer6502.parser.parse(code);
console.log(tree.toString());
```

## License

ISC
