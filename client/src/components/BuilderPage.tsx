// ===========================================
// BUILDER.IO PAGE COMPONENT
// ===========================================
import { builder, BuilderComponent } from '@builder.io/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from './Header';

// Initialize Builder.io with API key
builder.init('64acbf47412843a9a0fbf6f4c8852e80');

interface BuilderPageProps {
  model: string;
  pageId?: string;
}

export function BuilderPage({ model, pageId }: BuilderPageProps) {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50">
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      <div className="pt-24">
        <BuilderComponent
          model={model}
          options={{
            ...(pageId && { key: pageId }),
            userAttributes: {
              locale: currentLanguage,
            },
          }}
        />
      </div>
    </div>
  );
}

// Specific page components using Builder.io
export function HilloulaBuilder() {
  return (
    <BuilderPage 
      model="page" 
      pageId="d724d8f6e35f452388dce70654efc470" 
    />
  );
}

export function TestimonialsBuilder() {
  return (
    <BuilderPage 
      model="page" 
      pageId="71d359629ac546cda364761a62092401" 
    />
  );
}

