/*
import { patternDecorate } from '../../scripts/blockTemplate.js';

export default async function decorate(block) {
  patternDecorate(block);
}
*/

import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Swiper from './swiper.min.js';
export default function decorate(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/cards/swiper.min.css`);
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    
    // Read card style from the third div (index 2)
    const styleDiv = row.children[2];
    const styleParagraph = styleDiv?.querySelector('p');
    const cardStyle = styleParagraph?.textContent?.trim() || 'default';
    if (cardStyle && cardStyle !== 'default') {
      li.className = cardStyle;
    }
    
    // Read CTA style from the fourth div (index 3)
    const ctaDiv = row.children[3];
    const ctaParagraph = ctaDiv?.querySelector('p');
    const ctaStyle = ctaParagraph?.textContent?.trim() || 'default';
    
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    
    // Process the li children to identify and style them correctly
    [...li.children].forEach((div, index) => {
      // First div (index 0) - Image
      if (index === 0) {
        div.className = 'cards-card-image';
      }
      // Second div (index 1) - Content with button
      else if (index === 1) {
        div.className = 'cards-card-body';
      }
      // Third div (index 2) - Card style configuration
      else if (index === 2) {
        div.className = 'cards-config';
        const p = div.querySelector('p');
        if (p) {
          p.style.display = 'none'; // Hide the configuration text
        }
      }
      // Fourth div (index 3) - CTA style configuration
      else if (index === 3) {
        div.className = 'cards-config';
        const p = div.querySelector('p');
        if (p) {
          p.style.display = 'none'; // Hide the configuration text
        }
      }
      // Any other divs
      else {
        div.className = 'cards-card-body';
      }
    });
    
    // Apply CTA styles to button containers
    const buttonContainers = li.querySelectorAll('p.button-container');
    buttonContainers.forEach(buttonContainer => {
      // Remove any existing CTA classes
      buttonContainer.classList.remove('default', 'cta-button', 'cta-button-secondary', 'cta-button-dark', 'cta-default');
      // Add the correct CTA class
      buttonContainer.classList.add(ctaStyle);
    });
    
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
  let classlistExists = block.closest(".cards-container").classList;
  if (classlistExists.contains("blog-cards") || classlistExists.contains("blog-cards2") || classlistExists.contains("product-variant1")) {
    block.classList.add('swiper');
    block.querySelector("ul").classList.add("swiper-wrapper");
    Array.from(block.children[0].children).forEach((element) => {
      element.classList.add('swiper-slide');
      // element.classList.add('blogs-card');
      // swiperWrapper.appendChild(element);
    });
    const paginationEl = document.createElement('div');
    paginationEl.classList.add('swiper-pagination');
    block.appendChild(paginationEl);
    // if(classlistExists.contains("blog-cards")) {
    //   swiperVariantForblogs1()
    // } else {
    //   swiperVariantForblogs2()
    // }

      if(classlistExists.contains("blog-cards")) {
      swiperVariantForblogs1()
    } 
    if (classlistExists.contains("blog-cards2")){
      swiperVariantForblogs2()
    }
    if(classlistExists.contains("product-variant1")) {
     ProductSwiperVariant1()
    }
  }
    }


    function swiperVariantForblogs1() {
      // Initialize Swiper with responsive breakpoints (mobile shows 2.5)
        Swiper(".blog-cards .swiper", {
          slidesPerView: 3,
          observer: true,
          observeParents: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: "bullets",
          },
           breakpoints: {
    0: {
      slidesPerView: 1,     // fallback (below 375)
    },
    375: {
      slidesPerView: 1.5,   // 👈 375–1023
    },
    767: {
      slidesPerView: 2,   // 👈 375–1023
    },
    1024: {
      slidesPerView: 3,     // 👈 1024+
    },
  },
        });
    }

    function swiperVariantForblogs2() {
      // Initialize Swiper with responsive breakpoints (mobile shows 2.5)
        Swiper(".blog-cards2 .swiper", {
          slidesPerView: 2.5,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: "bullets",
          },
          breakpoints: {
    0: {
      slidesPerView: 1,
    },
    375: {
      slidesPerView: 1.5,
    },
    767: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2.5,
    },
  },
        });
    }


        function ProductSwiperVariant1() {
      // Initialize Swiper with responsive breakpoints (mobile shows 2.5)
        Swiper(".product-variant1 .swiper", {
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: "bullets",
          }
        });
    }