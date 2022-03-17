export const getUsers = () => {

  return fetch("http://localhost:8088/users")
  .then(response => response.json())
  .then(parsedResponse => {
      // do something with response here
      return parsedResponse;
  })
}


export const getPosts = () => {

  return fetch("http://localhost:8088/posts?_sort=id&_order=desc")
  .then(response => response.json())
  .then(parsedResponse => {
      // do something with response here
      return parsedResponse;
  })
}

const loggedInUser = {
	id: 2,
	name: "Wes",
	email: "wes@wes.com"
}

export const getLoggedInUser = () => {
	return loggedInUser;
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