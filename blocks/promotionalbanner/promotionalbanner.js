import { a, div, h2, img, p } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
    console.log(block);
    // bannerType1();
    let getType = block.classList;
     block.textContent = '';
            //  block.append(bannerType1());

     if(getType.contains("type-1")) {
         block.append(bannerType1());
     } else {
        block.append(bannerType1());
     }
}


function bannerType1() {
    const promotionalBanner =
  div(
    {
      class: "promotionalbanner block type1",
      "data-block-name": "promotionalbanner",
      "data-block-status": "loaded",
    },

    // -------- Image Section --------
    div({},
      div({},
          img({
            loading: "eager",
            fetchpriority: "high",
            alt: "",
            src:
              "./media_1622bbba7242f74f6882b07c26ebb94a6b552fcd6.png?width=750&format=png&optimize=medium",
            width: "750",
            height: "525",
          })
      )
    ),

    // -------- Content Section --------
    div({},
      div({},
        h2(
          { id: "upgrade-to-smarter-stronger-rewards" },
          "Upgrade to smarter, stronger rewards."
        ),
        p(
          {},
          "Earn accelerated points, premium benefits, and access exclusive partner offers, all from one powerful card.fjwbfjsjfbsj"
        ),
        p({},
          a(
            { href: "/footer", title: "Explore Benefits" },
            "Explore Benefits"
          ),
          " ",
          a(
            { href: "/us", title: "Know More" },
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
return promotionalBanner;
}