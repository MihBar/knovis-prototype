@echo off
cd /d "%~dp0"
start "Knovis server" cmd /k ""C:\Program Files\nodejs\node.exe" "%~dp0server.js""
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:5173"
