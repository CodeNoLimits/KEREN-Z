#!/usr/bin/env python3
"""
Analyseur d'Audit SEO pour Haesh Sheli
Génère un rapport détaillé à partir des données d'audit Playwright
"""

import json
from datetime import datetime
from collections import defaultdict

# Données d'audit collectées (sera rempli dynamiquement)
AUDIT_DATA = []

def analyze_meta_tags(page_data):
    """Analyse les balises meta d'une page"""
    issues = []
    score = 100

    meta_tags = {tag['name']: tag['content'] for tag in page_data.get('metaTags', [])}

    # Vérifier la présence des meta tags essentiels
    if 'description' not in meta_tags:
        issues.append('P0: Meta description manquante')
        score -= 20
    elif len(meta_tags.get('description', '')) < 50:
        issues.append('P1: Meta description trop courte (< 50 caractères)')
        score -= 10
    elif len(meta_tags.get('description', '')) > 160:
        issues.append('P2: Meta description trop longue (> 160 caractères)')
        score -= 5

    if 'keywords' not in meta_tags:
        issues.append('P2: Meta keywords manquant')
        score -= 5

    # Vérifier Open Graph
    og_tags = page_data.get('openGraph', {})
    if not og_tags or 'og:title' not in og_tags:
        issues.append('P1: Balises Open Graph manquantes ou incomplètes')
        score -= 15

    # Vérifier Twitter Card
    twitter_tags = page_data.get('twitterCard', {})
    if not twitter_tags or 'twitter:card' not in twitter_tags:
        issues.append('P1: Balises Twitter Card manquantes')
        score -= 10

    # Vérifier robots
    if not page_data.get('robots'):
        issues.append('P2: Meta robots non défini')
        score -= 5

    return score, issues

def analyze_headings(page_data):
    """Analyse la hiérarchie des titres"""
    issues = []
    score = 100

    headings = page_data.get('headings', {})
    h1_count = len(headings.get('h1', []))

    if h1_count == 0:
        issues.append('P0: Aucun H1 trouvé sur la page')
        score -= 30
    elif h1_count > 1:
        issues.append('P1: Multiple H1 trouvés ({} H1)'.format(h1_count))
        score -= 15

    # Vérifier la hiérarchie
    if headings.get('h3') and not headings.get('h2'):
        issues.append('P2: Hiérarchie des titres incorrecte (H3 sans H2)')
        score -= 10

    if headings.get('h4') and not headings.get('h3'):
        issues.append('P2: Hiérarchie des titres incorrecte (H4 sans H3)')
        score -= 10

    return score, issues

def analyze_images(page_data):
    """Analyse les images et leurs attributs alt"""
    issues = []
    score = 100

    images = page_data.get('images', [])
    images_without_alt = [img for img in images if not img.get('alt')]

    if images_without_alt:
        count = len(images_without_alt)
        issues.append('P0: {} image(s) sans attribut alt'.format(count))
        score -= min(50, count * 5)

    # Vérifier le lazy loading
    images_without_lazy = [img for img in images if img.get('loading') != 'lazy']
    if len(images_without_lazy) > 3:
        issues.append('P2: {} images sans lazy loading'.format(len(images_without_lazy)))
        score -= 10

    return score, issues

def analyze_links(page_data):
    """Analyse les liens internes et externes"""
    issues = []
    score = 100

    internal_links = page_data.get('links', {}).get('internal', [])
    external_links = page_data.get('links', {}).get('external', [])

    # Vérifier les liens sans texte
    empty_links = [link for link in internal_links + external_links if not link.get('text') or link.get('text').strip() == '']
    if empty_links:
        issues.append('P1: {} lien(s) sans texte'.format(len(empty_links)))
        score -= min(20, len(empty_links) * 5)

    # Vérifier les liens externes sans attributs de sécurité
    for link in external_links:
        if 'wa.me' in link.get('href', ''):
            # WhatsApp links are OK
            continue

    return score, issues

def analyze_seo_technical(page_data):
    """Analyse technique SEO"""
    issues = []
    score = 100

    # Canonical URL
    if not page_data.get('canonicalUrl'):
        issues.append('P1: URL canonique manquante')
        score -= 15

    # Hreflang tags
    if not page_data.get('hreflangTags'):
        issues.append('P1: Balises hreflang manquantes (site multilingue)')
        score -= 20

    # Schema.org
    if not page_data.get('schemaOrg'):
        issues.append('P2: Données structurées Schema.org manquantes')
        score -= 10

    # Title
    title = page_data.get('title', '')
    if not title:
        issues.append('P0: Title manquant')
        score -= 30
    elif len(title) < 30:
        issues.append('P1: Title trop court (< 30 caractères)')
        score -= 15
    elif len(title) > 280:
        issues.append('P1: Title trop long (> 280 caractères)')
        score -= 15

    return score, issues

def generate_page_report(page_name, page_data):
    """Génère un rapport pour une page"""
    report = {
        'name': page_name,
        'url': page_data.get('url', 'N/A'),
        'scores': {},
        'issues': [],
        'total_score': 0
    }

    # Analyser chaque catégorie
    meta_score, meta_issues = analyze_meta_tags(page_data)
    heading_score, heading_issues = analyze_headings(page_data)
    image_score, image_issues = analyze_images(page_data)
    link_score, link_issues = analyze_links(page_data)
    technical_score, technical_issues = analyze_seo_technical(page_data)

    report['scores'] = {
        'meta_tags': meta_score,
        'headings': heading_score,
        'images': image_score,
        'links': link_score,
        'technical': technical_score
    }

    report['issues'] = meta_issues + heading_issues + image_issues + link_issues + technical_issues
    report['total_score'] = sum(report['scores'].values()) / len(report['scores'])

    return report

def generate_markdown_report(all_reports, all_links):
    """Génère le rapport markdown final"""
    date = datetime.now().strftime('%Y-%m-%d')

    md = f"""# Audit SEO Profond - Haesh Sheli
Date: {date}

## 📊 Résumé Exécutif

### Scores Globaux par Catégorie

"""

    # Calculer les scores moyens
    avg_scores = defaultdict(list)
    for report in all_reports:
        for category, score in report['scores'].items():
            avg_scores[category].append(score)

    for category, scores in avg_scores.items():
        avg = sum(scores) / len(scores) if scores else 0
        status = "✅" if avg >= 80 else "⚠️" if avg >= 60 else "❌"
        md += f"{status} **{category.replace('_', ' ').title()}**: {avg:.1f}/100\n"

    # Score global
    global_score = sum([sum(scores) / len(scores) for scores in avg_scores.values()]) / len(avg_scores) if avg_scores else 0
    md += f"\n### 🎯 Score Global: {global_score:.1f}/100\n\n"

    # Statistiques générales
    md += "## 📈 Statistiques Générales\n\n"
    md += f"- **Pages auditées**: {len(all_reports)}\n"

    total_issues_p0 = sum(len([i for i in r['issues'] if i.startswith('P0')]) for r in all_reports)
    total_issues_p1 = sum(len([i for i in r['issues'] if i.startswith('P1')]) for r in all_reports)
    total_issues_p2 = sum(len([i for i in r['issues'] if i.startswith('P2')]) for r in all_reports)

    md += f"- **Problèmes critiques (P0)**: {total_issues_p0}\n"
    md += f"- **Problèmes majeurs (P1)**: {total_issues_p1}\n"
    md += f"- **Améliorations recommandées (P2)**: {total_issues_p2}\n\n"

    # Problèmes par priorité
    md += "## 🚨 Problèmes par Priorité\n\n"

    md += "### P0 - Critiques (À corriger immédiatement)\n\n"
    for report in all_reports:
        p0_issues = [i for i in report['issues'] if i.startswith('P0')]
        if p0_issues:
            md += f"\n**{report['name']}** ({report['url']})\n"
            for issue in p0_issues:
                md += f"- {issue[4:]}\n"

    md += "\n### P1 - Majeurs (À corriger sous 1 semaine)\n\n"
    for report in all_reports:
        p1_issues = [i for i in report['issues'] if i.startswith('P1')]
        if p1_issues:
            md += f"\n**{report['name']}** ({report['url']})\n"
            for issue in p1_issues:
                md += f"- {issue[4:]}\n"

    md += "\n### P2 - Recommandations (À planifier)\n\n"
    for report in all_reports:
        p2_issues = [i for i in report['issues'] if i.startswith('P2')]
        if p2_issues:
            md += f"\n**{report['name']}** ({report['url']})\n"
            for issue in p2_issues:
                md += f"- {issue[4:]}\n"

    # Tableau récapitulatif
    md += "\n## 📋 Tableau Récapitulatif par Page\n\n"
    md += "| Page | Score Total | Meta Tags | Titres | Images | Liens | Technique |\n"
    md += "|------|-------------|-----------|--------|--------|-------|----------|\n"

    for report in all_reports:
        scores = report['scores']
        md += f"| {report['name']} | {report['total_score']:.0f} | "
        md += f"{scores.get('meta_tags', 0):.0f} | "
        md += f"{scores.get('headings', 0):.0f} | "
        md += f"{scores.get('images', 0):.0f} | "
        md += f"{scores.get('links', 0):.0f} | "
        md += f"{scores.get('technical', 0):.0f} |\n"

    # Liste complète des liens
    md += "\n## 🔗 Liste Complète des Liens\n\n"
    md += "### Liens Internes\n\n"

    internal_links_set = set()
    for page_name, links in all_links.items():
        for link in links.get('internal', []):
            internal_links_set.add((link['href'], link['text'][:100]))

    for href, text in sorted(internal_links_set):
        md += f"- [{text}]({href})\n"

    md += "\n### Liens Externes\n\n"

    external_links_set = set()
    for page_name, links in all_links.items():
        for link in links.get('external', []):
            external_links_set.add((link['href'], link['text'][:100]))

    for href, text in sorted(external_links_set):
        md += f"- [{text}]({href})\n"

    # Recommandations
    md += "\n## 💡 Recommandations Prioritaires\n\n"
    md += "### Immédiat (Cette Semaine)\n\n"
    md += "1. **Ajouter les attributs alt manquants** sur toutes les images\n"
    md += "2. **Corriger les H1 multiples** ou manquants\n"
    md += "3. **Ajouter les URLs canoniques** sur toutes les pages\n"
    md += "4. **Implémenter les balises hreflang** pour le multilingue\n\n"

    md += "### Court Terme (2-4 Semaines)\n\n"
    md += "1. **Compléter les balises Open Graph** et Twitter Card\n"
    md += "2. **Ajouter des données structurées Schema.org**\n"
    md += "3. **Optimiser les meta descriptions** (longueur idéale: 120-160 caractères)\n"
    md += "4. **Créer un sitemap.xml** et robots.txt\n\n"

    md += "### Moyen Terme (1-2 Mois)\n\n"
    md += "1. **Implémenter le lazy loading** sur toutes les images\n"
    md += "2. **Optimiser les performances** (Core Web Vitals)\n"
    md += "3. **Améliorer l'accessibilité** (WCAG 2.1)\n"
    md += "4. **Audit de contenu** et optimisation des mots-clés\n\n"

    return md

# Template pour générer le rapport
REPORT_TEMPLATE = """
Ce script génère un rapport d'audit SEO complet.
Utilisez-le avec les données collectées via Playwright.
"""

if __name__ == "__main__":
    print("Analyseur SEO - Haesh Sheli")
    print("=" * 50)
    print(REPORT_TEMPLATE)
