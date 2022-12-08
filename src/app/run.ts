import * as assembler from "./assembler.ts";

// WARNING: this file is the main run file. It is only called from the command
// line and must NOT be imported by any other module

const filePath = Deno.args[0];

if (!filePath) {
  throw new Error("You must pass a filePath");
}

if (filePath === "") {
  throw new Error("filePath must not be empty");
}

const sourceCode = await assembler.readTextFile(filePath);

if (assembler.isReadTextFileError(sourceCode)) {
  throw new Error(JSON.stringify(sourceCode, undefined, 2));
}

const machineCode = assembler.assemble(sourceCode);

const destinationFilePath = assembler.getDestinationFilePath(filePath);

await assembler.writeTextFile(destinationFilePath, machineCode);

console.log(`Generated ${destinationFilePath}`);
