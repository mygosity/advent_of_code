/**
 * @param {{ name: string, quantity: number, category: string }[]} inventory
 * @returns {object} The organized inventory
 */
function organizeInventory(inventory) {
  // Code here
  const map = {};
  for (const { name, quantity, category } of inventory) {
    map[category] = map[category] || {};
    if (map[category][name]) {
      map[category][name] += quantity;
    } else {
      map[category][name] = quantity;
    }
  }
  return map;
}
