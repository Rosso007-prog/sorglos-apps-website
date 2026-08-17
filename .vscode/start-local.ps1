$ErrorActionPreference = "Stop"

node Main/scripts/scan-screenshots.js

# Nur einen vorhandenen lokalen Python-Testserver auf Port 8000 beenden.
$listeners = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue
foreach ($listener in $listeners) {
    $processInfo = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)" -ErrorAction SilentlyContinue
    if ($processInfo -and $processInfo.CommandLine -match '(server\.py|http\.server\s+8000)') {
        Stop-Process -Id $listener.OwningProcess -Force
    } else {
        throw "Port 8000 wird bereits von einem anderen Prozess verwendet (PID $($listener.OwningProcess))."
    }
}

$resolvedVscodePath = [System.IO.Path]::GetFullPath($PSScriptRoot)
foreach ($profileName in @(".chrome-debug-profile", ".edge-debug-profile", ".firefox-debug-profile")) {
    $profilePath = Join-Path $PSScriptRoot $profileName
    $resolvedProfilePath = [System.IO.Path]::GetFullPath($profilePath)
    if ($resolvedProfilePath.StartsWith($resolvedVscodePath, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $resolvedProfilePath)) {
        Remove-Item -LiteralPath $resolvedProfilePath -Recurse -Force
    }
}

Start-Sleep -Milliseconds 300

$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    throw "Python wurde nicht gefunden. Bitte Python 3 installieren oder zum PATH hinzufügen."
}

& $python.Source -u server.py
