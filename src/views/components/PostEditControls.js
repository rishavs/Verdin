let PostEditControls = {
    render: async (title, link, content) => {
        let view =  /*html*/`
        <article>
            <div class="field">
                <label class="label">Title</label>
                <p class="control has-icons-left has-icons-right">
                    <input class="input" id="title_input" type="text" placeholder="Enter your Title of your Post" value="${title}">
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
                    <input class="input" id="link_input" type="text" placeholder="Enter the link to a website that you are posting about" value="${link}">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
                <p class="help is-danger">This email is invalid</p>
            </div>

            <div class="field">
                <label class="label">Content</label>
                <textarea class="textarea" id="content_input" placeholder="Enter a Content of your Post" >${content}</textarea>
                <p class="help is-danger">This email is invalid</p>
            </div>

            <div class="field">
                <p class="control">
                    <button class="button is-primary" id="newpost_submit_btn">
                    Submit
                    </button>
                </p>
            </div>
        </article>
        `
        return view
    },
    after_render: async () => { }

}

export default PostEditControls;