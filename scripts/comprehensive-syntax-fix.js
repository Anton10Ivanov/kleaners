#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Comprehensive Syntax Fix...\n');

// Function to fix all syntax issues
function fixSyntaxIssues(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Remove unterminated block comments and orphaned comment markers
    const originalLength = content.length;
    
    // Fix unterminated /* comments by removing orphaned ones
    content = content.replace(/\/\*[^*]*$/gm, '// ');
    content = content.replace(/\*\/[^}]*$/gm, '');
    content = content.replace(/\/\*\s*$/gm, '//');
    content = content.replace(/\*\/$/gm, '');
    
    // Remove duplicate 'use client' directives
    content = content.replace(/'use client'\s*\n\s*'use client'/g, "'use client'");
    
    // Fix invalid router references
    content = content.replace(/const navigate = \/\* useRouter\(\) \*\/;/g, '// const navigate = useRouter();');
    content = content.replace(/\/\* useRouter\(\) \*\//g, '// useRouter()');
    content = content.replace(/\/\* router\./g, '// router.');
    
    // Fix orphaned */ at end of files
    content = content.replace(/\*\/\s*$/, '');
    
    // Ensure proper file endings
    if (!content.endsWith('\n')) {
      content += '\n';
    }

    if (content.length !== originalLength) {
      hasChanges = true;
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`  ❌ Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}

// Function to process directory recursively
function fixDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  let fixedCount = 0;
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach(item => {
      const fullPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        fixedCount += fixDirectory(fullPath);
      } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.ts'))) {
        if (fixSyntaxIssues(fullPath)) {
          fixedCount++;
          console.log(`  ✅ Fixed ${fullPath}`);
        }
      }
    });
  } catch (error) {
    console.log(`  ⚠️  Error processing directory ${dirPath}: ${error.message}`);
  }

  return fixedCount;
}

// Delete problematic files and recreate them
function recreateProblematicFiles() {
  console.log('🔄 Recreating problematic files...');
  
  // Delete and recreate footer
  const footerPath = 'components/footer.tsx';
  if (fs.existsSync(footerPath)) {
    fs.unlinkSync(footerPath);
  }
  
  const footerContent = `'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Kleaners</h3>
            <p className="text-gray-300 mb-4">
              Professional cleaning services you can trust. We make your space spotless.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/booking/home-cleaning" className="text-gray-300 hover:text-white">Home Cleaning</Link></li>
              <li><Link href="/booking/office-cleaning" className="text-gray-300 hover:text-white">Office Cleaning</Link></li>
              <li><Link href="/booking/deep-cleaning" className="text-gray-300 hover:text-white">Deep Cleaning</Link></li>
              <li><Link href="/booking/move-in-out" className="text-gray-300 hover:text-white">Move In/Out</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/about/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link href="/about/company-values" className="text-gray-300 hover:text-white">Our Values</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">1-800-KLEANERS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">hello@kleaners.de</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300">Berlin, Germany</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 Kleaners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}`;

  fs.writeFileSync(footerPath, footerContent);
  console.log('  ✅ Recreated footer.tsx');

  // Delete and recreate navbar
  const navbarPath = 'components/navbar.tsx';
  if (fs.existsSync(navbarPath)) {
    fs.unlinkSync(navbarPath);
  }

  const navbarContent = `'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, User, Calendar } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Kleaners
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link href="/booking">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700">Home</Link>
              <Link href="/services" className="block px-3 py-2 text-gray-700">Services</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700">About</Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700">Contact</Link>
              <Link href="/booking" className="block px-3 py-2">
                <Button className="w-full">Book Now</Button>
              </Link>
              <Link href="/login" className="block px-3 py-2">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}`;

  fs.writeFileSync(navbarPath, navbarContent);
  console.log('  ✅ Recreated navbar.tsx');

  return true;
}

// Run comprehensive fixes
async function main() {
  console.log('🚀 Starting Comprehensive Syntax Fix...\n');
  
  // Recreate problematic files
  recreateProblematicFiles();
  
  // Fix all components
  console.log('\n📁 Fixing components directory...');
  const componentsFixes = fixDirectory('components');
  
  // Fix app directory
  console.log('\n📱 Fixing app directory...');
  const appFixes = fixDirectory('app');
  
  // Fix hooks
  console.log('\n🎣 Fixing hooks directory...');
  const hooksFixes = fixDirectory('hooks');
  
  // Fix utils
  console.log('\n🔧 Fixing utils directory...');
  const utilsFixes = fixDirectory('utils');

  console.log(`\n📈 Fix Summary:`);
  console.log(`   📁 Components fixed: ${componentsFixes}`);
  console.log(`   📱 App files fixed: ${appFixes}`);
  console.log(`   🎣 Hooks fixed: ${hooksFixes}`);
  console.log(`   🔧 Utils fixed: ${utilsFixes}`);
  
  console.log('\n🎉 Comprehensive Syntax Fix Complete!');
}

main().catch(error => {
  console.log(`Fix failed: ${error.message}`, 'error');
  process.exit(1);
});
