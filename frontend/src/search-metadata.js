// One bilingual homepage, one canonical URL. No alternate-language URLs are invented.
const descriptions = {
  ar: 'عمرو تك AmroTech: تطوير مواقع ومتاجر إلكترونية وأنظمة مخصصة بالعربية والإنجليزية. تواصل مع عمرو لمناقشة مشروعك من الفكرة إلى الإطلاق.',
  en: 'AmroTech builds custom websites, ecommerce stores and business tools in Arabic and English. Work directly with Amr from your first idea to launch.',
};
function meta(attribute, key, value) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = value;
}
function sync() {
  const language = document.documentElement.lang === 'en' ? 'en' : 'ar';
  meta('name', 'description', descriptions[language]);
  meta('property', 'og:description', descriptions[language]);
  meta('property', 'og:title', document.title);
  meta('property', 'og:locale', language === 'ar' ? 'ar_SA' : 'en_US');
  meta('property', 'og:locale:alternate', language === 'ar' ? 'en_US' : 'ar_SA');
  meta('name', 'twitter:title', document.title);
  meta('name', 'twitter:description', descriptions[language]);
}
new MutationObserver(sync).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
sync();

