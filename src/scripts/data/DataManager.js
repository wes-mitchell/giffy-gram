export const getUsers = () => {

  return fetch("http://localhost:8088/users")
  .then(response => response.json())
  .then(parsedResponse => {
      // do something with response here
      return parsedResponse;
  })
}


export const getPosts = () => {

  return fetch("http://localhost:8088/posts")
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