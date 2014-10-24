// note: "'Connection': 'Keep-Alive'" is usually removed by the Proxy
// note: Proxy also adds (or replaces) "Cache-Control: max-age=259200"

var headers = [{
    id: 'Chrome/',
    headers: {
        // 'Host': '',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4)' +
        //     ' AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        //'Accept-Encoding': 'gzip,deflate,sdch', // we don't support sdch
        'Accept-Language': 'en-US,en;q=0.8',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3'
    }
}, {
    id: 'Safari/',
    headers: {
        // 'Host': '',
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4)' +
        //     ' AppleWebKit/536.25 (KHTML, like Gecko) Version/6.0 Safari/536.25',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us',
        'Connection': 'keep-alive'
    }
}, {
    id: 'Opera/',
    headers: {
        // 'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.7.4; U; en)' +
        //     ' Presto/2.10.229 Version/11.64',
        // 'Host': '',
        'Accept': 'text/html, application/xml;q=0.9, application/xhtml+xml,' +
            ' image/png, image/webp, image/jpeg, image/gif, image/x-xbitmap, */*;q=0.1',
        'Accept-Language': 'en,en-US;q=0.9,ja;q=0.8,fr;q=0.7,de;q=0.6,es;q=0.5,it;q=0.4,' +
            'pt;q=0.3,pt-PT;q=0.2,nl;q=0.1,sv;q=0.1,nb;q=0.1,da;q=0.1,fi;q=0.1,ru;q=0.1,' +
            'pl;q=0.1,zh-CN;q=0.1,zh-TW;q=0.1,ko;q=0.1',
        'Connection': 'Keep-Alive'
    }
}, {
    id: 'Trident/',
    headers: {
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Accept-Language': 'en-US',
        // 'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
        // 'Host': '',
        'Connection': 'Keep-Alive'
    }
}, {
    id: 'Firefox/',
    headers: {
        // 'Host': '',
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:11.0) Gecko/20100101 Firefox/11.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Connection': 'keep-alive'
    }
}];

function rnd(a, b) {
    //calling rnd() with no arguments is identical to rnd(0, 100)
    a = a || 0;
    b = b || 100;

    if (typeof b === 'number' && typeof a === 'number') {
        //rnd(int min, int max) returns integer between min, max
        return (function (min, max) {
            if (min > max) {
                throw new RangeError('expected min <= max; got min = ' + min + ', max = ' + max);
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }(a, b));
    }

    if (Object.prototype.toString.call(a) === "[object Array]") {
        //returns a random element from array (a), even weighting
        return a[Math.floor(Math.random() * a.length)];
    }

    if (a && typeof a === 'object') {
        //returns a random key from the passed object; keys are weighted by the decimal probability in their value
        return (function (obj) {
            var rand = rnd(0, 100) / 100,
                min = 0,
                max = 0,
                key, return_val;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    max = obj[key] + min;
                    return_val = key;
                    if (rand >= min && rand <= max) {
                        break;
                    }
                    min = min + obj[key];
                }
            }

            return return_val;
        }(a));
    }

    throw new TypeError('Invalid arguments passed to rnd. (' + (b ? a + ', ' + b : a) + ')');
}

function randomLang() {
    return rnd(['AB', 'AF', 'AN', 'AR', 'AS', 'AZ', 'BE', 'BG', 'BN', 'BO', 'BR', 'BS', 'CA', 'CE', 'CO', 'CS',
                'CU', 'CY', 'DA', 'DE', 'EL', 'EN', 'EO', 'ES', 'ET', 'EU', 'FA', 'FI', 'FJ', 'FO', 'FR', 'FY',
                'GA', 'GD', 'GL', 'GV', 'HE', 'HI', 'HR', 'HT', 'HU', 'HY', 'ID', 'IS', 'IT', 'JA', 'JV', 'KA',
                'KG', 'KO', 'KU', 'KW', 'KY', 'LA', 'LB', 'LI', 'LN', 'LT', 'LV', 'MG', 'MK', 'MN', 'MO', 'MS',
                'MT', 'MY', 'NB', 'NE', 'NL', 'NN', 'NO', 'OC', 'PL', 'PT', 'RM', 'RO', 'RU', 'SC', 'SE', 'SK',
                'SL', 'SO', 'SQ', 'SR', 'SV', 'SW', 'TK', 'TR', 'TY', 'UK', 'UR', 'UZ', 'VI', 'VO', 'YI', 'ZH']);
}

function randomBrowserAndOS() {
    var browser = rnd({
            chrome: .45132810566,
            firefox: .27477061836,
            iexplorer: .19384170608,
            safari: .06186781118,
        }),
        os = {
            chrome: {
                win: .89,
                mac: .09,
                lin: .02
            },
            firefox: {
                win: .83,
                mac: .16,
                lin: .01
            },
            safari: {
                win: .04,
                mac: .96
            },
            iexplorer: ['win']
        };

    return [browser, rnd(os[browser])];
}

function randomProc(arch) {
    var procs = {
        lin: ['i686', 'x86_64'],
        mac: {
            'Intel': .48,
            'PPC': .01,
            'U; Intel': .48,
            'U; PPC': .01
        },
        win: ['', 'WOW64', 'Win64; x64']
    };
    return rnd(procs[arch]);
}

function randomRevision(dots) {
    var return_val = '';
    //generate a random revision
    //dots = 2 returns .x.y where x & y are between 0 and 9
    for (var x = 0; x < dots; x++) {
        return_val += '.' + rnd(0, 9);
    }
    return return_val;
}

var version_string = {
    net: function () {
        return [rnd(1, 4), rnd(0, 9), rnd(10000, 99999), rnd(0, 9)].join('.');
    },
    nt: function () {
        return rnd(5, 6) + '.' + rnd(0, 3);
    },
    ie: function () {
        return rnd(9, 11);
    },
    trident: function () {
        return rnd(3, 7) + '.' + rnd(0, 1);
    },
    osx: function (delim) {
        return [10, rnd(5, 10), rnd(0, 9)].join(delim || '.');
    },
    chrome: function () {
        return [rnd(35, 39), 0, rnd(800, 899), 0].join('.');
    },
    safari: function () {
        return rnd(531, 538) + '.' + rnd(0, 2) + '.' + rnd(0, 2);
    }
};

var browser = {
    firefox: function firefox(arch) {
        //https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
        var firefox_ver = rnd(26, 32) + randomRevision(2),
            gecko_ver = 'Gecko/20100101 Firefox/' + firefox_ver,
            proc = randomProc(arch),
            os_ver = (arch === 'win') ? '(Windows NT ' + version_string.nt() + ((proc) ? '; ' + proc : '') : (
                arch === 'mac') ? '(Macintosh; ' + proc + ' Mac OS X ' + version_string.osx() : '(X11; Linux ' +
            proc;

        return 'Mozilla/5.0 ' + os_ver + '; rv:' + firefox_ver.slice(0, -2) + ') ' + gecko_ver;
    },

    iexplorer: function iexplorer() {
        var ver = version_string.ie();

        if (ver >= 11) {
            //http://msdn.microsoft.com/en-us/library/ie/hh869301(v=vs.85).aspx
            return 'Mozilla/5.0 (Windows NT 6.' + rnd(1, 3) + '; Trident/7.0; ' + rnd(['Touch; ', '']) +
                'rv:11.0) like Gecko';
        }

        //http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx
        return 'Mozilla/5.0 (compatible; MSIE ' + ver + '.0; Windows NT ' + version_string.nt() + '; Trident/' +
            version_string.trident() + ((rnd(0, 1) === 1) ? '; .NET CLR ' + version_string.net() : '') + ')';
    },

    safari: function safari(arch) {
        var safari = version_string.safari(),
            ver = rnd(7, 8) + '.' + rnd(0, 1) + '.' + rnd(0, 10),
            os_ver = (arch === 'mac') ? '(Macintosh; ' + randomProc('mac') + ' Mac OS X ' + version_string.osx(
                '_') + ' rv:' + rnd(7, 8) + '.0; ' + randomLang() + ') ' : '(Windows; U; Windows NT ' +
            version_string.nt() + ')';

        return 'Mozilla/5.0 ' + os_ver + 'AppleWebKit/' + safari + ' (KHTML, like Gecko) Version/' + ver +
            ' Safari/' + safari;
    },

    chrome: function chrome(arch) {
        var safari = version_string.safari(),
            os_ver = (arch === 'mac') ? '(Macintosh; ' + randomProc('mac') + ' Mac OS X ' + version_string.osx(
                '_') + ') ' : (arch === 'win') ? '(Windows; U; Windows NT ' + version_string.nt() + ')' :
            '(X11; Linux ' + randomProc(arch);

        return 'Mozilla/5.0 ' + os_ver + ' AppleWebKit/' + safari + ' (KHTML, like Gecko) Chrome/' +
            version_string.chrome() + ' Safari/' + safari;
    }
};

exports.generate = function generate() {
    var random = randomBrowserAndOS();
    return browser[random[0]](random[1]);
};

exports.getHeadersForUserAgent = function (ua) {
    for (var i = 0, h = headers; i < h.length; i++) {
        var v = h[i];
        if (ua.indexOf(v.id) !== -1) {
            return v.headers;
        }
    }
    return {};
};
