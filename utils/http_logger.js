export function attachSuperagentLogger(req) {
    const callback = req.callback;
    console.log('%s %s %s',
        req.method.padEnd('delete'.length, " "),
        req.url,
        '(pending)'
    );

    req.callback = function(err, res) {
        console.log('%s %s %s',
            req.method.padEnd('delete'.length, " "),
            req.url,
            res ? res.status : '-'
        );
        callback.call(req, err, res);
    };
}
