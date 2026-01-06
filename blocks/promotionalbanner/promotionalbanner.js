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
  } else if (getType.contains("type-3")) {
    block.closest(".promotionalbanner-container").classList.add("banner-varient3");
    block.append(bannerType3(block));
  } else if (getType.contains("type-4")) {
    block.closest(".promotionalbanner-container").classList.add("banner-varient4");
    block.append(bannerType4(block));
  } else {
    block.append(bannerType1(block));
  }
}


function bannerType1(block) {
  let source = window.innerWidth > 767 ? block.querySelectorAll("img")[0].src.trim() : block.querySelectorAll("img")[1].src.trim();
  source = block.querySelectorAll("img").length > 1 ? source : block.querySelectorAll("img")[0];
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
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

function bannerType3(block) {
  let source = window.innerWidth > 767 ? block.querySelectorAll("img")[0].src.trim() : block.querySelectorAll("img")[1].src.trim();
  source = block.querySelectorAll("img").length > 1 ? source : block.querySelectorAll("img")[0];
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
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
    );

  block.textContent = '';

  return promotionalBanner;
}

function bannerType4(block) {
  let source = window.innerWidth > 767 ? block.querySelectorAll("img")[0].src.trim() : block.querySelectorAll("img")[1].src.trim();
  source = block.querySelectorAll("img").length > 1 ? source : block.querySelectorAll("img")[0];
  let heading = block.querySelector("h2").innerText.trim();
  let description = block.querySelector("p").innerText.trim();
  block.closest(".promotionalbanner-container").style.background = `url(${source}) center / cover no-repeat`
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