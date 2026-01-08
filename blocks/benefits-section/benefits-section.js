import {
  a,
  div,
  h2,
  img,
  p
} from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  console.log(block);
  let getType = block.classList;

  if (getType.contains("type-1")) {
    block.closest(".benefits-section-container").classList.add("benefits-section1");
    block.append(bannerType1(block));
  } else if (getType.contains("type-2")) {
    block.closest(".benefits-section-container").classList.add("benefits-section2");
    block.append(bannerType1(block));
  } else {
    block.append(bannerType1(block));
  }
}

function bannerType1(block) {
  let source = block.querySelector("img").src.trim();
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
const benefitsSection =
  div(
    {
      class: "benefits-section block",
    },

    // -------- Card 1 --------
    div({ class: "benefits-card" },
      div({ class: "benefits-icon" },
        img({
          loading: "eager",
          fetchpriority: "high",
          alt: "",
          src: `${source}`,
        })
      ),
      div({ class: "benefits-content" },
        h2({}, heading),
        p({},
          description
        ),
        p({ class: "cta" },
          a({
            href: "#",
            title: "Know More",
            class: "button"
          }, "Know More")
        )
      )
    ),
  );
 block.textContent = '';

  return benefitsSection;
}