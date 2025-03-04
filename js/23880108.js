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