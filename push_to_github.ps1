# GitHub Push Script for Tripomist Web Page
$token = $env:GITHUB_TOKEN # Load from environment variable or replace with your token
$owner = "Wasim213207"
$repo = "tripomist-web-page"
$headers = @{
    "Authorization" = "Bearer $token"
    "Accept" = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

function Push-File($localPath, $repoPath) {
    $bytes = [System.IO.File]::ReadAllBytes($localPath)
    $b64 = [System.Convert]::ToBase64String($bytes)
    $url = "https://api.github.com/repos/$owner/$repo/contents/$repoPath"

    # Check if file already exists (to get SHA for update)
    $sha = $null
    try {
        $existing = Invoke-RestMethod -Uri $url -Headers $headers -Method Get
        $sha = $existing.sha
    } catch {}

    $body = @{ message = "Add $repoPath"; content = $b64 }
    if ($sha) { $body.sha = $sha }

    try {
        Invoke-RestMethod -Uri $url -Headers $headers -Method Put -Body ($body | ConvertTo-Json -Depth 5) -ContentType "application/json" | Out-Null
        Write-Host "✅ Pushed: $repoPath"
    } catch {
        Write-Host "❌ Failed: $repoPath - $_"
    }
}

$baseDir = "c:\Users\storm\Desktop\antigravity file\stitch_tripomist_web_page"

# Push main HTML files
$htmlFiles = @("index.html","checkout.html","group-trips.html","itinerary-spiti.html","portal.html","upcoming-trips.html","weekend-trips.html","serve.ps1","serve-lan.ps1")
foreach ($f in $htmlFiles) {
    $fullPath = Join-Path $baseDir $f
    if (Test-Path $fullPath) {
        Push-File $fullPath $f
    }
}

# Push README
$readmeContent = "# Tripomist Web Page`n`nTripoMist travel web application built with HTML, CSS & JavaScript.`n`n## Pages`n- index.html - Home page`n- checkout.html - Checkout page`n- group-trips.html - Group trips`n- itinerary-spiti.html - Spiti Valley itinerary`n- portal.html - Portal`n- upcoming-trips.html - Upcoming trips`n- weekend-trips.html - Weekend trips`n`n## Live Preview`nOpen any HTML file in a browser to view the pages."
$b64readme = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($readmeContent))
$readmeUrl = "https://api.github.com/repos/$owner/$repo/contents/README.md"
$sha = $null
try { $existing = Invoke-RestMethod -Uri $readmeUrl -Headers $headers -Method Get; $sha = $existing.sha } catch {}
$readmeBody = @{ message = "Add README.md"; content = $b64readme }
if ($sha) { $readmeBody.sha = $sha }
Invoke-RestMethod -Uri $readmeUrl -Headers $headers -Method Put -Body ($readmeBody | ConvertTo-Json) -ContentType "application/json" | Out-Null
Write-Host "✅ Pushed: README.md"

Write-Host "`n🎉 Done! View your repo at: https://github.com/$owner/$repo"
