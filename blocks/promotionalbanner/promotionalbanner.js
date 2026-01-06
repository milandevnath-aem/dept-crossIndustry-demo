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
    block.closest(".promotionalbanner-container").classList.add("banner-varient1");
    block.append(bannerType1(block));
  } else if (getType.contains("type-2")) {
    block.closest(".promotionalbanner-container").classList.add("banner-varient2");
    block.append(bannerType1(block));
  }else if (getType.contains("type-3")) {
    block.closest(".promotionalbanner-container").classList.add("banner-varient3");
    block.append(bannerType3(block));
  } else {
    block.append(bannerType1(block));
  }
}


function bannerType1(block) {
  let source = block.querySelector("img").src;

  const promotionalBanner =
    div({
        class: "promotionalbanner promotionalbanner-content block type1",
        "data-block-name": "promotionalbanner",
        "data-block-status": "loaded",
      },
      // -------- Image Section --------
      div({
          class: "bannner-image"
        },
        div({},
          img({
            loading: "eager",
            fetchpriority: "high",
            alt: "",
            src: `${source}`,
          })
        )
      ),
      // -------- Content Section --------
      div({
          class: "banner-conetent"
        },
        div({ class:"grid-content"},
          h2({
              id: "upgrade-to-smarter-stronger-rewards"
            },
            "Upgrade to smarter, stronger rewards."
          ),
          p({},
            "Earn accelerated points, premium benefits, and access exclusive partner offers, all from one powerful card."
          ),
          p({
              class: "redirections"
            },
            a({
                href: "/footer",
                title: "Explore Benefits"
              },
              "Explore Benefits"
            ),
            " ",
            a({
                href: "/us",
                title: "Know More"
              },
              "Know More"
            )
          )
        )
      ),

      // -------- Empty Config / Spacer --------
      div({},
        div({})
      )
    );
  block.textContent = '';

  return promotionalBanner;
}

function bannerType3(block) {
  let source = block.querySelector("img").src;
 const promotionalBanner =
    div({
        class: "promotionalbanner promotionalbanner-content block type1",
        "data-block-name": "promotionalbanner",
        "data-block-status": "loaded",
      },
      // -------- Image Section --------
      div({
          class: "bannner-image desktop-img"
        },
        div({},
          img({
            loading: "eager",
            fetchpriority: "high",
            alt: "",
            src: `${source}`,
          })
        )
      ),
      // -------- Content Section --------
      div({
          class: "banner-conetent"
        },
        div({ class:"grid-content"},
          div({},
          h2({
              id: "upgrade-to-smarter-stronger-rewards"
            },
            "Upgrade to smarter, stronger rewards."
          ),
        ),
              // -------- Image Section --------
      div({
          class: "bannner-image mob-img"
        },
        div({},
          img({
            loading: "eager",
            fetchpriority: "high",
            alt: "",
            src: `${source}`,
          })
        )
      ),
        div({class:"bottom-content"},
          p({},
            "Earn accelerated points, premium benefits, and access exclusive partner offers, all from one powerful card."
          ),
          p({
              class: "redirections"
            },
            a({
                href: "/footer",
                title: "Explore Benefits"
              },
              "Explore Benefits"
            ),
            " ",
            a({
                href: "/us",
                title: "Know More"
              },
              "Know More"
            )
          )
        )
                ),
      ),

      // -------- Empty Config / Spacer --------
      div({},
        div({})
      )
    );

  block.textContent = '';

  return promotionalBanner;
}