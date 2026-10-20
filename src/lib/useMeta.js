import { useEffect } from 'react';
import { SITE } from '../config/site';

/** Sets the document title and meta description for the current route. */
export function useMeta(title, description = SITE.description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.titleSuffix}` : SITE.homeTitle;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }, [title, description]);
}
