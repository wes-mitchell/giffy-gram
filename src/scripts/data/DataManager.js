import { PostList } from "../feed/PostList.js";

export const getUsers = () => {

  return fetch("http://localhost:8088/users")
  .then(response => response.json())
  .then(parsedResponse => {
      // do something with response here
      return parsedResponse;
  })
}

let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}

export const getPosts = () => {
  return fetch("http://localhost:8088/posts?_sort=id&_order=desc&_expand=user")
    .then(response => response.json())
    .then(parsedResponse => {
      // postCollection = parsedResponse
      return parsedResponse;
    })
}

let loggedInUser = {}

export const logoutUser = () => {
  loggedInUser = {}
}

export const getLoggedInUser = () => { 
  return loggedInUser
 }

 export const setLoggedInUser = (userObj) => {
  loggedInUser = userObj;
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp).toLocaleDateString("en-US")
  return date
}

export const createPost = postObj => {
  return fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(postObj)

  })
      .then(response => response.json())
}

export const deletePost = (postId) => { 
  return fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    }

  })
      .then(response => response.json())
 }

export const getSinglePost = (postId) => { 
  return fetch(`http://localhost:8088/posts/${postId}`)
  .then(response => response.json())
}

export const updatePost = (postObj) => { 
  return fetch(`http://localhost:8088/posts/${postObj.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)
 })
      .then(response => response.json())

}

export const loginUser = (userObj) => { 
  return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
  .then(response => response.json())
  .then(parsedUser => {
    console.log(("parsedUser", parsedUser)); // data is returned as an array
    if (parsedUser.length > 0) {
      setLoggedInUser(parsedUser[0]);
        return getLoggedInUser();
    } else {
      return false
    }
  })
 }
 
 export const registerUser = (userObj) => { 
   return fetch(`http://localhost:8088/users`, {
     method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
   })
   .then(response => response.json())
   .then(parsedUser => {
     setLoggedInUser(parsedUser);
     return getLoggedInUser()
   })
  }

  export const getLoggedUsersPosts = (userObj) => { 
    return fetch(`http://localhost:8088/posts?userId=${userObj.id}&_expand=user&_sort=timestamp&_order=desc`)
    .then(response => response.json())
    .then(userposts => {
      console.log(userposts);
      return userposts
    })
   }