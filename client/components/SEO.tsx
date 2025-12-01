"use client";

import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  schema?: object | string;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-");
}

function upsertMeta(
  attribute: "name" | "property",
  attributeValue: string,
  content: string,
) {
  const selector = `meta[${attribute}="${attributeValue}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export function SEO({ title, description, image, url, schema }: SEOProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const canonical = url || window.location.href;
    const ogImage = image || "/og-default.jpg";

    document.title = title;
    const MAX_META = 155;
    const truncatedDescription =
      description && description.length > MAX_META
        ? description.slice(0, MAX_META)
        : description;
    if (description && description.length > MAX_META) {
      // eslint-disable-next-line no-console
      console.warn(
        `Meta description exceeded ${MAX_META} characters and was truncated.`,
      );
    }
    upsertMeta("name", "description", truncatedDescription);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonical);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:image", ogImage);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    if (schema) {
      try {
        const id = `ld-json-${slugify(title)}`;
        let script = document.getElementById(id) as HTMLScriptElement | null;
        if (!script) {
          script = document.createElement("script");
          script.setAttribute("type", "application/ld+json");
          script.setAttribute("id", id);
          document.head.appendChild(script);
        }

        const schemaContent =
          typeof schema === "string" ? schema : JSON.stringify(schema);
        script.textContent = schemaContent;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("Failed to set JSON-LD schema", e);
      }
    }
  }, [title, description, image, url, schema]);

  return null;
}
