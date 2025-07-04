import { removeFilter, filteredTags, addFilter, clearFilterTab, clearFilterTags, renderFilterTab } from "./filter.js";

function loadPage(){
  fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    renderJobs(data);
  })
  .catch(error => console.error('Error loading JSON:', error));

  function renderJobs(jobs){
    const container = document.querySelector('.js-items-container');

    container.innerHTML = '';

    jobs.forEach(job => {
      const tags = [job.role, job.level, ...job.languages, ...job.tools];

      const matchesAll = filteredTags.every(activeTag => tags.includes(activeTag));

      let trendingTagHTML = '';
      if (job.new) {
        trendingTagHTML += '<div class="new">NEW!</div>';
      }
      if (job.featured) {
        trendingTagHTML += '<div class="featured">FEATURED</div>';
      }

      const jobHTML = `
        <div class="item">
          <div class="image-container">
            <img src="${job.logo}" class="image">
          </div>
          <div class="details">
            <div class="company-title">
              <div class="company-name">${job.company}</div>
              <div class="trending-tags">${trendingTagHTML}</div>
            </div>
            <div class="job-title">${job.position}</div>
            <div class="key-points">
              <div>${job.postedAt}</div>  
              <div>&#x2022;</div>  
              <div>${job.contract}</div>  
              <div>&#x2022;</div>  
              <div>${job.location}</div>  
            </div>
          </div>
          <div class="tags-container">
            ${renderTags(job)}
          </div>
        </div>
      `;
      const toAdd = filteredTags.length === 0 || matchesAll;
      if(toAdd){
        container.innerHTML += jobHTML;
      }
    })
  }
}

function renderTags(job) {
  const tags = [job.role, job.level, ...job.languages, ...job.tools];
  return tags.map(tag => 
    `<div class="tag js-tag" data-tag="${tag}">${tag}</div>`
  ).join('');
}
document.querySelector('.js-items-container').addEventListener('click', (event) => {
  if (event.target.classList.contains('js-tag')) {
    const tag = event.target.dataset.tag;
    addFilter(tag);
  }
  loadPage();
});
document.querySelector('.js-active-tags-container').addEventListener('click', (event) => {
  if (event.target.classList.contains('js-x-mark')) {
    const activeTag = event.target.dataset.activeTag;
    removeFilter(activeTag);
  }
  loadPage();
});
document.querySelector('.js-clear-text').addEventListener('click', () => {
  clearFilterTab();
  clearFilterTags();
  loadPage();
})

renderFilterTab();
loadPage();
