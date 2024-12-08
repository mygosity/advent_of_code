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

console.log({
  test: organizeInventory([
    { name: "doll", quantity: 5, category: "toys" },
    { name: "car", quantity: 3, category: "toys" },
    { name: "ball", quantity: 2, category: "sports" },
    { name: "car", quantity: 2, category: "toys" },
    { name: "racket", quantity: 4, category: "sports" },
  ]),
});
