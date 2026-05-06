#!/bin/bash
# Auto-deploy ke GitHub
# Usage: ./deploy.sh "github_username" "repo_name" "github_token"

set -e

USERNAME="rizkyfachri111"
REPO="apotek-tangerang"
PROJECT_DIR="/home/ubuntu/web3-pharmacy"

echo "🚀 Deploying Web3 Pharmacy ke GitHub Pages..."

cd $PROJECT_DIR

# Setup git
git init
git config user.name "Deploy Bot"
git config user.email "deploy@bot.com"

# Create repo URL (requires token)
echo ""
echo "📋 Langkah manual (karena butuh authentication):"
echo ""
echo "1. Buka: https://github.com/new"
echo "2. Buat repo: $USERNAME/$REPO (public)"
echo "3. Jalankan perintah ini:"
echo ""
echo "git remote add origin https://github.com/$USERNAME/$REPO.git"
echo "git add ."
echo "git commit -m 'Deploy Web3 Pharmacy'"
echo "git push -u origin main"
echo ""
echo "4. Settings -> Pages -> Source: / (root) -> Save"
echo ""
echo "✅ URL akhir: https://$USERNAME.github.io/$REPO/"