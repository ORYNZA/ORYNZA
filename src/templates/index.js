import catalog from "./catalog/templates.json";
export { default as RoyalLakePalaceTemplate } from "./categories/WED/WED-001/index";

export function getAllTemplates() {
  return catalog.templates;
}

export function getTemplateById(id) {
  return catalog.templates.find(template => template.id === id);
}

export function getTemplatesByCategory(category) {
  return catalog.templates.filter(
    template => template.category === category
  );
}
