import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

/**
 * useSEO — Sets document title, meta description, and OG tags dynamically.
 * Call from any page component.
 */
export function useSEO({
  title,
  description,
  ogImage,
  ogType = "website",
  canonical,
}: SEOProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // OG title
    setMetaProperty("og:title", title);
    // OG description
    setMetaProperty("og:description", description);
    // OG type
    setMetaProperty("og:type", ogType);
    // OG image
    if (ogImage) {
      setMetaProperty("og:image", ogImage);
    }
    // OG URL / canonical
    if (canonical) {
      setMetaProperty("og:url", canonical);
      let linkCanonical = document.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement;
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonical);
    }

    // Twitter card
    setMetaProperty("twitter:card", "summary_large_image");
    setMetaProperty("twitter:title", title);
    setMetaProperty("twitter:description", description);
    if (ogImage) {
      setMetaProperty("twitter:image", ogImage);
    }
  }, [title, description, ogImage, ogType, canonical]);
}

function setMetaProperty(property: string, content: string) {
  let meta = document.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement;
  if (!meta) {
    meta = document.querySelector(
      `meta[name="${property}"]`,
    ) as HTMLMetaElement;
  }
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}
