import { Lezer6502, LezerZ80 } from '../dist/index.js';
import { example6502, exampleZ80, example8080 } from '../src/examples.js';

function test(name, parser, input) {
    console.log(`Testing ${name}...`);
    try {
        const tree = parser.parse(input);
        console.log(tree.toString());
        if (tree.length > 0) {
            console.log(`Verified ${name}.\n`);
        } else {
            console.error(`Verification failed for ${name}: Empty tree.\n`);
            process.exit(1);
        }
    } catch (e) {
        console.error(`Parse failed for ${name}:`, e);
        process.exit(1);
    }
}

test("6502", Lezer6502.parser, example6502);
test("Z80", LezerZ80.parser, exampleZ80);
test("8080", LezerZ80.parser, example8080);

test("6502", Lezer6502.parser, example6502);
test("Z80", LezerZ80.parser, exampleZ80);
test("8080", LezerZ80.parser, example8080);
