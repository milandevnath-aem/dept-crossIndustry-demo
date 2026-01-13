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
    block.closest(".promotional-banner-container").classList.add("banner-varient1");
    block.append(bannerType1(block));
  } else if (getType.contains("type-2")) {
    block.closest(".promotional-banner-container").classList.add("banner-varient2");
    block.append(bannerType1(block));
  } else if (getType.contains("type-3")) {
    block.closest(".promotional-banner-container").classList.add("banner-varient3");
    block.append(bannerType3(block));
  } else if (getType.contains("type-4")) {
    block.closest(".promotional-banner-container").classList.add("banner-varient4");
    block.append(bannerType4(block));
  } else {
    block.append(bannerType1(block));
  }
}


function bannerType1(block) {
  let source = window.innerWidth > 1024 ? block.querySelectorAll("img")[0].src.trim() : block.querySelectorAll("img")[1].src.trim();
  source = block.querySelectorAll("img").length > 1 ? source : block.querySelectorAll("img")[0].src.trim();
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
  let buttons = block.querySelectorAll("a");
  let fisrtAnchorText = buttons[0]?.innerText.trim() || "";
  let fisrtAnchorHref = buttons[0]?.href.trim() || "";
  let fisrtAnchorTitle = buttons[0]?.title.trim() || "";
  let secondAnchorText = buttons[1]?.innerText?.trim() || "";
  let secondAnchorHref = buttons[1]?.href.trim() || "";
  let secondAnchorTitle = buttons[1]?.title.trim() || "";

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
        div({
            class: "grid-content"
          },
          h2({
              id: "upgrade-to-smarter-stronger-rewards"
            },
            heading
          ),
          p({},
            description
          ),
          p({
              class: "redirections"
            },
            a({
                href: `${fisrtAnchorHref}`,
                title: `${fisrtAnchorTitle}`
              },
              fisrtAnchorText
            ),
            " ",
            a({
                href: `${secondAnchorHref}`,
                title: `${secondAnchorTitle}`
              },
              secondAnchorText
            )
          )
        )
      ),
    );
  block.textContent = '';

  return promotionalBanner;
}

function bannerType3(block) {
  let source = window.innerWidth > 1024 ? block.querySelectorAll("img")[0].src.trim() : block.querySelectorAll("img")[1].src.trim();
  source = block.querySelectorAll("img").length > 1 ? source : block.querySelectorAll("img")[0].src.trim();
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
    let buttons = block.querySelectorAll("a");
  let fisrtAnchorText = buttons[0]?.innerText.trim() || "";
  let fisrtAnchorHref = buttons[0]?.href.trim() || "";
  let fisrtAnchorTitle = buttons[0]?.title.trim() || "";
  let secondAnchorText = buttons[1]?.innerText?.trim() || "";
  let secondAnchorHref = buttons[1]?.href.trim() || "";
  let secondAnchorTitle = buttons[1]?.title.trim() || "";
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
        div({
            class: "grid-content"
          },
          div({},
            h2({
                id: "upgrade-to-smarter-stronger-rewards"
              },
              heading
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
          div({
              class: "bottom-content"
            },
            p({},
              description
            ),
            p({
                class: "redirections"
              },
              a({
                  href: `${fisrtAnchorHref}`,
                  title: `${fisrtAnchorTitle}`
                },
                fisrtAnchorText
              ),
              a({
                  href: `${secondAnchorHref}`,
                  title: `${secondAnchorTitle}`
                },
                secondAnchorText
              )
            )
          )
        ),
      ),
    );

  block.textContent = '';

  return promotionalBanner;
}

function bannerType4(block) {
  let source = window.innerWidth > 1024 ? block.querySelectorAll("img")[0].src.trim() : block.querySelectorAll("img")[1].src.trim();
  source = block.querySelectorAll("img").length > 1 ? source : block.querySelectorAll("img")[0].src.trim();
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
  block.closest(".promotional-banner-container").style.background = `url(${source}) center / cover no-repeat`;

    let buttons = block.querySelectorAll("a");
  let fisrtAnchorText = buttons[0]?.innerText.trim() || "";
  let fisrtAnchorHref = buttons[0]?.href.trim() || "";
  let fisrtAnchorTitle = buttons[0]?.title.trim() || "";
  let secondAnchorText = buttons[1]?.innerText?.trim() || "";
  let secondAnchorHref = buttons[1]?.href.trim() || "";
  let secondAnchorTitle = buttons[1]?.title.trim() || "";

  const promotionalBanner =
    div({
        class: "promotionalbanner promotionalbanner-content block type1",
        "data-block-name": "promotionalbanner",
        "data-block-status": "loaded",
      },
      // -------- Content Section --------
      div({
          class: "banner-conetent"
        },
        div({
            class: "grid-content"
          },
          h2({
              id: "upgrade-to-smarter-stronger-rewards"
            },
            heading
          ),
          p({},
            description
          ),
          p({
              class: "redirections"
            },
            a({
                href: `${fisrtAnchorHref}`,
                title: `${fisrtAnchorTitle}`
              },
              fisrtAnchorText
            ),
            " ",
            a({
                href: `${secondAnchorHref}`,
                title: `${secondAnchorTitle}`
              },
              secondAnchorText
            )
          )
        )
      ),
    );
  block.textContent = '';

  return promotionalBanner;
}