# Hostinger Deployment Context Summary

This file summarizes the deployment setup, configuration, and troubleshooting steps discussed for the AADC static website.

---

## 1. Project Information
* **Project Type**: Static website (HTML, CSS, JS, and `assets/` directory)
* **Designated URL**: `academic.auaicoe.in`
* **Local Workspace Path**: `c:\Users\suman\Documents\GitHub\AADC`
* **Hostinger Destination Directory**: `domains/academic.auaicoe.in/public_html/` *(Note: This is a subdomain, so it is located under the `domains` directory rather than the root `public_html`).*

---

## 2. CI/CD Deployment Setup
We set up a GitHub Actions workflow to automate deployment on every `git push` using FTPS.

* **Workflow File**: `.github/workflows/deploy.yml`
* **Protocol**: FTPS (FTP over SSL/TLS)
* **Hostinger FTPS Port**: `21`

### GitHub Secrets to Configure:
You must add these secrets in your GitHub repository under **Settings > Secrets and variables > Actions**:
1. **`FTP_SERVER`**: `82.25.122.249`
2. **`FTP_USERNAME`**: `u121931420`
3. **`FTP_PASSWORD`**: *(Your Hostinger SSH/SFTP password)*

---

## 3. GitHub Actions Workflow Code
Here is the code saved in [.github/workflows/deploy.yml](file:///c:/Users/suman/Documents/GitHub/AADC/.github/workflows/deploy.yml):

```yaml
name: Deploy Static Website to Hostinger

on:
  push:
    branches:
      - main # Triggers the deployment on pushes to the main branch

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # Step 1: Checkout the code from GitHub repository
      - name: 🚚 Checkout code
        uses: actions/checkout@v4

      # Step 2: Deploy to Hostinger via FTP
      - name: 🚀 FTP Deploy
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps
          port: 21
          # Hostinger's subdirectory for this domain
          server-dir: domains/academic.auaicoe.in/public_html/
          # Exclude git config, workflows, and markdown docs from being uploaded to production
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            .github/**
            README.md
```

---

## 4. Next Steps & Git Troubleshooting
* **Issue**: The `git` command line tool was not found on your system.
* **Workarounds**:
  * **Option A**: Download and install Git from [git-scm.com/download/win](https://git-scm.com/download/win), restart your terminal/editor, and run the commands:
    ```bash
    git add .github/workflows/deploy.yml
    git commit -m "Add GitHub Actions deployment workflow"
    git push origin main
    ```
  * **Option B**: Manually upload this workflow on GitHub in your browser:
    1. Go to your GitHub repository -> **Add file** -> **Create new file**.
    2. Name it `.github/workflows/deploy.yml`.
    3. Paste the YAML code above and click **Commit changes...**.
