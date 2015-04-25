var APP = APP || {};
(function(app) {

    var canonicals = {

        closures: [750486],
        asynchronous: [14220321],
        inheritance: [11072556, 7486825]

    };

    var ids = Object.keys(canonicals).map(function(category) {
        return canonicals[category].join(';');
    });

    app.xhr.fetch(ids.join(';')).then(function success(questions) {
        questions.items.forEach(function(question) {
            Object.keys(canonicals).forEach(function(category) {
                canonicals[category].forEach(function(q, i) {
                    //they see me nesting...
                    if (q === question.question_id) {
                        canonicals[category][i] = question;
                    }
                });
            });
        });

        document.body.appendChild(app.dom.h1('List of canonicals'));

        var sections = Object.keys(canonicals).map(function(category) {
            return app.dom.section({ class: 'category' }, [
                app.dom.h2(category),
                app.dom.ul(canonicals[category].map(function(question) {
                    return app.dom.li([createQuestionElement(question)]);
                }))
            ]);
        });

        document.body.appendChild(app.dom.div({ class: 'canonicals' }, sections));
        document.body.appendChild(app.dom.div('Number of remaining API calls before meltdown: ' + questions.quota_remaining));
    }, function error(reasons) {
        document.body.appendChild(app.dom.div('Something went pearshaped because ' + reasons));
    });

    function createQuestionElement(question) {
        return app.dom.div([
            app.dom.span({ class: 'score' }, question.score),
            app.dom.a({ href: question.link, target: '_blank' }, question.title),
            app.dom.div({ class: 'tags' }, question.tags.map(function(tag) { return app.dom.span(tag) }))
        ]);
    }

}(APP));
