# Packager

Packager is my personal packager for frontend web development projects.

## Environment

* Node.js (latest)
* npm (latest)

## 2021.10.26 23:03

I was getting the following error when running `gulp`:
```
[...]\gulp.ps1 cannot be loaded because running scripts is disabled on this system.
```
To solve, I had to run the following command on PowerShell as Administrator:
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```