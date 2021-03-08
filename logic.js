'use strict';

const logic = () => {
  const postsContainer = document.querySelector('.posts');
  const filtersContainer = document.querySelector('.filters .btns');
  const sortBtn = document.querySelector('.sort-btn');
  const searchInput = document.querySelector('#search-input');

  let filtersState = [];

  const complexFilters = (data, filtersArr) => {
    let lastFiltersElem = filtersArr[filtersArr.length - 1];
    let lastIndex = filtersArr.findIndex(el => el === lastFiltersElem);
    let newData = [];

    if (filtersArr) {
      for (let i = 0; i < filtersArr.length; i++) {

        if (filtersArr.length > 1) {
          if (i === 0) {
            newData = data.filter(dataItem => dataItem.userId !== Number(parseInt(filtersArr[0])));
          } else if (i === lastIndex) {
            const finalData = newData.filter(dataItem => dataItem.userId !== Number(parseInt(lastFiltersElem)));
            return finalData;
          } else {
            let iterData = newData.filter(dataItem => dataItem.userId !== Number(parseInt(filtersArr[i])));
            newData = iterData;
          }

        } else if (filtersArr.length === 1) {
          return data.filter(dataItem => dataItem.userId !== Number(parseInt(filtersArr[0])));
        }
      }
    }
  };

  const toggleFilter = btn => {
    btn.classList.toggle('btn-filter_off');
    const btns = document.querySelectorAll('.btn.btn-filter');
    let offs = new Set();

    for (let i = 0; i < btns.length; i++) {
      if (btns[i].classList.contains('btn-filter_off')) {
        let notActiveId = btns[i].dataset.filter;
        offs.add(notActiveId);
      }
    }

    postsContainer.innerHTML = '';
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) throw Error(response.textStatus);
        return response.json();
      })
      .then(data => {
        let filtersArray = Array.from(offs);
        // Pass local filters state to the global filters state in order to
        // sync filters state all around the app
        filtersState = filtersArray;
        if (sortBtn.classList.contains('sort-btn_toggled')) {
          data = data.reverse();
        }

        // Update the data with implemented filters
        const updatedData = complexFilters(data, filtersArray);
        // If some filter(s) implemented
        if (updatedData) {
          displayPosts(updatedData);
          // If all filters are off
        } else {
          loadPosts();
        }
      })
      .catch(error => {
        console.log('Error, dude: ', error);
      })
  };

  const displayPosts = asyncData => {
    asyncData.forEach(item => {
      let post = `<div class="post">
                    <div class="post__category">${item.userId}</div>
                    <div class="post__title">${item.title}</div>
                    <div class="post__text">${item.body}</div>
                  </div>`;
      postsContainer.insertAdjacentHTML('afterbegin', post);
    });
  };

  const displayFilters = asyncData => {
    let ids = new Set();
    asyncData.forEach(item => {
      ids.add(item.userId);
    });

    let sortedIds = Array.from(ids).sort((a, b) => a - b);
    for (let id of sortedIds.reverse()) {
      let btn = `<button class="btn btn-filter" data-filter="${id}">Filter ${id}</button>`;
      filtersContainer.insertAdjacentHTML('afterbegin', btn);
    }
    const btns = document.querySelectorAll('.btn.btn-filter')
    btns.forEach(button => button.addEventListener('click', () => toggleFilter(button)));
  };

  const sortPosts = () => {
    sortBtn.classList.toggle('sort-btn_toggled');
    // Clear current posts
    postsContainer.innerHTML = '';
    if (sortBtn.classList.contains('sort-btn_toggled')) {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          if (!response.ok) throw Error(response.textStatus);
          return response.json();
        })
        .then(data => {
          const updatedData = complexFilters(data, filtersState);
          // If some filter(s) implemented
          if (updatedData) {
            displayPosts(updatedData.reverse());
            // If all filters are off
          } else {
            displayPosts(data.reverse());
          }
        })
        .catch(error => {
          console.log('Error, dude: ', error);
        })
    } else {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          if (!response.ok) throw Error(response.textStatus);
          return response.json();
        })
        .then(data => {
          const updatedData = complexFilters(data, filtersState);
          // If some filter(s) implemented
          if (updatedData) {
            displayPosts(updatedData);
            // If all filters are off
          } else {
            displayPosts(data);
          }
        })
        .catch(error => {
          console.log('Error, dude: ', error);
        })
    }
  };

  const searchInputHandler = e => {
    let { value } = e.target;
    findPosts(value);
  };

  const findPosts = value => {
    console.log(value)
  };

  const loadPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) throw Error(response.textStatus);
        return response.json();
      })
      .then(data => {
        displayPosts(data);
      })
      .catch(error => {
        console.log('Error, dude: ', error);
      })
  };

  const loadFilters = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) throw Error(response.textStatus);
        return response.json();
      })
      .then(data => {
        displayFilters(data);
      })
      .catch(error => {
        console.log('Error, dude: ', error);
      })
  };

  const addEvents = () => {
    sortBtn.addEventListener('click', sortPosts);
    searchInput.addEventListener('input', searchInputHandler);
  };


  addEvents();
  loadFilters();
  loadPosts();
};
logic();