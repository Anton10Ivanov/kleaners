#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Conversion Errors...\n');

// Function to fix syntax errors in converted files
function fixFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Fix invalid syntax from router conversion
    if (content.includes('const navigate = /* useRouter() */;')) {
      content = content.replace(/const navigate = \/\* useRouter\(\) \*\/;/g, '// const navigate = useRouter();');
      hasChanges = true;
    }

    // Fix other invalid comments
    content = content
      .replace(/\/\* useRouter\(\) \*\//g, '// useRouter()')
      .replace(/\/\* router\.push\(/g, '// router.push(')
      .replace(/\/\* router\.pathname \*\//g, '// router.pathname')
      .replace(/\*\//g, ''); // Remove orphaned */

    // Remove empty 'use client' duplicates
    content = content.replace(/'use client'\s*\n\s*'use client'/g, "'use client'");

    if (hasChanges || content !== fs.readFileSync(filePath, 'utf8')) {
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
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  items.forEach(item => {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      fixedCount += fixDirectory(fullPath);
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.ts'))) {
      if (fixFile(fullPath)) {
        fixedCount++;
        console.log(`  ✅ Fixed ${fullPath}`);
      }
    }
  });

  return fixedCount;
}

// Specific fixes for problematic files
function fixSpecificFiles() {
  console.log('🎯 Fixing specific problematic files...');
  
  // Fix button component
  const buttonPath = 'components/ui/button.tsx';
  if (fs.existsSync(buttonPath)) {
    const buttonContent = `'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary-hover text-primary-foreground font-semibold shadow-lg hover:shadow-xl",
        destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", 
        ghost: "text-foreground hover:bg-muted hover:text-accent",
        link: "text-accent underline-offset-4 hover:underline",
        home: "text-foreground hover:text-accent cursor-pointer",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3 py-1 text-sm",
        lg: "h-12 px-6 py-3 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  navigateHome?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, navigateHome, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (navigateHome) {
        // Handle navigation
        window.location.href = '/';
      }
      
      // Call original onClick if provided
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={navigateHome ? handleClick : props.onClick}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }`;

    fs.writeFileSync(buttonPath, buttonContent);
    console.log('  ✅ Fixed button component');
  }

  // Fix error boundary
  if (!fs.existsSync('components/error-boundary.tsx')) {
    const errorBoundaryContent = `'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  FallbackComponent?: React.ComponentType<{ error: Error }>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

const DefaultErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-center py-8 text-red-500">
    <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
    <p className="text-sm">{error?.message}</p>
  </div>
)

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.FallbackComponent || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}`;

    fs.writeFileSync('components/error-boundary.tsx', errorBoundaryContent);
    console.log('  ✅ Created error boundary');
  }

  return true;
}

// Run fixes
async function main() {
  console.log('🚀 Starting Error Fixes...\n');
  
  // Fix specific files first
  fixSpecificFiles();
  
  // Fix all components
  console.log('\n📁 Fixing components directory...');
  const componentsFixes = fixDirectory('components');
  
  // Fix hooks
  console.log('\n🎣 Fixing hooks directory...');
  const hooksFixes = fixDirectory('hooks');
  
  // Fix utils
  console.log('\n🔧 Fixing utils directory...');
  const utilsFixes = fixDirectory('utils');

  console.log(`\n📈 Fix Summary:`);
  console.log(`   📁 Components fixed: ${componentsFixes}`);
  console.log(`   🎣 Hooks fixed: ${hooksFixes}`);
  console.log(`   🔧 Utils fixed: ${utilsFixes}`);
  
  console.log('\n🎉 Error Fixes Complete!');
}

main().catch(error => {
  console.log(`Fix failed: ${error.message}`, 'error');
  process.exit(1);
});
