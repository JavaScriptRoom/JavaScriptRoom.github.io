var APP = APP || {};
(function(app) {

    function element(name) {
        return function() {
            var e = document.createElement(name);
            var args = Array.prototype.slice.call(arguments);
            args.forEach(function(arg) {
                var type = Object.prototype.toString.call(arg);
                if (type.indexOf('Object') > -1) {
                    for (var prop in arg) {
                        if (arg.hasOwnProperty(prop)) {
                            e.setAttribute(prop, arg[prop]);
                        }
                    }
                } else if (type.indexOf('Array') > -1) {
                    arg.forEach(function(child) {
                        e.appendChild(child);
                    });
                } else if (type.indexOf('String') > -1 || type.indexOf('Number') > -1) {
                    e.innerHTML = arg;
                }
            });
            return e;
        }
    }

    app.dom = {};
    ['h1', 'h2', 'section', 'div', 'ul', 'li', 'span', 'a'].forEach(function(name) {
        app.dom[name] = element(name);
    });

}(APP));
