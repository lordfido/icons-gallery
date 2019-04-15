import { PathLike, readdirSync, statSync } from 'fs';
import { join } from 'path';

const initialList = [] as string[];

const recursiveRead = (directory: PathLike, filelist = initialList) => {
  const files = readdirSync(directory);

  files.forEach(filename => {
    if (statSync(directory + filename).isDirectory()) {
      filelist = recursiveRead(`${directory}${filename}/`, filelist);
    } else {
      const pathToRemove = join(__dirname, '..').toString();

      filelist.push(`${directory.toString().replace(pathToRemove, '')}${filename}`);
    }
  });

  return filelist;
};

export default recursiveRead;
