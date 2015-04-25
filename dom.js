var APP = APP || {};
(function(app) {

    function element(name) {
        return function(attrObj, children, textContent) {
            var e = document.createElement(name);
            Object.keys(attrObj || {}).forEach(function(prop) {
                e.setAttribute(prop, attrObj[prop]);
            });
            (children || []).forEach(function(child) {
                e.appendChild(child);
            });
            if (textContent) {
                e.innerHTML = textContent;
            }
            return e;
        }
    }

    app.dom = {};
    ['h1', 'h2', 'section', 'div', 'ul', 'li', 'span', 'a'].forEach(function(name) {
        app.dom[name] = element(name);
    });

}(APP));
