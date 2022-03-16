/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/

import { getPosts, getUsers } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { footer } from "./footer/footer.js"

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


const startGiffyGram = () => {
	showPostList();
  showNavBar()
  showFooter()
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
    console.log(`the id is ${event.target.id.split('--')[1]}`)
  }
})

// applicationElement.addEventListener("click", event => {
//   let header = document.querySelector(".title")
//    if (event.target.id === "title") {
//      header.innerHTML = header.replace("what happened")
//   }
//   return header
// })