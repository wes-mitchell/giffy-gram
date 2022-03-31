
  import { formatDate, getLoggedInUser } from "../data/DataManager.js"
  
  export const Post = (postObject) => {
    if (getLoggedInUser().id === postObject.userId) {
    return `
      <section class="post">
        <header>
            <h2 class="post__title" id="title">${postObject.title}</h2>
        </header>
        <div>
        <img class="post__image" src="${postObject.imageURL}">
        <p class="post__tagline">${postObject.description}<br>${formatDate(postObject.timestamp)}</p>
        <p class="user">Posted by: <b>${postObject.user.name}</b></p>
        <div><button id="edit--${postObject.id}">Edit</button>
        <button id="delete--${postObject.id}">Delete</button>
        </div>
        </div>
      </section>
    `
  } else {
    return `
      <section class="post">
        <header>
            <h2 class="post__title" id="title">${postObject.title}</h2>
        </header>
        <div>
        <img class="post__image" src="${postObject.imageURL}">
        <p class="post__tagline">${postObject.description}<br>${formatDate(postObject.timestamp)}</p>
        <p class="user">Posted by: <b>${postObject.user.name}</b></p>
        </div>
      </section>
    `
    }
  }
  //post actions for next section