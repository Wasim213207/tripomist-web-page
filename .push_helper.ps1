$rootDir = "c:\Users\storm\Desktop\antigravity file\stitch_tripomist_web_page"
$outDir = Join-Path $rootDir ".push_temp"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# All remaining files to push (batch 1 already done: .gitignore, silence-tailwind.js, react-app/index.html, react-app/src/main.jsx, react-app/src/App.jsx)
$allFiles = @(
  "auth-navbar.js",
  "checkout.html",
  "contact.html",
  "group-trips.html",
  "index.html",
  "itinerary-spiti.html",
  "lead-modal.js",
  "login.html",
  "portal.html",
  "privacy-policy.html",
  "profile.html",
  "react-app/src/components/Footer.jsx",
  "react-app/src/components/Navbar.jsx",
  "react-app/src/index.css",
  "react-app/src/pages/Checkout.jsx",
  "react-app/src/pages/ContactUs.jsx",
  "react-app/src/pages/GroupTrips.jsx",
  "react-app/src/pages/Home.jsx",
  "react-app/src/pages/Login.jsx",
  "react-app/src/pages/Profile.jsx",
  "react-app/src/pages/RefundPolicy.jsx",
  "react-app/src/pages/Search.jsx",
  "react-app/src/pages/UpcomingTrips.jsx",
  "react-app/src/pages/WeekendTrips.jsx",
  "react-app/src/utils/supabaseClient.js",
  "refund-policy.html",
  "search.html",
  "shipping-policy.html",
  "supabase-cdn.js",
  "terms-conditions.html",
  "upcoming-trips.html",
  "weekend-trips.html",
  "chatbot.js",
  "openrouter-config.js",
  "react-app/src/components/Chatbot.jsx"
)

# Split into batches of ~8 files each to stay under MCP limits
$batchSize = 8
$batchNum = 0
for ($i = 0; $i -lt $allFiles.Count; $i += $batchSize) {
  $batchNum++
  $batch = $allFiles[$i..([Math]::Min($i + $batchSize - 1, $allFiles.Count - 1))]
  
  $filesArray = @()
  foreach ($file in $batch) {
    $fullPath = Join-Path $rootDir $file
    if (Test-Path $fullPath) {
      $content = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::UTF8)
      $filesArray += @{
        path = $file.Replace("\", "/")
        content = $content
      }
    }
  }
  
  $outFile = Join-Path $outDir "batch_$batchNum.json"
  $filesArray | ConvertTo-Json -Depth 3 | Out-File -FilePath $outFile -Encoding UTF8
  $totalSize = (Get-Item $outFile).Length
  Write-Host "Batch $batchNum : $($filesArray.Count) files, $([math]::Round($totalSize/1024)) KB -> $outFile"
}

Write-Host "`nDone. Total batches: $batchNum"
