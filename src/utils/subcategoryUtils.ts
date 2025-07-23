
// This matches the subcategory data structure from ProductSubcategory.tsx
export const getExistingSubcategories = () => {
  return [
    // Indoor subcategories
    'ceiling-lights',
    'wall-lights', 
    'floor-lamps',
    // Outdoor subcategories
    'garden-lights',
    'security-lights',
    'pathway-lights',
    // Poles subcategories
    'street-poles',
    'decorative-poles',
    'utility-poles'
  ];
};

export const formatSubcategoryName = (subcategory: string) => {
  return subcategory
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
