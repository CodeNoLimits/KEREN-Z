# ✅ CHECKLIST DÉPLOIEMENT RENDER - KEREN-Z

**Utilise cette checklist pour suivre ton déploiement étape par étape**

---

## 📋 AVANT DE COMMENCER

- [ ] Compte Render créé: https://dashboard.render.com
- [ ] Accès au repo GitHub: https://github.com/CodeNoLimits/KEREN-Z
- [ ] Git push réussi (code sur GitHub)

---

## 🔐 ÉTAPE 1: PRÉPARER LES CLÉS API

### Supabase
- [ ] Projet Supabase créé: https://supabase.com
- [ ] `SUPABASE_URL` copié
- [ ] `SUPABASE_SERVICE_KEY` (service_role) copié ⚠️
- [ ] `VITE_SUPABASE_ANON_KEY` copié

### Stripe
- [ ] Compte Stripe actif: https://dashboard.stripe.com
- [ ] Mode (Test / Live) choisi
- [ ] `STRIPE_SECRET_KEY` copié ⚠️
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` copié

### SendGrid (optionnel)
- [ ] Compte SendGrid créé
- [ ] `SENDGRID_API_KEY` copié ⚠️

---

## 🚀 ÉTAPE 2: DÉPLOYER SUR RENDER

### Créer le Service
- [ ] Dashboard Render ouvert
- [ ] "New +" → "Blueprint" cliqué
- [ ] GitHub connecté
- [ ] Repo `CodeNoLimits/KEREN-Z` sélectionné
- [ ] Blueprint détecté (`render.yaml`)
- [ ] "Apply" cliqué
- [ ] Service `keren-z-api` créé

### Premier Build
- [ ] Build lancé automatiquement
- [ ] Logs surveillés (onglet "Logs")
- [ ] Build réussi ✅
- [ ] Message vu: `🚀 Server running on 0.0.0.0:10000`

---

## ⚙️ ÉTAPE 3: CONFIGURER LES VARIABLES

### Dans Render → Environment
- [ ] `SUPABASE_URL` ajouté
- [ ] `SUPABASE_SERVICE_KEY` ajouté ⚠️
- [ ] `VITE_SUPABASE_URL` ajouté
- [ ] `VITE_SUPABASE_ANON_KEY` ajouté
- [ ] `STRIPE_SECRET_KEY` ajouté ⚠️
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` ajouté
- [ ] `SENDGRID_API_KEY` ajouté (si utilisé) ⚠️
- [ ] `FRONTEND_URL` ajouté (URL Netlify)
- [ ] "Save Changes" cliqué
- [ ] Redéploiement automatique attendu

---

## 🧪 ÉTAPE 4: TESTER LE DÉPLOIEMENT

### URL du Service
- [ ] URL obtenue: `https://keren-z-api.onrender.com`

### Tests de Base
```bash
# Health Check
curl https://keren-z-api.onrender.com/api/health
```
- [ ] Réponse 200 OK
- [ ] JSON valide reçu: `{"status":"ok"}`

### Tests Avancés
- [ ] Test CORS avec origin Netlify
- [ ] Test connexion Supabase (si endpoint existe)
- [ ] Logs propres sans erreurs

---

## 🔧 ÉTAPE 5: POST-DÉPLOIEMENT

### Stripe Webhook
- [ ] Dashboard Stripe → Developers → Webhooks
- [ ] Endpoint ajouté: `https://keren-z-api.onrender.com/api/webhooks/stripe`
- [ ] Événements sélectionnés:
  - [ ] payment_intent.succeeded
  - [ ] payment_intent.payment_failed
- [ ] Webhook secret copié (whsec_xxx) ⚠️
- [ ] `STRIPE_WEBHOOK_SECRET` ajouté dans Render
- [ ] Service redéployé
- [ ] Test webhook envoyé depuis Stripe
- [ ] Webhook reçu dans logs Render ✅

### Netlify Frontend
- [ ] `VITE_API_URL` ajouté/mis à jour dans Netlify
- [ ] Valeur: `https://keren-z-api.onrender.com`
- [ ] Frontend redéployé
- [ ] Requêtes API fonctionnent depuis le frontend

---

## 🗄️ ÉTAPE 6: BASE DE DONNÉES

### Tables Supabase
- [ ] SQL Editor ouvert dans Supabase
- [ ] Table `donations` créée
- [ ] Table `lottery_participants` créée
- [ ] Table `subscriptions` créée
- [ ] Index créés
- [ ] RLS (Row Level Security) activé
- [ ] Policies configurées

---

## ✅ VALIDATION FINALE

### Backend
- [ ] Service status: **Live** ✅
- [ ] Health check: **OK** ✅
- [ ] Logs: **Propres** ✅
- [ ] Variables env: **Toutes configurées** ✅

### Intégrations
- [ ] Supabase: **Connecté** ✅
- [ ] Stripe: **Configuré** ✅
- [ ] Stripe Webhook: **Actif** ✅
- [ ] SendGrid: **Configuré** ✅ (si utilisé)
- [ ] CORS: **Fonctionnel** ✅

### Tests Production
- [ ] Donation test réussie
- [ ] Email de confirmation reçu
- [ ] Données enregistrées dans Supabase
- [ ] Webhook Stripe déclenché

---

## 🎉 DÉPLOIEMENT TERMINÉ !

**Si tous les points ci-dessus sont cochés, ton backend est LIVE ! 🚀**

### URLs Finales
- ✅ Backend: https://keren-z-api.onrender.com
- ✅ Frontend: https://keren-z.netlify.app
- ✅ GitHub: https://github.com/CodeNoLimits/KEREN-Z

### Prochaines Étapes
- [ ] Monitoring configuré
- [ ] Alertes email activées
- [ ] Backup base de données configuré
- [ ] Tests de charge effectués
- [ ] Documentation utilisateur créée
- [ ] Marketing et lancement 🎊

---

## 📞 BESOIN D'AIDE ?

- 📖 Guide complet: `RENDER_DEPLOYMENT_COMPLETE.md`
- 🐛 Issues: https://github.com/CodeNoLimits/KEREN-Z/issues
- 📚 Render Docs: https://render.com/docs

---

*Checklist KEREN-Z - Claude Code*
*Date: 2025-11-06*
