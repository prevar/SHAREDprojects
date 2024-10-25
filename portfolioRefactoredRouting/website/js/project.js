class Project extends HTMLElement {
    constructor() {
        super();
    }

connectedCallback() {
    const title = this.getAttribute('title');
    const imgSrc = this.getAttribute('imgSrc');
    const desc = this.getAttribute('desc');
    const gitLnk = this.getAttribute('gitLnk');
    const key = this.getAttribute('key');

    this.innerHTML = `<div class="row p-3 m-3 border border-primary ${key%2==0?'bg-yellow':'bg-white'}">
        <div class="col-md-12 p-3"> 
            <div class="container">
                <div class="row">
                    <div class="col-md-6 p-3"> 
                        <img class="h-80 w-100" src=${imgSrc} alt=${title}>
                    </div>
                    <div class="col-md-6 p-3">
                        <div class="card-block px-2">
                            <h4 class="card-title">${title}</h4> <a href=${gitLnk} target="new"><i class="bi bi-github h4"></i></a>
                            <p class="card-text  pt-2">${desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
}

customElements.define('mit-project', Project);