export default function decorate(block) {
  if (block.classList.contains("simple-banner-type-3")) {
    const contentInner = block.querySelector(":scope > div:nth-child(2) > div");
    if (!contentInner) return;
    const uls = [...contentInner.querySelectorAll("ul")];
    const button = contentInner.querySelector("p.button-container");
    if (!uls.length && !button) return;
    // Reference BEFORE DOM changes
    const referenceNode = uls[0] || button;
    // Create ONE common wrapper
    const commonWrapper = document.createElement("div");
    // Insert wrapper FIRST
    contentInner.insertBefore(commonWrapper, referenceNode);
    // ---- Wrap all ULs ----
    if (uls.length) {
      const ulWrapper = document.createElement("div");
      uls.forEach((ul) => ulWrapper.appendChild(ul));
      commonWrapper.appendChild(ulWrapper);
    }
    // ---- Wrap button ----
    if (button) {
      const buttonWrapper = document.createElement("div");
      buttonWrapper.appendChild(button);
      commonWrapper.appendChild(buttonWrapper);
    }
  }
  /*  Variant + banner logic */
  const container = block.closest(".banner-container");
  const classes = block.classList;
  const TYPE_MAP = {
    "notification-banner-type-1": { variant: "notification-banner-varient1" },
    "notification-banner-type-2": { variant: "notification-banner-varient2" },
    "notification-banner-type-3": { variant: "notification-banner-varient3" },
    "simple-banner-type-1": { variant: "simple-banner-varient1" },
    "simple-banner-type-2": { variant: "simple-banner-varient2" },
    "simple-banner-type-3": { variant: "simple-banner-varient3" },
    "simple-banner-type-4": { variant: "simple-banner-varient4" },
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
