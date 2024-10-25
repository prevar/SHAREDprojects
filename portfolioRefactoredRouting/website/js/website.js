//Called when user clicks on a different tab
async function loadPage() {
  // fetch the page, use await
  console.log('in load page');
  let page = location.hash.replace('#', '');
  loadSpecifiedPage(page, 'content');
}

//Used to load a specific page into the placeholderDiv Element
async function loadSpecifiedPage(page,placeholderDiv) {
  const res = await fetch(page);
  // get text from res, use await
  const content = await res.text();
  // get the element with id 'content'
  const element = document.getElementById(placeholderDiv);
  ReactDOM.unmountComponentAtNode(element);
  // set innerHTML of the element
  if (page == 'projects.html') {
    ReactDOM.render(<App/> , document.getElementById('content'));
  } else {
    element.innerHTML = content;
  }
  // your code goes here
}

//Initial load - Add navigation/contact and profile page
loadSpecifiedPage('nav.html', 'nav')
loadSpecifiedPage('profile.html', 'content')
loadSpecifiedPage('contact.html', 'contact')

//Add window listener for when the user clicks on any of the profile/Projects tab
window.addEventListener('hashchange',loadPage);
  