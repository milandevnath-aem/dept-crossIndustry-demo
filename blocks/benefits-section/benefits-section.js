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
const benefitsSection =
  div(
    {
      class: "benefits-section block",
      "data-block-name": "benefits",
      "data-block-status": "loaded",
    },

    // -------- Card 1 --------
    div({ class: "benefits-card" },
      div({ class: "benefits-icon" },
        img({
          loading: "eager",
          fetchpriority: "high",
          alt: "",
          src: "./icon-1.png",
        })
      ),
      div({ class: "benefits-content" },
        h2({}, "Get rewarded just for getting started"),
        p({},
          "Open your first account and receive a $100 cash bonus when you make an eligible first deposit or purchase."
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