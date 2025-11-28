#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔨 Building Employee Task Tracker...\n');

try {
  // Install backend
  console.log('📦 Installing backend dependencies...');
  execSync('npm install', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  
  // Install frontend
  console.log('\n📦 Installing frontend dependencies...');
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  
  // Build frontend
  console.log('\n🏗️  Building frontend...');
  const viteBin = path.join(__dirname, 'frontend', 'node_modules', '.bin', 'vite');
  if (fs.existsSync(viteBin)) {
    execSync(`node ${viteBin} build`, { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  } else {
    console.error('❌ Vite not found!');
    process.exit(1);
  }
  
  console.log('\n✅ Build successful!');
} catch (err) {
  console.error('\n❌ Build failed:', err.message);
  process.exit(1);
}
