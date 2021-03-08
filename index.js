'use strict';

const app = () => {
  const upBtn = document.querySelector('.btn-up');

  const fixedControls = () => {
    const controls = document.querySelector('.controls');


    window.addEventListener('scroll', () => {
      if (pageYOffset > 200) {
        controls.classList.add('controls_fixed');
        upBtn.classList.add('btn-up_show');
      } else if (pageYOffset < 200) {
        controls.classList.remove('controls_fixed');
        upBtn.classList.remove('btn-up_show');
      }
    })
  };

  upBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });

  fixedControls();
};

app();