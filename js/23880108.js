const API = 'https://web1-api.vercel.app/api';
const AUTHENTICATE_API = 'https://web1-api.vercel.app/users';

async function loadData(req, templateId, viewId) {
    const res = await fetch(`${API}/${req}`);
    const data = await res.json();

    var source = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var context = { data: data };
    var view = document.getElementById(viewId);
    view.innerHTML = template(context);
}

async function loadBlogs(req, currentPage = 1) {
    const res = await fetch(`${API}/${req}?page=${currentPage}`);
    const context = await res.json();
    context.currentPage = currentPage;
    context.request = req;

    var source = document.getElementById('blogs-template').innerHTML;
    var template = Handlebars.compile(source);

    var view = document.getElementById('blogs');
    view.innerHTML = template(context);
}

async function getAuthenticateToken(username, password) {
    let res = await fetch(`${AUTHENTICATE_API}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    let result = await res.json();
    if (res.status == 200) {
        return result.token;
    }
    throw new Error(result.message);
}