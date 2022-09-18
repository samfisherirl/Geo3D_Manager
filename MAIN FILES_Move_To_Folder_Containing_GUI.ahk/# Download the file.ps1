# Download the file
$zipFile = "https://drive.google.com/u/0/uc?id=1xxLSVrRLxKhmajD1WVAPrQNa6xyJ8Tau&export=download"
Invoke-WebRequest -Uri $zipFile -OutFile "$($env:TEMP)\myFile.doc"