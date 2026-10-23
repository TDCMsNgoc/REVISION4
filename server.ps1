param(
    [int]$Port = 8090,
    [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    try {
        $Port = 8091
        $prefix = "http://localhost:$Port/"
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add($prefix)
        $listener.Start()
    } catch {
        $Port = 8092
        $prefix = "http://localhost:$Port/"
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add($prefix)
        $listener.Start()
    }
}

# Lấy địa chỉ IP mạng nội bộ (LAN) để test trên iPad / Điện thoại
$localIP = "localhost"
try {
    $ipConfig = Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*", "Ethernet*" | Where-Object { $_.IPAddress -notlike "169.254*" -and $_.IPAddress -notlike "127.*" } | Select-Object -First 1
    if ($ipConfig) {
        $localIP = $ipConfig.IPAddress
    }
} catch {}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " PHAN MEM TRAC NGHIEM REVISION UNITS 10-13 (TDC)" -ForegroundColor Green
Write-Host " May tinh (Desktop): $prefix" -ForegroundColor Yellow
Write-Host " Dien thoai / iPad : http://$($localIP):$Port/" -ForegroundColor Yellow
Write-Host " Thu muc: $root" -ForegroundColor Gray
Write-Host " Nhan Ctrl+C de dung may chu." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Open default browser
if (-not $NoBrowser) {
    try { Start-Process $prefix } catch {}
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.Url.LocalPath
        if ($rawUrl -eq "/" -or [string]::IsNullOrWhiteSpace($rawUrl)) {
            $rawUrl = "/index.html"
        }

        $decodedPath = [System.Uri]::UnescapeDataString($rawUrl.TrimStart('/'))
        $filePath = Join-Path $root $decodedPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rawUrl")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
