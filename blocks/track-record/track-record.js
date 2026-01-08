export default function decorate(block) {
  const children = [...block.children];
  // If there are less than 2 divs, nothing to wrap
  if (children.length < 2) return;
  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "track-record-wrapper";
  // Move 2nd to last div into wrapper
  children.slice(1).forEach((child) => {
    wrapper.appendChild(child);
  });
  // Append wrapper back into block
  block.appendChild(wrapper);
  console.log(block, "trackrecord.js");
  const TYPE_MAP = {
    "type-1": ["track-record-varient1", type1],
    "type-2": ["track-record-varient2", type1],
    "type-3": ["track-record-varient3", type3],
    "type-4": ["track-record-varient4", type4],
  };
  const container = block.closest(".track-record-container");
  // Find matching type
  const match = Object.entries(TYPE_MAP).find(([key]) =>
    getType?.contains(key)
  );
  // Destructure with fallback
  const [variant, renderer] = match?.[1] ?? [null, type1];
  // Apply variant
  if (variant && container) {
    container.classList.add(variant);
  }
  // Append content
  block.append(renderer(block));
}
