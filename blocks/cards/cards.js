/*
import { patternDecorate } from '../../scripts/blockTemplate.js';

export default async function decorate(block) {
  patternDecorate(block);
}
*/

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Swiper from './swiper.min.js';
export default function decorate(block) {
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

    if(window.innerWidth > 1024) {
    let classlistExists = block.closest(".cards-container").classList;
    if(classlistExists.contains("hitech-variant1")) {
       let cards = block.querySelectorAll(".cards-wrapper li")
   cards.forEach((card, index) => {
  card.classList.remove("small", "big");

  const patternIndex = index % 4;

  if (patternIndex === 0 || patternIndex === 3) {
    card.classList.add("small");
  } else {
    card.classList.add("big");
  }
});
    }
  if (classlistExists.contains("hitech-variant2") || classlistExists.contains("hitech-variant3")) {
    block.classList.add('swiper');
    block.querySelector("ul").classList.add("swiper-wrapper");
    Array.from(block.children[0].children).forEach((element) => {
      element.classList.add('swiper-slide');
    });
    const paginationEl = document.createElement('div');
    paginationEl.classList.add('swiper-pagination');
    block.appendChild(paginationEl);

    if (classlistExists.contains("hitech-variant2")){
      hitechVariant1()
    }
    if(classlistExists.contains("hitech-variant3")) {
     hitechVariant2()
    }
    block.querySelectorAll(".swiper-wrapper .swiper-slide").forEach(function (el,ind) {
      if(ind == 0) {
 el.classList.add("hover");
      }
  el.addEventListener("mouseover", function () {
    block.querySelectorAll(".swiper-wrapper .swiper-slide").forEach(function (slide) {
      slide.classList.remove("hover");
    });
    this.classList.add("hover");
  });
});

  }
}
}

function hitechVariant1() {
        Swiper(".hitech-variant2 .swiper", {
          slidesPerView: 4,
          slideToClickedSlide: true,
          spaceBetween: 22,
grabCursor: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: "bullets",
          }
        });
    }

    function hitechVariant2() {
        Swiper(".hitech-variant3 .swiper", {
          slidesPerView: 4,
          slideToClickedSlide: true,
          spaceBetween: 22,
grabCursor: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: "bullets",
          }
        });
    }
