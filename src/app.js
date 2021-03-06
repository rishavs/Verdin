"use strict";

import Utils        from './services/Utils.js'

import Home         from './views/pages/Home.js'
import Explore      from './views/pages/Explore.js'
import About        from './views/pages/About.js'
import Error404     from './views/pages/Error404.js'
import PostNew      from './views/pages/PostNew.js'
import PostShow     from './views/pages/PostShow.js'
import Profile      from './views/pages/Profile.js'
import Login        from './views/pages/Login.js'
import Logout       from './views/pages/Logout.js'
import Register     from './views/pages/Register.js'
import Account      from './views/pages/Account.js'

import Navbar       from './views/components/Navbar.js'
import Bottombar    from './views/components/Bottombar.js' 

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'                 : Home
    , '/about'          : About
    , '/p/:param'       : PostShow
    , '/p/new'          : PostNew
    , '/login'          : Login
    , '/register'       : Register
    , '/logout'         : Logout
    , '/t/:param'       : Explore
    // , '/u/me/'     : Logout
    , '/me/account'   : Account
    // , '/u/me/posts'     : Logout
    // , '/u/me/comments'     : Logout
    // , '/u/:param/'     : Logout
    // , '/u/:param/posts'     : Logout
    // , '/u/:param/comments'     : Logout
    , '/u/me/profile'     : Profile
};

const progressbar_setWidth = (p) => {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.visibility = 'visible';
    progressBar.style.width = `${p}`;
}

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    document.getElementById('progress-bar').style.transition='width 1.5s';
    progressbar_setWidth('60%')


    // Lazy load view element:
    const header    = null || document.getElementById('header_container');
    const content   = null || document.getElementById('page_container');
    const footer    = null || document.getElementById('footer_container');
    
    // Render the Header, Flash and footer of the page
    header.innerHTML = await Navbar.render();
    await Navbar.control();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.control();

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()
    
    // Check if the route already exists, if it does, then render that page
    // If not then check if it is a dynamic route. If yes, then parse the url, else route to 404
    // Parse the URL and if it has an id part, change it with the string ":param"
    let parsedURL = 
        routes[location.hash.slice(1).toLowerCase() || '/']
        ?
        (location.hash.slice(1).toLowerCase() || '/')
        :
        ((request.resource ? '/' + request.resource : '/') + (request.id ? '/:param' : '') + (request.verb ? '/' + request.verb : ''))
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404

    // Client side Auth Guard
    // If the page has a onlyAllow property, reoute the page appropriately or send user to login page
    if (page.onlyAllow == 'user') {
        // console.log('Only User')
        page = window.localStorage['_user_email'] ? page : Login

    } else if (page.onlyAllow == 'anon') {
        // console.log('Only Anon')
        page = !window.localStorage['_user_email'] ? page : Home
    } 
    // load page data
    await page.load();
    // render page view
    content.innerHTML = await page.render();
    // register page controls
    await page.control();

    document.getElementById('progress-bar').style.transition='width 0.2s';
    progressbar_setWidth('100%')
  
}

// reset the progress bar to 0 when trasition is over
document.getElementById('progress-bar').addEventListener("transitionend", () => {
    // If cluase here causes the bar to reset only when the width is 100%
    if (document.getElementById('progress-bar').style.width == '100%') {
        document.getElementById('progress-bar').style.visibility = "hidden";
        document.getElementById('progress-bar').style.width = '0%';
    }
});

// Listen on hash change:
window.addEventListener('hashchange', router);

// List of all housekeepings services to run on new server request
const houseKeeping = () => {
    router()
}

// Listen on page load:
window.addEventListener('load', houseKeeping);

