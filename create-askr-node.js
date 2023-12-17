#!/usr/bin/env node

// Usage: npx create-askr-node my-node
import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const fsPromises = fs.promises;

const projectName = process.argv[2];

// Create a project directory with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, {recursive: true});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// A common approach to building a starter template is to
// create a `template` folder which will house the template
// and the files we want to create.
const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, projectDir, {recursive: true});

// It is good practice to have dotfiles stored in the
// template without the dot (so they do not get picked
// up by the starter template repository). We can rename
// the dotfiles after we have copied them over to the
// new project directory.
fs.renameSync(
    path.join(projectDir, 'gitignore'),
    path.join(projectDir, '.gitignore')
);


(async () => {
    try {
        const packageJsonPath = path.join(projectDir, 'package.json');

        console.log('packageJsonPath', packageJsonPath)
        // Read the package.json file
        const packageJsonData = await fsPromises.readFile(packageJsonPath);

        console.log('packageJsonData', packageJsonData)
        // Parse the file data to an object
        const packageJson = JSON.parse(packageJsonData);

        // Update the project's package.json with the new project name
        packageJson.name = projectName;

        // Convert the object back to a JSON string
        const updatedPackageJsonData = JSON.stringify(packageJson, null, 2);

        // Write the modified JSON back to the package.json file
        await fsPromises.writeFile(packageJsonPath, updatedPackageJsonData, 'utf8');

        // Run `npm install` with `cross-spawn` for cross-platform support.
        // (Node has issues spawning child processes in Windows).
        spawn.sync('npm', ['install'], {stdio: 'inherit'});

        console.log('Success! Your new project is ready.');
        console.log(`Created ${projectName} at ${projectDir}`);

    } catch (error) {
        console.error('Error updating package.json:', error);
    }


})()

