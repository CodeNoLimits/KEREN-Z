# 🎯 INSTRUCTIONS CURSOR - COORDINATION AVEC CLAUDE CODE

## ⚠️ RÈGLES OBLIGATOIRES POUR KEREN-Z

### 1. TOUJOURS travailler sur une branche séparée
- Nom recommandé: `cursor-dev` ou `cursor-[feature]`
- JAMAIS directement sur main après l'initialisation
- Commande: `git checkout -b cursor-dev`

### 2. AVANT TOUTE MODIFICATION:
- ✅ Exécuter `git status` pour voir l'état actuel
- ✅ Vérifier fichier `CURSOR_SYNC.md` à la racine
- ✅ Checker si Claude Code travaille sur même fichier
- ✅ Pull latest changes: `git pull origin main`

### 3. COMMITS:
- Préfixer avec **🖱️ Cursor:**
- Être descriptif et clair
- Commiter fréquemment (petits commits)
- Exemple: `git commit -m "🖱️ Cursor: Fix responsive design on homepage"`

### 4. FICHIERS SENSIBLES:
- `.env` - NE JAMAIS commiter
- `CURSOR_SYNC.md` - Lire avant modifications
- Si modification détectée par Claude → STOP et alerter utilisateur

### 5. STRUCTURE DU PROJET:

```
KEREN-Z/
├── client/                    # Frontend React/Vite
│   ├── src/
│   │   ├── components/       # Composants React
│   │   ├── pages/            # Pages principales
│   │   ├── lib/              # Utilitaires
│   │   └── App.jsx           # Point d'entrée
│   └── package.json
│
├── server/                    # Backend Express
│   ├── routes/               # Routes API
│   ├── services/             # Services métier
│   └── index.js              # Point d'entrée serveur
│
└── attached_assets/          # Images et assets
```

### 6. WORKFLOW DE DÉVELOPPEMENT:

```bash
# 1. Créer/basculer sur branche dev
git checkout -b cursor-dev

# 2. Faire modifications
[votre travail ici]

# 3. Vérifier changements
git status
git diff

# 4. Commiter
git add .
git commit -m "🖱️ Cursor: [description claire]"

# 5. Push vers remote
git push origin cursor-dev

# 6. Créer PR sur GitHub (ne pas merger directement)
gh pr create --title "Feature: [nom]" --body "Description..."
```

### 7. MERGE FINAL:
- Laisser l'utilisateur ou Claude gérer le merge dans main
- NE PAS push directement sur main
- Toujours passer par Pull Request

## 📁 FICHIER DE COORDINATION
Consulter `CURSOR_SYNC.md` en permanence pour voir l'état actuel.

## 🔗 URLs du projet
- **GitHub:** https://github.com/CodeNoLimits/KEREN-Z
- **Netlify:** (voir CURSOR_SYNC.md)
- **Render:** (voir CURSOR_SYNC.md)

## 🚨 EN CAS DE CONFLIT

1. STOP immédiatement les modifications
2. Alerter l'utilisateur
3. Vérifier CURSOR_SYNC.md pour état actuel
4. Attendre instructions avant continuer

---

**RAPPEL:** Ce projet est initialisé par Claude Code.
Cursor doit travailler en coordination pour éviter les conflits.

*Configuration générée par Claude Code - KEREN-Z Project*
