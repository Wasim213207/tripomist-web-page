$port = 8080
$localPath = Get-Location

# Create HttpListener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "--------------------------------------------------------" -ForegroundColor Green
    Write-Host "TripoMist Local Server Running!" -ForegroundColor Green
    Write-Host "URL: http://localhost:$port/index.html" -ForegroundColor Green
    Write-Host "Press [Ctrl + C] in this window to stop the server." -ForegroundColor Yellow
    Write-Host "--------------------------------------------------------" -ForegroundColor Green

    # Automatically open in default browser
    Start-Process "http://localhost:$port/index.html"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        # Clean up double slashes
        $urlPath = $urlPath -replace '//', '/'

        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        # Resolve full path and prevent path traversal
        $filePath = Join-Path $localPath $urlPath
        $normalizedLocal = [System.IO.Path]::GetFullPath($localPath.Path)
        $normalizedFile = [System.IO.Path]::GetFullPath($filePath)

        if (-not ($normalizedFile.StartsWith($normalizedLocal))) {
            $response.StatusCode = 403
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>403 Forbidden</h1>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            $response.Close()
            continue
        }

        if (Test-Path $filePath -PathType Leaf) {
            # Resolve MIME Types
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
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $mime
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>500 Internal Server Error</h1><p>$_</p>")
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $errBytes.Length
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>File $urlPath could not be located.</p>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Host "Error running server: $_" -ForegroundColor Red
} finally {
    $listener.Stop()
    $listener.Close()
}
