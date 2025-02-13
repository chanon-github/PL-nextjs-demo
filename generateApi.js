const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function getApiClassNamesFromFolder(folderPath) {
  const fileNames = fs.readdirSync(folderPath).filter((fileName) => fileName.endsWith('.ts'));
  const classNames = [];

  fileNames.forEach((fileName) => {
    const filePath = path.join(folderPath, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.ES2015, /*setParentNodes*/ true);

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node) && node.heritageClauses) {
        const baseApiHeritage = node.heritageClauses.find((clause) => clause.types.some((type) => type.getText() === 'BaseAPI'));
        if (baseApiHeritage) {
          classNames.push(node.name.text);
        }
      }
    });
  });

  return classNames;
}

// Usage:
const modelsDir = 'src/services/rest-api/generated/entity';
const classNames = getApiClassNamesFromFolder(modelsDir);
// Prints an array of class names

function toCamelCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function convertListToCamelCase(list) {
  return list.map((str) => {
    const parts = str.split(/(?=[A-Z])/); // Split on capital letters
    parts[0] = toCamelCase(parts[0]);
   
    return parts.join('');
  });
}

const camelCaseList = convertListToCamelCase(classNames);

const importAXOISStatement = `import { axiosInstance, BASE_URL } from "../axios"; \n`;
const importStatement = classNames.map((data, idx) => `import { ${data} } from "./generated"`).join('\n');

const exportStatement = camelCaseList
  .map((data, idx) => `export const ${data} = new ${classNames[idx]}( undefined, BASE_URL, axiosInstance )`)
  .join('\n');
  console.log("test");
const exportFile = path.join(modelsDir, '../..', 'index.tsx');
console.log("exportFile", exportFile);
fs.writeFileSync(exportFile, importAXOISStatement);
fs.writeFileSync(exportFile, importStatement, { flag: 'a' });
fs.writeFileSync(exportFile, `\n\n`, { flag: 'a' });
fs.writeFileSync(exportFile, exportStatement, { flag: 'a' });
