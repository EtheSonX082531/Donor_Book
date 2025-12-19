@echo off
echo Starting Donor_Book Project...
echo.

:: Start Laravel backend
start cmd /k "cd /d C:\xampp\htdocs\donor_book && echo Starting Laravel Server... && php artisan serve"

:: Wait 3 seconds
timeout /t 3 /nobreak

:: Start Vite frontend
start cmd /k "cd /d C:\xampp\htdocs\donor_book && echo Building Frontend... && npm run dev"

:: Wait 2 seconds
timeout /t 2 /nobreak

:: Open browser
start http://localhost:8000

echo.
echo Project is running!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul