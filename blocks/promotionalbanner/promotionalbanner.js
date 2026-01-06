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
            width: "750",
            height: "525",
          })
        )
      ),
      // -------- Content Section --------
      div({
          class: "banner-conetent"
        },
        div({},
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

function bannerType2(block) {
  const promotionalBanner =
    div({
        class: "promotionalbanner block",
        "data-block-name": "promotionalbanner",
        "data-block-status": "loaded",
      },

      // -------- Image Section --------
      div({},
        div({},
          picture({},
            source({
              type: "image/webp",
              srcset: "./media_1c9306d7674c0b8ee54457c9ac52f817a0d3410ae.png?width=2000&format=webply&optimize=medium",
              media: "(min-width: 600px)",
            }),
            source({
              type: "image/webp",
              srcset: "./media_1c9306d7674c0b8ee54457c9ac52f817a0d3410ae.png?width=750&format=webply&optimize=medium",
            }),
            source({
              type: "image/png",
              srcset: "./media_1c9306d7674c0b8ee54457c9ac52f817a0d3410ae.png?width=2000&format=png&optimize=medium",
              media: "(min-width: 600px)",
            }),
            img({
              loading: "eager",
              fetchpriority: "high",
              alt: "",
              src: "./media_1c9306d7674c0b8ee54457c9ac52f817a0d3410ae.png?width=750&format=png&optimize=medium",
              width: "750",
              height: "525",
            })
          )
        )
      ),

      // -------- Content Section --------
      div({},
        div({},
          h2({
              id: "upgrade-to-smarter-stronger-rewards"
            },
            "Upgrade to smarter, stronger rewards."
          ),
          p({},
            "Earn accelerated points, premium benefits, and access exclusive partner offers, all from one powerful card."
          ),
          p({},
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

    );

  block.textContent = '';

  return promotionalBanner;
}