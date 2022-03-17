/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/

import { getLoggedInUser, getPosts, getUsers, createPost } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { footer } from "./footer/footer.js"
import { PostEntry } from "./feed/PostEntry.js";

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
  //Get a reference to the location on the DOM where the nav will display
  const navElement = document.querySelector("nav");
navElement.innerHTML = NavBar();
}

const showFooter = () => { 
  const footEl = document.querySelector("footer")
  footEl.innerHTML = footer()
 }

 const showPostEntry = () => { 
  //Get a reference to the location on the DOM where the nav will display
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEntry();
}


const startGiffyGram = () => {
	showPostList();
  showNavBar()
  showFooter()
  showPostEntry()
}

startGiffyGram();

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

applicationElement.addEventListener("change", event => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value)

    console.log(`User wants to see posts since ${yearAsNumber}`)
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "directMessageIcon") {
    alert(`Dang, you slidin in DM's now? Are you positive?`)
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "pb") {
    alert(`Back to the OG state eh? Nice.`)
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id.startsWith("edit")) {
    alert("what you tryn to change?")
    console.log("post clicked", event.target.id.split('--'))
    console.log("the id is", event.target.id.split('--')[1])
  }
})
applicationElement.addEventListener("click", event => {
  if (event.target.id === "newPost__cancel") {
      //clear the input fields
  }
})

const clearEntry = () => {  
document.querySelector("input[name='postTitle']").value = ''
document.querySelector("input[name='postURL']").value = ''
document.querySelector("textarea[name='postDescription']").value = ''
}

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "newPost__submit") {
  //collect the input values into an object to post to the DB
    const title = document.querySelector("input[name='postTitle']").value
    const url = document.querySelector("input[name='postURL']").value
    const description = document.querySelector("textarea[name='postDescription']").value
    //we have not created a user yet - for now, we will hard code `1`.
    //we can add the current time as well
    const postObject = {
        title: title,
        imageURL: url,
        description: description,
        userId: getLoggedInUser.id,
        timestamp: Date.now()
    }
      createPost(postObject)
      .then(showPostList)
      clearEntry()
  }
})

// const clear
// applicationElement.addEventListener("click", event => {
//   const title = document.querySelector("input[name='postTitle']")
//   const url = document.querySelector("input[name='postURL']")
//   const description = document.querySelector("textarea[name='postDescription']")
//   event.preventDefault()
//   if (event.target.id === "newPost__submit") {
//     showPostList()
//     title.value = ''
//     url.value = ''
//     description.value = ''
//   }
// })
