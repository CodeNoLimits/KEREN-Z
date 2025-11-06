# 🚀 GUIDE DE DÉPLOIEMENT KEREN-Z

## 📋 Vue d'ensemble

Ce guide décrit comment déployer KEREN-Z sur:
- **Frontend:** Netlify
- **Backend:** Render
- **Database:** Supabase

---

## 1️⃣ DÉPLOIEMENT NETLIFY (Frontend)

### Méthode automatique (recommandée)

```bash
# 1. Installer Netlify CLI si pas déjà fait
npm install -g netlify-cli

# 2. Se connecter à Netlify
netlify login

# 3. Depuis le dossier KEREN-Z, déployer
cd /Users/codenolimits-dreamai-nanach/Desktop/KEREN-Z
netlify deploy --prod --dir=client/dist
```

### Configuration Netlify UI

1. Aller sur https://app.netlify.com
2. Cliquer "Add new site" → "Import an existing project"
3. Connecter GitHub et sélectionner `CodeNoLimits/KEREN-Z`
4. Configuration:
   - **Base directory:** `client`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `client/dist`
   - **Node version:** 18

### Variables d'environnement Netlify

Ajouter dans Settings → Environment variables:

```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
VITE_API_URL=https://keren-z-api.onrender.com
```

---

## 2️⃣ DÉPLOIEMENT RENDER (Backend)

### Méthode automatique via render.yaml

Le fichier `render.yaml` à la racine configure automatiquement:
- Service web Node.js
- Port 10000
- Build command: `cd server && npm install`
- Start command: `cd server && node index.js`

### Étapes:

1. Aller sur https://dashboard.render.com
2. Cliquer "New +" → "Blueprint"
3. Connecter GitHub repository `CodeNoLimits/KEREN-Z`
4. Render détectera automatiquement `render.yaml`
5. Cliquer "Apply"

### Variables d'environnement Render

Ajouter dans le dashboard Render:

```
NODE_ENV=production
PORT=10000
SUPABASE_URL=votre_url_supabase
SUPABASE_SERVICE_KEY=votre_service_key
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
EMAIL_SERVICE_API_KEY=votre_api_key
FRONTEND_URL=https://votre-site.netlify.app
```

---

## 3️⃣ CONFIGURATION SUPABASE

### Créer le projet Supabase

1. Aller sur https://supabase.com
2. Créer nouveau projet
3. Copier:
   - URL du projet
   - Anon key (publique)
   - Service key (privée - backend uniquement)

### Tables à créer

```sql
-- Donations
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ILS',
  donor_name VARCHAR(255),
  donor_email VARCHAR(255),
  message TEXT,
  stripe_payment_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lottery participants
CREATE TABLE lottery_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donation_id UUID REFERENCES donations(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  tickets INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT NOW()
);
```

---

## 4️⃣ CONFIGURATION STRIPE

### Obtenir les clés

1. Aller sur https://dashboard.stripe.com
2. Mode Live (production)
3. Copier:
   - Publishable key (pk_live_xxx) → Frontend
   - Secret key (sk_live_xxx) → Backend

### Webhook Stripe → Render

1. Dashboard Stripe → Developers → Webhooks
2. Add endpoint: `https://keren-z-api.onrender.com/api/webhooks/stripe`
3. Sélectionner événements:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copier le Webhook secret → STRIPE_WEBHOOK_SECRET

---

## 5️⃣ TESTER LES DÉPLOIEMENTS

### Frontend (Netlify)

```bash
curl https://votre-site.netlify.app
# Devrait retourner la page HTML
```

### Backend (Render)

```bash
curl https://keren-z-api.onrender.com/api/health
# Devrait retourner: {"status":"ok"}
```

### Test end-to-end

1. Ouvrir le site Netlify
2. Essayer de faire un don test (mode Stripe test)
3. Vérifier dans Supabase que la donation apparaît
4. Vérifier webhook Stripe dans logs Render

---

## 6️⃣ URLS FINALES

Après déploiement, noter les URLs:

- **Frontend:** https://[nom-site].netlify.app
- **Backend:** https://keren-z-api.onrender.com
- **GitHub:** https://github.com/CodeNoLimits/KEREN-Z
- **Supabase:** https://[project].supabase.co

**Mettre à jour CURSOR_SYNC.md avec ces URLs !**

---

## 🔧 DÉPANNAGE

### Frontend ne charge pas

- Vérifier build logs Netlify
- Vérifier que `client/dist` existe après build
- Tester build local: `cd client && npm run build`

### Backend ne démarre pas

- Vérifier logs Render
- Vérifier variables d'environnement
- Tester local: `cd server && node index.js`

### Erreurs CORS

Ajouter dans `server/index.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://votre-site.netlify.app'
}));
```

### Base de données non accessible

- Vérifier URL Supabase
- Vérifier Row Level Security (RLS) policies
- Tester connexion avec service key

---

## 📱 SURVEILLANCE

### Netlify

- Dashboard → Site → Analytics
- Logs de build et deploy
- Bandwidth et requêtes

### Render

- Dashboard → Service → Logs
- Metrics (CPU, RAM)
- Uptime monitoring

### Supabase

- Dashboard → Database → Tables
- API logs
- Storage usage

---

## 🚀 PRÊT POUR PRODUCTION

Une fois tous les services déployés et testés:

1. ✅ Frontend accessible
2. ✅ Backend répond aux requêtes
3. ✅ Database connectée
4. ✅ Paiements Stripe fonctionnent
5. ✅ Emails de confirmation envoyés
6. ✅ Logs et monitoring actifs

**Le site est LIVE ! 🎉**

---

*Guide généré par Claude Code - KEREN-Z Project*
*Dernière mise à jour: 2025-11-06*
