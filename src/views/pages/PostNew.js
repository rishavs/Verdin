let get_available_tags = async () => {
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch(`http://localhost:3000/get_available_tags`, options)
        const json = await response.json();
        json.responseCode = response.status
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let create_post = async (title, link, content) => {
    const payload = {
        "title"     : title,
        "link"      : link,
        "content"   : content,
      }
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };
    try {
        const response = await fetch(`http://localhost:3000/create_post`, options)
        const json = await response.json();
        json.responseCode = response.status
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let PostNew = {
    onlyAllow: 'user',
    render : async () => {
        let view =  /*html*/`
            <section class="section pageEntry">
                <div class="field">
                    <label class="label">Title</label>
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" id="title_input" type="text" placeholder="Enter your Title of your Post">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Link (Optional)</label>
                    <p class="control has-icons-left">
                        <input class="input" id="link_input" type="text" placeholder="Enter the link to a website that you are posting about">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Tags</label>
                    <p class="control has-icons-left">
                        <input class="input" id="tags_input" type="text" placeholder="Enter at least 3 tags that describe this post">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <label class="label">Content</label>
                    <textarea class="textarea" id="content_input" placeholder="Enter a Content of your Post"></textarea>
                    <p class="help is-danger">This email is invalid</p>
                </div>

                <div class="field">
                    <p class="control">
                        <button class="button is-primary" id="newpost_submit_btn">
                        Submit
                        </button>
                    </p>
                </div>

            </section>
        `
        return view
    },
    after_render:  async () => {
        let tagStore = await get_available_tags()
        console.log(tagStore.data)

        let tags_field = document.getElementById("tags_input")
        tags_field.addEventListener ("input", async () => {
            let currentTextEntered = tags_field.value
            if (currentTextEntered.length > 2) {
                let matchedTags = tagStore.data.filter(item => {
                    return item.includes(currentTextEntered);
            });
            console.log("Found match with : " + matchedTags);
        }

        })
        document.getElementById("newpost_submit_btn").addEventListener ("click", async () => {
            let title       = document.getElementById("title_input").value;
            let link        = document.getElementById("link_input").value;
            let content     = document.getElementById("content_input").value;

            if (title =='') {
                alert (`The title cannot be empty`)
            } else {
                let result = await create_post(title, link, content)
                if (result.status == "success") {

                    // console.log(result)
                    // alert("DINGUS")
                    // TODO - if user has a back histroy, do window.history.back()
                    window.location.hash = `/p/${result.data.unqid}`
                } else if (result.code == 401) {
                    console.log(result)
                } else {
                    console.log(result)
                }

                // alert(`User with email ${email.value} was successfully submitted!`)
            }    
        })
    }
        
}

export default PostNew;