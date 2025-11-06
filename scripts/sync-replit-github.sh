#!/bin/bash
# 🔄 Sync Replit ↔ GitHub
# Usage: ./sync-replit-github.sh [branch-name]

set -e

BRANCH=${1:-KEREN_5.5.5_CURSOR}
REPO_URL="https://github.com/CodeNoLimits/keren-david-centralized.git"

echo "🔄 Syncing Replit ↔ GitHub..."
echo "📍 Branch: $BRANCH"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "📦 Initializing git repository..."
  git init
  git remote add origin $REPO_URL 2>/dev/null || git remote set-url origin $REPO_URL
fi

# Check remote
echo "🔍 Checking remote..."
git remote -v

# Fetch latest from GitHub
echo ""
echo "📥 Pulling from GitHub..."
git fetch origin

# Check if branch exists locally
if git show-ref --verify --quiet refs/heads/$BRANCH; then
  echo "✅ Branch $BRANCH exists locally"
  git checkout $BRANCH
else
  echo "🌿 Creating local branch $BRANCH from origin"
  git checkout -b $BRANCH origin/$BRANCH 2>/dev/null || git checkout -b $BRANCH
fi

# Pull latest changes
echo ""
echo "📥 Pulling latest changes..."
git pull origin $BRANCH || echo "⚠️ No remote branch found, will push as new"

# Check for local changes
if [ -n "$(git status --porcelain)" ]; then
  echo ""
  echo "📝 Local changes detected:"
  git status --short
  
  echo ""
  read -p "Commit and push local changes? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    git commit -m "Sync from Replit $(date '+%Y-%m-%d %H:%M:%S')" || echo "Nothing to commit"
    
    echo ""
    echo "📤 Pushing to GitHub..."
    git push origin $BRANCH || echo "⚠️ Push failed, check credentials"
  fi
else
  echo ""
  echo "✅ No local changes to commit"
fi

echo ""
echo "✅ Sync complete!"
echo ""
echo "📊 Current status:"
git status --short
git log --oneline -5

