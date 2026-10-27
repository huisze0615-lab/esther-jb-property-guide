/* No analytics account is created. Reuses an existing gtag function when present. */
(() => {
  'use strict';
  const allowed = Object.freeze({"SG_MY_ZH":["A","zh-Hans"],"SG_MY_EN":["A","en"],"JB_FIRST_ZH":["B","zh-Hans"],"B2_A01_ZH":["A","zh-Hans"],"B2_A01_EN":["A","en"],"B2_A02_ZH":["A","zh-Hans"],"B2_A02_EN":["A","en"],"B2_B01_ZH":["B","zh-Hans"],"B2_A03_ZH":["A","zh-Hans"],"B2_A03_EN":["A","en"],"B2_B02_ZH":["B","zh-Hans"],"B2_A04_ZH":["A","zh-Hans"],"B2_A04_EN":["A","en"],"B2_A05_ZH":["A","zh-Hans"],"B2_A05_EN":["A","en"],"B2_B03_ZH":["B","zh-Hans"],"B2_A06_ZH":["A","zh-Hans"],"B2_A06_EN":["A","en"],"B2_A07_ZH":["A","zh-Hans"],"B2_A07_EN":["A","en"]});
  const source = document.body.dataset.guideSource;
  if (!Object.hasOwn(allowed, source)) return;
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-guide-cta]');
    if (!link) return;
    const kind = link.dataset.guideCta;
    if (!['whatsapp', 'project'].includes(kind)) return;
    const payload = { audience: allowed[source][0], guide_source: source, content_language: allowed[source][1], link_location: link.dataset.location || 'article', project: link.dataset.project || 'none' };
    const name = kind === 'whatsapp' ? 'whatsapp_click' : 'project_click';
    // Never send income, budget entries, phone numbers, message text or full query strings.
    if (typeof window.gtag === 'function') window.gtag('event', name, payload);
    window.dispatchEvent(new CustomEvent('esther:guide-cta', { detail: { name, ...payload } }));
  });
})();
