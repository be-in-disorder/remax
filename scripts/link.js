#!/usr/bin/env node
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const dest = path.join(cwd, 'packages')

const files = fs.readdirSync(dest).filter(item => !/^\./.test(item))

const pkgs = files.map(item => {
  const pkg = require(path.join(dest, item, 'package.json'));
  const cwd1 = path.join(dest, item)
  console.log('===>>>>>', item, pkg.name)
  try {
    child_process.execSync('yarn unlink', { cwd: cwd1 })
  } catch (e) {}
  child_process.execSync('yarn link', { cwd: cwd1 })
  return pkg.name
})

console.log(`yarn link ${pkgs.join(' ')}`)

