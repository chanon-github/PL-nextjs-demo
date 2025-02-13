const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src/services/rest-api/generated/model');
const outputFile = path.join(__dirname, 'interfaces.ts');

fs.readdir(modelsDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // filter the files that end with '-dto.ts'
  const dtoFiles = files.filter(file => file.endsWith('-dto.ts'));

  // create an array of interface names and filter types
  const interfaceData = dtoFiles.map(dtoFile => {
    const filePath = path.join(modelsDir, dtoFile);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // use regular expressions to extract the interface name
    const interfaceNameRegex = /export interface (\w+)/;
    const match = fileContent.match(interfaceNameRegex);
    if (match) {
      const interfaceName = match[1];
      const filterTypeName = `${interfaceName}Filter`;
      const filterType = `export type ${filterTypeName} = FilterDescriptor<Complete<${interfaceName}>>;\n`;
      return { interfaceName, filterType };
    }
    return null;
  }).filter(data => data !== null);

  // create the output file
  //const outputFileContent = interfaceData.map(data => data.filterType).join('');
  //fs.writeFileSync(outputFile, outputFileContent);

  // export the filter types from the output file
  const importTypeStatement = `import { ConvertToOptional, DTOFilter } from 'src/services/crud-types.jsx'; \n`;
  const importStatement = interfaceData.map((data, idx) => `import { ${data.interfaceName} } from './model/${dtoFiles[idx].replace('.ts', '')}';`).join('\n');
  const exportStatement = interfaceData.map(data => `export type ${data.interfaceName}Filter = DTOFilter<ConvertToOptional<${data.interfaceName}>>;`).join('\n');
  
  const exportFile = path.join(modelsDir, '..', 'type-generated.ts');

  fs.writeFileSync(exportFile, importTypeStatement);
  fs.writeFileSync(exportFile, importStatement, { flag: 'a' });
  fs.writeFileSync(exportFile, `\n\n`, { flag: 'a' });

  fs.writeFileSync(exportFile, exportStatement, { flag: 'a' });
});