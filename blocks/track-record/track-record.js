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
  if (block.classList.contains("process-step-type-3")) {
    const items = block.querySelectorAll(
      ".track-record-wrapper-item > div > div"
    );

    items.forEach((contentDiv) => {
      const directPs = contentDiv.querySelectorAll(":scope > p");

      // If already wrapped, skip
      if (directPs.length <= 1) return;

      // Create wrapper for text
      const textWrap = document.createElement("div");

      // Move all <p> except the first (number)
      [...directPs].slice(1).forEach((p) => textWrap.appendChild(p));

      // Append wrapper
      contentDiv.appendChild(textWrap);
    });
  }

  /*  Variant logic */
  const container = block.closest(".track-record-container");
  const classes = block.classList;
  const TYPE_MAP = {
    "trackrecord-type-1": { variant: "track-record-varient1" },
    "trackrecord-type-2": { variant: "track-record-varient2" },
    "trackrecord-type-3": { variant: "track-record-varient3" },
    "process-step-type-1": { variant: "process-step-varient1" },
    "process-step-type-2": { variant: "process-step-varient2" },
    "process-step-type-3": { variant: "process-step-varient3" },
  };
  // Find matching type
  const matchKey = Object.keys(TYPE_MAP).find((key) => classes.contains(key));
  // Fallback to type-1
  const { variant } = TYPE_MAP[matchKey] || TYPE_MAP["type-1"];
  // Apply variant class
  container?.classList.add(variant);
  // Append
  // block.append(handler);
}
