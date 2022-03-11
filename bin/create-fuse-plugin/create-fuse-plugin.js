#! /usr/bin/env node
const { Signale } = require('signale');
const chalk = require('chalk');
const { program } = require('commander');
const prompts = require('prompts');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const validatePackage = require('validate-npm-package-name');

// Mirro console to signale
const console = new Signale({
  types: {
    success: {
      badge:  '🚀',
      label: false,
      color: 'green',
      logLevel: 'info'
    },
    error: {
      badge: '❌',
      label: false,
      color: 'red',
      logLevel: 'error'
    },
    pending: { 
      badge: '🛠',
      label: false,
      color: 'magenta',
      logLevel: 'info'
    }
  }
});

const questions = [
  {
    type: 'text',
    name: 'pluginName',
    message: 'What\'s your plugin name?'
  },
  {
    type: 'confirm',
    name: 'isScoped',
    message: 'Make it scoped?',
    initial: false,
  },
  {
    type: prev => prev ? 'text' : null,
    name: 'scopeName',
    message: 'Scope name?',
  },

  {
    type: 'text',
    name: 'title',
    message: 'Human readable title'
  },
  {
    type: 'text',
    name: 'description',
    message: 'Describe your plugin:'
  },
  {
    type: 'confirm',
    name: 'hasSettings',
    message: 'Do you want a settings page?',
    initial: true
  },
  // {
  //   type: 'multiselect',
  //   name: 'devices',
  //   message: 'Which device are supported by your plugin?',
  //   choice: [
  //     { title: 'FDM printers', value: 'fdm_printer' },
  //     { title: 'MSLA printers', value: 'msla_printer' },
  //     { title: 'CNC', value: 'cnc' },
  //     { title: 'Laser', value: 'laser' },
  //   ],
  //   hint: '- Space to select. Return to submit'
  // }
];

program.name('fuse-create-plugin')
  .description('CLI to generate starting template for FUSE plugin')
  .version('0.0.1');

function validatePluginName(name) {
  const validationResult = validatePackage(name);
  if (!validationResult.validForNewPackages) {
    console.log();
    console.error(`Unable to create plugin with name ${chalk.cyan(name)} due to naming convention restrictions:`);
    [
      ...(validationResult.warnings || []),
      ...(validationResult.errors || [])
    ].forEach(message => {
      console.log(chalk.red('→') + ' ' + message);
    });
    console.log();

    process.exit(1);
  }
}

/**
 * Create plugin folder structure and boilerplate files
 * @param {string} name 
 * @param {*} version 
 * @param {*} opts 
 */
function createPlugin(name, version, opts) {

  // Compute plugin root path
  const root = path.resolve(process.cwd(), path.join('plugins', name));

  // Check plugin name if can be named that way
  validatePluginName(name);

  // Check if dir already exists
  if (fs.existsSync(root)) {
    console.error(`Directory for plugin named ${chalk.bold.redBright(name)} already exists.`);
    console.log();
    process.exit(1);
  }

  console.pending(`Creating a new ${chalk.bold('FUSE')} plugin in ${chalk.magenta(root)}.`);
  console.log();

  // Creating folder structure using default boilerplat
  fs.copySync(path.join(__dirname, 'boilerplate'), root)

  // Prepare package content
  let packageContent = {
    name: name,
    version: version,
    license: 'MIT',
    fuse: {}
  };
  if (opts.description.length) {
    packageContent.description = opts.description;
  }
  if (opts.title) {
    packageContent.fuse.title = opts.title;
  }
  // Custom FUSE fields
  if (opts.fuse) {
    packageContent.fuse = {...packageContent.fuse, ...opts.fuse}
  }

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageContent, null, 2) + os.EOL,
  )
}

(async () => {

  let isCancelled = false
  const answers = await prompts(questions);

  const {
    pluginName,
    scopeName,
    title,
    description
  } = answers

  if (!pluginName || !title)
    process.exit(1)

  let pluginPathName = scopeName
    ? path.join('@'+scopeName, pluginName) 
    : pluginName

  createPlugin(pluginPathName, '0.1', {
    description: description,
    title: title
  })

  console.success(`Plugin ${chalk.bold.greenBright(pluginName)} successfully created!`)
  console.log();

  process.exit(0);
})();