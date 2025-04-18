@echo off
echo Starting development servers...

echo Testing MongoDB connection...
cd backend
call npx ts-node src/scripts/testDbConnection.ts
if errorlevel 1 (
    echo MongoDB connection failed! Please check your connection string and network.
    pause
    exit /b 1
)
cd ..

echo Starting backend server...
start cmd /k "cd backend && npm run dev"

echo Starting frontend server...
start cmd /k "npm run dev"

echo Servers are starting up...
echo Frontend will be available at http://localhost:3000
echo Backend will be available at http://localhost:5000
echo Press any key to close this window...
pause 