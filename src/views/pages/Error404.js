let Error404 = {
    onlyAllow: 'all',

    render : async () => {
        let view =  /*html*/`
            <section class="section pageEntry">
                <h1> 404 Error </h1>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;