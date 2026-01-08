export default function decorate(block) {
  const children = [...block.children];
  // If there are less than 2 divs, nothing to wrap
  if (children.length < 2) return;
  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "track-record-wrapper-item";
  // Move 2nd to last div into wrapper
  children.slice(1).forEach((child) => {
    wrapper.appendChild(child);
  });
  // Append wrapper back into block
  block.appendChild(wrapper);
  console.log(block, "trackrecord.js");
  const container = block.closest(".track-record-container");
  const classes = block.classList;
  const TYPE_MAP = {
    "type-1": { variant: "track-record-varient1", handler: type1 },
    "type-2": { variant: "track-record-varient2", handler: type2 },
    "type-3": { variant: "track-record-varient3", handler: type3 },
  };

  // Find matching type
  const matchKey = Object.keys(TYPE_MAP).find((key) => classes.contains(key));
  // Fallback to type-1
  const { variant, handler } = TYPE_MAP[matchKey] || TYPE_MAP["type-1"];
  // Apply variant class
  container?.classList.add(variant);
  // Append banner
  block.append(handler(block));
  function type1(block) {
    return logo("banner type 1");
  }
  function type2(block) {
    return logo("banner type 2");
  }

  function type3(block) {
    return logo("banner type 3");
  }
}
