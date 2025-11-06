import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots-mobile');
const BASE_URL = 'https://keren-david-centralized.onrender.com';

// Créer le dossier screenshots s'il n'existe pas
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const pages = [
  { url: '/', name: 'home-mobile.jpg' },
  { url: '/store', name: 'store-mobile-home.jpg' },
  { url: '/magazine', name: 'magazine-mobile.jpg' },
  { url: '/lottery', name: 'lottery-mobile.jpg' },
  { url: '/hilloula-2024', name: 'hilloula-2024-mobile.jpg' },
  { url: '/testimonials', name: 'testimonials-mobile.jpg' },
];

const mobileViewport = {
  width: 390,
  height: 844,
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
};

async function takeScreenshots() {
  console.log('🚀 Démarrage du navigateur Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Configuration mobile
  await page.setViewport(mobileViewport);
  await page.setUserAgent(mobileViewport.userAgent);
  
  console.log(`📸 Configuration mobile: ${mobileViewport.width}x${mobileViewport.height}`);

  for (const { url, name } of pages) {
    try {
      const fullUrl = `${BASE_URL}${url}`;
      console.log(`\n📷 Capture de: ${fullUrl}`);
      
      // Naviguer vers la page
      await page.goto(fullUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
      
      // Attendre un peu pour que tout se charge
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Pour la page store, vérifier si on peut ouvrir les filtres
      if (url === '/store') {
        try {
          // Essayer de trouver le bouton filtres - chercher par texte ou data attribute
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Chercher le bouton filtres - utiliser le sélecteur CSS direct
          // Le SheetTrigger est généralement le premier bouton dans la section mobile
          await page.waitForSelector('button', { timeout: 5000 });
          
          // Méthode simplifiée : cliquer directement sur le SheetTrigger
          // Chercher un bouton visible qui contient "Filtre" ou une icône Filter
          const clicked = await page.evaluate(() => {
            // Chercher tous les boutons visibles
            const buttons = Array.from(document.querySelectorAll('button'));
            for (const btn of buttons) {
              const rect = btn.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                const text = btn.textContent?.toLowerCase() || '';
                // Si le bouton contient "filtre" ou est dans la zone mobile filters
                if (text.includes('filtre') || text.includes('filter')) {
                  btn.click();
                  return true;
                }
              }
            }
            // Sinon, chercher par aria-label ou data attribute
            const sheetTrigger = document.querySelector('[data-state], [aria-controls*="sheet"]');
            if (sheetTrigger) {
              sheetTrigger.click();
              return true;
            }
            return false;
          });
          
          if (clicked) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Vérifier que le Sheet est ouvert (chercher SheetContent)
            const sheetOpen = await page.evaluate(() => {
              return document.querySelector('[data-state="open"]') !== null || 
                     document.querySelector('[role="dialog"]') !== null ||
                     document.querySelector('.sheet-content, [class*="Sheet"]') !== null;
            });
            
            if (sheetOpen) {
              // Screenshot avec filtres ouverts
              const filterScreenshotPath = path.join(SCREENSHOT_DIR, 'store-mobile-filters-open.jpg');
              await page.screenshot({ 
                path: filterScreenshotPath,
                fullPage: false,
                quality: 90
              });
              console.log(`  ✅ Screenshot filtres: ${filterScreenshotPath}`);
              
              // Fermer les filtres
              await page.keyboard.press('Escape');
              await new Promise(resolve => setTimeout(resolve, 500));
            } else {
              console.log(`  ⚠️  Sheet non ouvert après clic`);
            }
          } else {
            console.log(`  ℹ️  Bouton filtres non trouvé - peut-être pas encore chargé`);
          }
        } catch (err) {
          console.log(`  ⚠️  Impossible d'ouvrir les filtres: ${err.message}`);
        }
      }
      
      // Screenshot normal
      const screenshotPath = path.join(SCREENSHOT_DIR, name);
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: true,
        quality: 90
      });
      
      console.log(`  ✅ Screenshot sauvegardé: ${screenshotPath}`);
      
    } catch (error) {
      console.error(`  ❌ Erreur pour ${url}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('\n🎉 Tous les screenshots ont été pris!');
  console.log(`📁 Dossier: ${SCREENSHOT_DIR}`);
}

takeScreenshots().catch(console.error);

