export let filteredTags = JSON.parse(localStorage.getItem('filteredTags')) || [];

export function addFilter(tag){
  let matchingTag = 0;
  filteredTags.forEach((addedTag) => {
    if((tag === addedTag)){
      matchingTag = 1;
    }
  });
  if(!(matchingTag)){
    filteredTags.push(tag);
    clearFilterTab();
    renderFilterTab();
    saveFilterToStorage();
  }

}

export function removeFilter(tag){
  let i = 0;
  let matchingIndex;
  filteredTags.forEach((addedTag) => {
    if((tag === addedTag)){
      matchingIndex = i;
    }
    i+= 1;
  });

  filteredTags.splice(matchingIndex, 1);
  clearFilterTab();
  renderFilterTab();
  saveFilterToStorage();
}

export function renderFilterTab(){
  const container = document.querySelector('.js-active-tags-container');

  filteredTags.forEach((activeTag) => {

    const activeTagsHTML = `
    <div class="active-tag js-active-tag" data-active-tag="${activeTag}">
      <div class="tag-text">${activeTag}</div>
      <img class="x-mark js-x-mark" data-active-tag="${activeTag}" src="images/xmark-solid.svg">
    </div>
    `;
  
    container.innerHTML += activeTagsHTML;
  })
}
export function clearFilterTab(){
  const container = document.querySelector('.js-active-tags-container');
  container.innerHTML = '';
}
export function clearFilterTags(){
  filteredTags = [];
  localStorage.setItem('filteredTags', JSON.stringify(filteredTags));
}
function saveFilterToStorage(){
  localStorage.setItem('filteredTags', JSON.stringify(filteredTags));
}