# Container Standardization Script
# Replaces hardcoded max-width classes with UnifiedContainer usage

$rootPath = "c:\Users\Anton\Downloads\kleaners-main\src"
$filesToProcess = Get-ChildItem -Path $rootPath -Recurse -Include "*.tsx", "*.ts" -Exclude "*.d.ts"

# Container mapping patterns
$containerMappings = @{
    'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' = 'UnifiedContainer size="xl"'
    'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8' = 'UnifiedContainer size="lg"'
    'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8' = 'UnifiedContainer size="md"'
    'max-w-3xl mx-auto' = 'UnifiedContainer size="sm" padding="sm"'
    'max-w-2xl mx-auto' = 'UnifiedContainer size="sm" padding="sm"'
}

# Files that need UnifiedContainer import
$filesToAddImport = @()

foreach ($file in $filesToProcess) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $needsImport = $false
    
    # Skip files that already use UnifiedContainer extensively
    if ($content -match "UnifiedContainer" -and $content -match "ServicePageTemplate") {
        Write-Host "Skipping $($file.Name) - already uses UnifiedContainer" -ForegroundColor Green
        continue
    }
    
    # Replace container patterns
    foreach ($pattern in $containerMappings.Keys) {
        if ($content -match [regex]::Escape($pattern)) {
            $replacement = $containerMappings[$pattern]
            $content = $content -replace [regex]::Escape("className=`"$pattern`""), "className=`"w-full`""
            $content = $content -replace [regex]::Escape("className=`"$pattern"), "className=`"w-full"
            $needsImport = $true
            Write-Host "Found container pattern in $($file.Name)" -ForegroundColor Yellow
        }
    }
    
    # Add import if needed and not already present
    if ($needsImport -and $content -notmatch "import.*UnifiedContainer") {
        $importLine = 'import { UnifiedContainer } from "@/components/layout/UnifiedContainer";'
        
        # Find the last import line
        $lines = $content -split "`n"
        $lastImportIndex = -1
        for ($i = 0; $i -lt $lines.Length; $i++) {
            if ($lines[$i] -match "^import\s") {
                $lastImportIndex = $i
            }
        }
        
        if ($lastImportIndex -ge 0) {
            $lines = $lines[0..$lastImportIndex] + $importLine + $lines[($lastImportIndex + 1)..($lines.Length - 1)]
            $content = $lines -join "`n"
        }
        
        $filesToAddImport += $file.FullName
    }
    
    # Write back if changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nContainer standardization complete!" -ForegroundColor Green
Write-Host "Files that need manual UnifiedContainer wrapper updates:" -ForegroundColor Yellow
$filesToAddImport | ForEach-Object { Write-Host "  $_" }

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Review the updated files" 
Write-Host "2. Manually wrap content with <UnifiedContainer> tags where needed"
Write-Host "3. Test the application for layout consistency"
Write-Host "4. Run 'npm run build' to verify no errors"
