/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/

import { getLoggedInUser, getPosts, getUsers, createPost, usePostCollection, 
          deletePost, updatePost, getSinglePost, logoutUser, 
          setLoggedInUser, loginUser, registerUser, getLoggedUsersPosts } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { footer } from "./footer/footer.js"
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";

const postElement = document.querySelector(".postList")
const yearSelected = document.querySelector("#yearSelection")
let postCount = document.getElementById("postCount")

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	// const postElement = document.querySelector(".postList");
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

const checkForUser = () => { 
  if (sessionStorage.getItem("user")) {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
    startGiffyGram();
  } else {
    showLoginRegister()
  }
 }

 const showLoginRegister = () => {
   showNavBar()
   const entryElement = document.querySelector(".entryForm")
   entryElement.innerHTML = `${LoginForm()} <hr> ${RegisterForm()}`
   const postElement = document.querySelector(".postList")
   postElement.innerHTML = ''
 }


const startGiffyGram = () => {
	showPostList();
  showNavBar()
  showFooter()
  showPostEntry()
}

checkForUser()

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
	sessionStorage.clear();
  checkForUser();
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
  if (event.target.id === "newPost__cancel") {
      //clear the input fields
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "logout") {
    logoutUser();
    console.log(getLoggedInUser());
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "myposts") {
    console.log("tight");
    const currentUser = getLoggedInUser()
    getLoggedUsersPosts(currentUser).then(response => {
    postElement.innerHTML = PostList(response)
  })
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
        userId: getLoggedInUser().id,
        timestamp: Date.now()
    }
      createPost(postObject)
      .then(showPostList)
      clearEntry()
  }
})

const showFilteredPosts = (year) => {
  //get a copy of the post collection
  const epoch = Date.parse(`01/01/${year}`);
  //filter the data
  const filteredData = usePostCollection().filter(singlePost => {
    if (singlePost.timestamp >= epoch) {
      return singlePost
    }
  })
  postElement.innerHTML = PostList(filteredData);
  // postCount.value = filteredData.length
}

applicationElement.addEventListener("change", event => {
  if (event.target.id === "yearSelection") {
    const yearAsNumber = parseInt(event.target.value)
    // console.log(`User wants to see posts since ${yearAsNumber}`)
    //invoke a filter function passing the year as an argument
    showFilteredPosts(yearAsNumber);
  }
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("delete")) {
    const postId = event.target.id.split("--")[1];
    deletePost(postId)
    .then(response => {
      showPostList()
    })
  }
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("edit")) {
    const postId = event.target.id.split("--")[1];
    getSinglePost(postId)
      .then(response => {
        showEdit(response);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      })
  }
})

const showEdit = (postObj) => {
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEdit(postObj);
}

applicationElement.addEventListener("click", event => {
  if (event.target.id.startsWith("updatePost")) {
    const postId = event.target.id.split("__")[1];
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
        timestamp: Date.now(),
        id: parseInt(postId)
    }

    updatePost(postObject)
      .then(response => {
        showPostList();
      })
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "newPost__cancel") {
    clearEntry()
    showPostEntry()
  }
})

applicationElement.addEventListener("click", event => {
  // event.preventDefault();
  if (event.target.id === "login__submit") {
    const userObject = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value
    }
    loginUser(userObject)
    .then(dbUserObj => {
      if (dbUserObj) {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
      } else {
        const entryElement = document.querySelector(".entryForm")
        entryElement.innerHTML = `<p class="center">That user doesn't exist dawg!!! Try again or register for that free account we offered up. &#129335</p> ${LoginForm()} <hr> ${RegisterForm()}`
      }
    })
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "register__submit") {
    const userObj = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value
    }
    registerUser(userObj)
    .then(dbUserObj => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram()
    })
  }
})


