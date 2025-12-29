import { div, p } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  console.log("active", block);
  // const properties = readBlockConfig(block);
  let textContent = block.querySelector("p") || "not found";
  const blogs =
    div({
        class: "blogs block",
        "data-block-name": "blogs",
        "data-block-status": "loading"
      },
      div({
          class: "main-wrapper"
        },
        div({
            class: "main-wrapper1"
          },
          p({class:"title"},textContent),
        ),
      )
    );

    document.addEventListener("load", function() {
      console.log("hi");
    })
    
     block.innerHTML = '';
  block.appendChild(blogs);
}