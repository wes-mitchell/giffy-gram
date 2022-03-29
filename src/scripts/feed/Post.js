
  import { formatDate } from "../data/DataManager.js"
  
  export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title" id="title">${postObject.title}</h2>
        </header>
        <div>
        <img class="post__image" src="${postObject.imageURL}">
        <p class="post__tagline">${postObject.description}<br>${formatDate(postObject.timestamp)}</p>
        <div><button id="edit--${postObject.id}">Edit</button>
        <button id="delete--${postObject.id}">Delete</button>
        </div>
        </div>
      </section>
    `
  }

  //post actions for next section