# 🚀 GUIDE COMPLET DE DÉPLOIEMENT RENDER - KEREN-Z

**Backend API Express + TypeScript + Supabase**

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#prérequis)
2. [Étape 1: Créer le Service Render](#étape-1-créer-le-service-render)
3. [Étape 2: Obtenir les Clés API](#étape-2-obtenir-les-clés-api)
4. [Étape 3: Configurer les Variables d'Environnement](#étape-3-configurer-les-variables-denvironnement)
5. [Étape 4: Déploiement et Tests](#étape-4-déploiement-et-tests)
6. [Étape 5: Configuration Post-Déploiement](#étape-5-configuration-post-déploiement)
7. [Dépannage](#dépannage)
8. [Monitoring et Maintenance](#monitoring-et-maintenance)

---

## ✅ PRÉREQUIS

Avant de commencer, assure-toi d'avoir:

- [ ] Compte GitHub avec accès au repo `CodeNoLimits/KEREN-Z`
- [ ] Compte Render.com (gratuit): https://dashboard.render.com
- [ ] Compte Supabase (gratuit): https://supabase.com
- [ ] Compte Stripe: https://dashboard.stripe.com
- [ ] (Optionnel) Compte SendGrid pour les emails

---

## 📦 ÉTAPE 1: CRÉER LE SERVICE RENDER

### 1.1 Connexion et Blueprint

1. **Aller sur Render Dashboard**
   ```
   https://dashboard.render.com
   ```

2. **Créer un nouveau service**
   - Cliquer sur **"New +"** (en haut à droite)
   - Sélectionner **"Blueprint"**

3. **Connecter GitHub**
   - Cliquer "Connect account" si pas déjà fait
   - Autoriser Render à accéder à tes repos

4. **Sélectionner le Repository**
   - Chercher: `CodeNoLimits/KEREN-Z`
   - Cliquer "Connect"

5. **Render détecte render.yaml**
   - Render va automatiquement détecter le fichier `render.yaml`
   - Tu verras: "Blueprint detected: keren-z-api"
   - Cliquer **"Apply"**

### 1.2 Configuration Initiale

Render va créer le service avec:
- **Nom:** keren-z-api
- **Région:** Frankfurt (Europe)
- **Plan:** Free
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:render`

⏳ **Le premier build va commencer automatiquement** (5-10 minutes)

---

## 🔑 ÉTAPE 2: OBTENIR LES CLÉS API

Pendant que Render build, prépare tes clés API :

### 2.1 Supabase

1. **Créer un projet Supabase**
   ```
   https://supabase.com/dashboard
   ```
   - Cliquer "New project"
   - Nom: `keren-z-db` (ou autre)
   - Database password: ⚠️ **NOTER CE MOT DE PASSE**
   - Région: Europe West (Frankfurt)
   - Cliquer "Create new project"

2. **Obtenir les clés**
   - Aller dans **Settings** (⚙️ icône)
   - Cliquer **API**

   **Copier ces 4 valeurs:**
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGci...
   service_role key: eyJhbGci...  ⚠️ SECRET - Ne jamais exposer
   ```

3. **Créer les tables (optionnel maintenant, requis plus tard)**
   - Voir section "Configuration Base de Données" ci-dessous

### 2.2 Stripe

1. **Dashboard Stripe**
   ```
   https://dashboard.stripe.com
   ```

2. **Mode Test (pour commencer)**
   - En haut à droite, s'assurer d'être en "Test mode"
   - Pour production, basculer en "Live mode" plus tard

3. **Obtenir les clés**
   - Aller dans **Developers** → **API keys**

   **Copier:**
   ```
   Publishable key: pk_test_xxx
   Secret key: sk_test_xxx  ⚠️ SECRET
   ```

4. **Créer webhook (à faire après déploiement Render)**
   - Attendre d'avoir l'URL Render
   - Voir section "Configuration Post-Déploiement"

### 2.3 SendGrid (Optionnel mais recommandé)

1. **Créer compte**
   ```
   https://sendgrid.com
   ```

2. **Créer API Key**
   - Settings → API Keys
   - Cliquer "Create API Key"
   - Nom: `keren-z-api`
   - Permission: **Full Access**
   - Cliquer "Create & View"

   **Copier la clé:** `SG.xxx` ⚠️ **Secret - Ne sera affiché qu'une fois!**

---

## ⚙️ ÉTAPE 3: CONFIGURER LES VARIABLES D'ENVIRONNEMENT

### 3.1 Retourner sur Render Dashboard

1. Aller sur ton service: `keren-z-api`
2. Cliquer sur l'onglet **"Environment"** dans le menu gauche

### 3.2 Ajouter les Variables (Une par une)

Cliquer **"Add Environment Variable"** et ajouter:

#### 📌 Variables Supabase (OBLIGATOIRES)

```bash
# 1. URL du projet Supabase
Key: SUPABASE_URL
Value: https://xxxxx.supabase.co

# 2. Service Role Key (backend)
Key: SUPABASE_SERVICE_KEY
Value: eyJhbGci... (service_role key)

# 3. URL publique pour le frontend
Key: VITE_SUPABASE_URL
Value: https://xxxxx.supabase.co

# 4. Anon key publique
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGci... (anon public key)
```

#### 💳 Variables Stripe (OBLIGATOIRES)

```bash
# 5. Secret key backend
Key: STRIPE_SECRET_KEY
Value: sk_test_xxx (ou sk_live_xxx en production)

# 6. Webhook secret (à ajouter après création webhook)
Key: STRIPE_WEBHOOK_SECRET
Value: whsec_xxx (vide pour l'instant)

# 7. Publishable key frontend
Key: VITE_STRIPE_PUBLISHABLE_KEY
Value: pk_test_xxx (ou pk_live_xxx)
```

#### 📧 Variables SendGrid (RECOMMANDÉ)

```bash
# 8. API Key SendGrid
Key: SENDGRID_API_KEY
Value: SG.xxx
```

#### 🌐 Variables Frontend (OBLIGATOIRES)

```bash
# 9. URL du frontend Netlify (ajuster après déploiement Netlify)
Key: FRONTEND_URL
Value: https://keren-z.netlify.app
```

#### 🤖 Variables AI (OPTIONNELLES)

```bash
# 10. OpenAI (si utilisé)
Key: OPENAI_API_KEY
Value: sk-xxx

# 11. Gemini (si utilisé)
Key: GEMINI_API_KEY
Value: AIza...
```

### 3.3 Sauvegarder

- Cliquer **"Save Changes"** en bas
- ⚠️ Render va **redéployer automatiquement** le service

---

## 🧪 ÉTAPE 4: DÉPLOIEMENT ET TESTS

### 4.1 Surveiller le Build

1. Aller dans l'onglet **"Logs"**
2. Surveiller le build en temps réel
3. Attendre le message: `🚀 Server running on 0.0.0.0:10000`

**Durée:** 5-10 minutes pour le premier déploiement

### 4.2 Obtenir l'URL du Service

Une fois déployé, l'URL sera:
```
https://keren-z-api.onrender.com
```

Tu peux la trouver en haut de la page du service.

### 4.3 Tester le Health Check

```bash
curl https://keren-z-api.onrender.com/api/health
```

**Réponse attendue:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-06T18:00:00.000Z"
}
```

✅ **Si ça marche, le backend est opérationnel !**

### 4.4 Tests Supplémentaires

```bash
# Test CORS
curl -H "Origin: https://keren-z.netlify.app" \
     https://keren-z-api.onrender.com/api/health

# Test connexion Supabase (si endpoint existe)
curl https://keren-z-api.onrender.com/api/test-db

# Test Stripe (si endpoint existe)
curl https://keren-z-api.onrender.com/api/test-stripe
```

---

## 🔧 ÉTAPE 5: CONFIGURATION POST-DÉPLOIEMENT

### 5.1 Configurer Stripe Webhook

1. **Dashboard Stripe**
   ```
   https://dashboard.stripe.com
   ```

2. **Créer Webhook**
   - Developers → Webhooks
   - Cliquer "Add endpoint"

   **Configuration:**
   ```
   Endpoint URL: https://keren-z-api.onrender.com/api/webhooks/stripe
   Description: KEREN-Z Payment Webhook
   ```

3. **Sélectionner Événements**
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - charge.refunded (optionnel)

4. **Copier Webhook Secret**
   - Après création, copier le **Signing secret** (whsec_xxx)

5. **Ajouter dans Render**
   - Retourner sur Render Dashboard
   - Environment → Add Variable
   ```
   Key: STRIPE_WEBHOOK_SECRET
   Value: whsec_xxx
   ```
   - Save → Service va redéployer

### 5.2 Mettre à Jour Netlify

1. **Dashboard Netlify**
   ```
   https://app.netlify.com
   ```

2. **Site Settings → Environment Variables**

3. **Ajouter/Mettre à jour:**
   ```
   Key: VITE_API_URL
   Value: https://keren-z-api.onrender.com
   ```

4. **Redéployer Netlify**
   - Deploys → Trigger deploy

### 5.3 Configuration CORS (si nécessaire)

Si tu as des erreurs CORS, vérifie:
1. `FRONTEND_URL` dans Render = URL exacte Netlify
2. Pas de trailing slash (/)
3. Protocole HTTPS

---

## 🗄️ CONFIGURATION BASE DE DONNÉES SUPABASE

### Tables à Créer

1. **Supabase Dashboard**
   - Aller dans **SQL Editor**

2. **Exécuter ce SQL:**

```sql
-- Table des donations
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ILS',
  donor_name VARCHAR(255),
  donor_email VARCHAR(255),
  donor_phone VARCHAR(50),
  message TEXT,
  stripe_payment_id VARCHAR(255) UNIQUE,
  stripe_payment_intent_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des participants à la loterie
CREATE TABLE IF NOT EXISTS lottery_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID REFERENCES donations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  tickets INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des subscriptions newsletter
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'active'
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_lottery_donation ON lottery_participants(donation_id);

-- Fonction de mise à jour automatique du timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour donations
CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

3. **Row Level Security (RLS)**

```sql
-- Activer RLS
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lottery_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies (accès public en lecture, backend en écriture)
CREATE POLICY "Donations publiques en lecture"
  ON donations FOR SELECT
  USING (true);

CREATE POLICY "Donations backend écriture"
  ON donations FOR ALL
  USING (auth.role() = 'service_role');

-- Répéter pour les autres tables...
```

---

## 🔍 DÉPANNAGE

### ❌ Build Failed

**Symptômes:** Build échoue avec erreurs

**Solutions:**
1. Vérifier les logs dans Render → Logs
2. Tester localement:
   ```bash
   cd ~/Desktop/KEREN-Z
   npm install
   npm run build
   ```
3. Vérifier Node version (doit être 20)
4. Vérifier que toutes les dépendances sont dans package.json

### ❌ Service Won't Start

**Symptômes:** Build réussit mais service ne démarre pas

**Solutions:**
1. Vérifier les logs de démarrage
2. Vérifier que TOUTES les variables d'environnement obligatoires sont définies
3. Tester le health check endpoint
4. Vérifier que le port 10000 est utilisé (variable PORT)

### ❌ Database Connection Failed

**Symptômes:** Erreurs de connexion Supabase

**Solutions:**
1. Vérifier `SUPABASE_URL` (format: https://xxx.supabase.co)
2. Vérifier `SUPABASE_SERVICE_KEY` (commence par eyJ...)
3. Tester la connexion depuis un outil externe
4. Vérifier que les tables existent

### ❌ CORS Errors

**Symptômes:** Requêtes bloquées par CORS depuis le frontend

**Solutions:**
1. Vérifier que `FRONTEND_URL` = URL exacte Netlify
2. Pas de trailing slash: ✅ `.netlify.app` ❌ `.netlify.app/`
3. Vérifier que le serveur inclut les headers CORS
4. Redéployer après changement

### ❌ Stripe Webhook Errors

**Symptômes:** Paiements réussis mais pas enregistrés

**Solutions:**
1. Vérifier `STRIPE_WEBHOOK_SECRET` dans Render
2. Vérifier URL webhook dans Stripe = exactement celle de Render
3. Tester le webhook dans Stripe Dashboard → Webhooks → Send test event
4. Vérifier les logs Render pour voir les requêtes webhook

### ⚠️ Cold Starts (Plan Gratuit)

**Symptômes:** Première requête très lente (30 secondes)

**Explication:** Le plan gratuit de Render met le service en veille après inactivité

**Solutions:**
- Upgrader vers plan payant ($7/mois) pour éviter les cold starts
- Utiliser un service de ping (UptimeRobot) pour garder le service actif
- Prévenir les utilisateurs qu'il peut y avoir un délai initial

---

## 📊 MONITORING & MAINTENANCE

### Logs

1. **Dashboard Render → Service → Logs**
2. Voir les logs en temps réel
3. Filtrer par niveau (error, warn, info)

### Metrics

1. **Dashboard Render → Service → Metrics**
2. Voir:
   - CPU usage
   - RAM usage
   - Response time
   - Request count

### Health Check

- Render vérifie `/api/health` toutes les 30 secondes
- Si 3 échecs consécutifs → Alerte email
- Service redémarre automatiquement si crash

### Alertes

1. **Configurer dans Render**
2. Notifications par email si:
   - Service down
   - Build failed
   - High CPU/RAM
   - Déploiement réussi/échoué

---

## ✅ CHECKLIST FINALE

Avant de considérer le déploiement terminé:

### Backend (Render)
- [ ] Service créé via Blueprint
- [ ] Build réussi sans erreurs
- [ ] Service démarré (statut: Live)
- [ ] Health check répond: `/api/health` → 200 OK
- [ ] Toutes les variables d'environnement configurées
- [ ] Logs propres sans erreurs critiques

### Intégrations
- [ ] Supabase connecté et tables créées
- [ ] Stripe webhook configuré et testé
- [ ] SendGrid configuré (si utilisé)
- [ ] CORS configuré avec URL frontend

### Tests
- [ ] Health check fonctionne
- [ ] Connexion DB fonctionne
- [ ] Endpoint de test Stripe fonctionne
- [ ] Webhook Stripe reçu correctement

### Frontend (Netlify)
- [ ] `VITE_API_URL` pointe vers Render
- [ ] CORS pas d'erreurs
- [ ] Requêtes API fonctionnent

---

## 🎉 FÉLICITATIONS !

Si tous les points ci-dessus sont ✅, ton backend KEREN-Z est **LIVE en production** !

**URLs finales:**
- Backend API: https://keren-z-api.onrender.com
- Frontend: https://keren-z.netlify.app (après déploiement)
- GitHub: https://github.com/CodeNoLimits/KEREN-Z

---

## 📞 SUPPORT

**Problèmes:**
- Issues GitHub: https://github.com/CodeNoLimits/KEREN-Z/issues
- Render Support: https://render.com/docs
- Supabase Docs: https://supabase.com/docs

---

*Guide créé par Claude Code - KEREN-Z Project*
*Dernière mise à jour: 2025-11-06*
