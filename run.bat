@echo off
if "%1"=="dev" (
    node node_modules\vite\bin\vite.js
) else if "%1"=="build" (
    node node_modules\vite\bin\vite.js build
) else if "%1"=="build:prod" (
    node node_modules\vite\bin\vite.js build --mode production
) else if "%1"=="lint" (
    node node_modules\eslint\bin\eslint.js .
) else if "%1"=="preview" (
    node node_modules\vite\bin\vite.js preview
) else if "%1"=="start" (
    node node_modules\vite\bin\vite.js preview --host
) else (
    echo Usage: run.bat [dev^|build^|build:prod^|lint^|preview^|start]
)
