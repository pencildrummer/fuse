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
  }
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

function createPlugin(name, version, opts) {

  const root = path.resolve(path.join('plugins', name));

  // Check plugin name if can be named that way
  validatePluginName(name);

  // Check if dir already exists
  if (fs.existsSync(root)) {
    console.error(`Directory for plugin named ${chalk.bold.redBright(name)} already exists.`);
    console.log();
    process.exit(1);
  } else {
    // Check dir exists or otherwise create it
    fs.ensureDirSync(root);
  }

  console.pending(`Creating a new ${chalk.bold('FUSE')} plugin in ${chalk.magenta(root)}.`);
  console.log();

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
    JSON.stringify(packageContent, null, 2) + os.EOL
  )
}

(async () => {
  const res = await prompts(questions);
  console.log();

  let pluginName = res.scopeName
    ? path.join('@'+res.scopeName, res.pluginName) 
    : res.pluginName

  createPlugin(pluginName, '0.1', {
    description: res.description,
    title: res.title
  })

  console.success(`Plugin ${chalk.bold.greenBright(pluginName)} successfully created!`)
  console.log();

  process.exit(0);
})();