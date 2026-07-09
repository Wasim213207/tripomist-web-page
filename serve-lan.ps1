$port = 8080
$localPath = Get-Location
$listener = $null

# Try finding a free port starting from 8080
for ($i = 0; $i -lt 20; $i++) {
    $currentPort = $port + $i
    try {
        $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $currentPort)
        $listener.Start()
        $port = $currentPort
        break
    } catch {
        if ($listener) { $listener.Stop(); $listener = $null }
    }
}

if ($listener -eq $null) {
    Write-Host "Failed to find any free port to bind to." -ForegroundColor Red
    exit 1
}

try {
    Write-Host "--------------------------------------------------------" -ForegroundColor Green
    Write-Host "TripoMist LAN Server Running!" -ForegroundColor Green
    Write-Host "Local URL: http://localhost:$port/index.html" -ForegroundColor Green
    Write-Host "LAN URL: http://192.168.1.6:$port/index.html" -ForegroundColor Green
    Write-Host "Press [Ctrl + C] in this window to stop the server." -ForegroundColor Yellow
    Write-Host "--------------------------------------------------------" -ForegroundColor Green

    while ($listener.Server.IsBound) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        
        # Read the request line
        $requestLine = $reader.ReadLine()
        if ($requestLine) {
            $parts = $requestLine -split ' '
            if ($parts.Length -ge 2) {
                $urlPath = $parts[1]
                # Clean up query params if any
                $urlPath = ($urlPath -split '\?')[0]
                # Clean up double slashes
                $urlPath = $urlPath -replace '//', '/'
                
                if ($urlPath -eq "/" -or $urlPath -eq "") {
                    $urlPath = "/index.html"
                }
                
                # Resolve full path and prevent path traversal
                $filePath = Join-Path $localPath.Path $urlPath
                $normalizedLocal = [System.IO.Path]::GetFullPath($localPath.Path)
                $normalizedFile = [System.IO.Path]::GetFullPath($filePath)
                
                if (-not ($normalizedFile.StartsWith($normalizedLocal)) -or -not (Test-Path $filePath -PathType Leaf)) {
                    # 404
                    $responseHeader = "HTTP/1.1 404 Not Found`r`nContent-Type: text/html`r`nConnection: close`r`n`r`n"
                    $responseBody = "<h1>404 Not Found</h1><p>File $urlPath could not be located.</p>"
                    $responseBytes = [System.Text.Encoding]::UTF8.GetBytes($responseHeader + $responseBody)
                    $stream.Write($responseBytes, 0, $responseBytes.Length)
                } else {
                    # 200 OK
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $mime = switch ($ext) {
                        ".html" { "text/html; charset=utf-8" }
                        ".htm"  { "text/html; charset=utf-8" }
                        ".css"  { "text/css; charset=utf-8" }
                        ".js"   { "application/javascript; charset=utf-8" }
                        ".png"  { "image/png" }
                        ".jpg"  { "image/jpeg" }
                        ".jpeg" { "image/jpeg" }
                        ".gif"  { "image/gif" }
                        ".svg"  { "image/svg+xml" }
                        ".ico"  { "image/x-icon" }
                        ".json" { "application/json" }
                        default { "application/octet-stream" }
                    }
                    
                    try {
                        $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                        $responseHeader = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($fileBytes.Length)`r`nConnection: close`r`n`r`n"
                        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($responseHeader)
                        
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                        $stream.Write($fileBytes, 0, $fileBytes.Length)
                    } catch {
                        $responseHeader = "HTTP/1.1 500 Internal Server Error`r`nContent-Type: text/html`r`nConnection: close`r`n`r`n"
                        $responseBody = "<h1>500 Internal Server Error</h1><p>$_</p>"
                        $responseBytes = [System.Text.Encoding]::UTF8.GetBytes($responseHeader + $responseBody)
                        $stream.Write($responseBytes, 0, $responseBytes.Length)
                    }
                }
            }
        }
        $client.Close()
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
} finally {
    $listener.Stop()
}
