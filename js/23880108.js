const API = 'https://web1-api.vercel.app/api';

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