import Utils        from './../../services/Utils.js'

let getPost = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://5bb634f6695f8d001496c082.mockapi.io/api/posts/` + id, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let PostShow = {

    render : async () => {
        let request = Utils.parseRequestURL()
        let post = await getPost(request.id)
        
        return `
            <h1> Post Id : ${post.id}</h1>
            <p> Post Title : ${post.title} </p>
            <p> Post Content : ${post.content} </p>
            <p> Post Author : ${post.name} </p>

        `
    }
    , after_render: async () => {
    }
}

export default PostShow;