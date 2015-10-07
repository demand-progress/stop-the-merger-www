(function() { // Begin closure




// Share text
var DOMAIN = "fightbigmoney.com";
var TWEET_TEXT = "I just called on the presidential candidates to lay out a concrete plan to #FightBigMoney in politics! Join here: http://" + DOMAIN + "/?ref=${source}-twshare";
var EMAIL_SUBJECT = "Sign this petition to fight big money in politics?";
var EMAIL_BODY = "Hi,\
\n\n\
I just signed the petition telling the presidential candidates to lay out a concrete, serious plan to fight big money in politics.\
\n\n\
The only way we'll make progress is if candidates know the American people are demanding a change. Could you sign, too?\
\n\n\
http://www." + DOMAIN + "/?source=${source}-emailshare\
\n\n\
Thanks!";






// Organizations
var organizations = [
    {
        "disclaimer": true,
        "id": "maverick",
        "isPooling": true,
        "title": "Maverick",
    },

    {
        "disclaimer": true,
        "id": "dp",
        "isPooling": true,
        "title": "Demand Progress",
    },

    {
        "disclaimer": true,
        "id": "dp-ns",
        "isPooling": false,
        "title": "Demand Progress",
    },

    {
        "disclaimer": "<a href=\"http://www.fightforthefuture.org/\" target=\"_blank\">Fight for the Future</a> will contact you about future campaigns. <a href=\"http://www.fightforthefuture.org/privacy/\" target=\"_blank\">Privacy Policy</a>.</p>",
        "id": "fftf",
        "isPooling": true,
        "title": "Fight for the Future",
    },

    {
        "disclaimer": "<a href=\"http://www.fightforthefuture.org/\" target=\"_blank\">Fight for the Future</a> will contact you about future campaigns. <a href=\"http://www.fightforthefuture.org/privacy/\" target=\"_blank\">Privacy Policy</a>.</p>",
        "id": "fftf-ns",
        "isPooling": false,
        "title": "Fight for the Future",
    },

    {
        "disclaimer": true,
        "id": "dk",
        "isPooling": true,
        "title": "Daily Kos",
    },

    {
        "disclaimer": true,
        "id": "om",
        "isPooling": true,
        "title": "OpenMedia",
    },

    {
        "disclaimer": true,
        "id": "cc",
        "isPooling": true,
        "title": "Color of Change",
    },

    {
        "disclaimer": true,
        "id": "ra",
        "isPooling": true,
        "title": "RootsAction",
    },

    {
        "disclaimer": true,
        "id": "wd",
        "isPooling": true,
        "title": "Watchdog.net",
    },
];

var ref = location.search.match(/ref=([\w-]+)/);
var org;
if (ref) {
    for (var i = 0; i < organizations.length; i++) {
        if (ref[1] === organizations[i].id) {
            org = organizations[i];
            break;
        }
    }
}

var maverick = false;
if (!org) {
    maverick = true;
    org = organizations[0];
}



// Check for outdated browsers
var isIE = navigator.userAgent.match(/MSIE (\d+)\./);
if (isIE) {
    var version = +isIE[1];
    if (version < 10) {
        alert('Unfortunately your browser, Internet Explorer ' + version + ', is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
    }
}

if (navigator.userAgent.match(/Android 2\.3/)) {
    alert('Unfortunately your browser, Android 2.3, is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
}



// Fill in dynamic form fields
document.querySelector('[name=action_user_agent]').value = navigator.userAgent;
document.querySelector('[name=source]').value = org.id;
document.querySelector('[name=url]').value = location.href;



var requiredFields = [
    'email',
    'postcode',
];

document.querySelector('.email_signup form').addEventListener('submit', function(e) {
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];

        if (!document.getElementById(field).value) {
            e.preventDefault();
            alert('Please enter your ' + field.replace(/_/g, ' ') + '.');
            return document.getElementById(field).focus();
        }
    }

    // document.activeElement.blur();
    // var thanks = document.getElementById('thanks');
    // document.querySelector('form button').setAttribute('disabled', true);
    // thanks.style.display = 'block';
    // thanks.clientWidth;
    // thanks.style.opacity = 1;

    // // Send to Queue
    // var xhr1 = new XMLHttpRequest();
    // xhr1.onreadystatechange = function() {
    //     if (xhr1.readyState === 4) {
    //         // console.log('response:', xhr1.response);
    //     }
    // };
    // xhr1.open('post', 'https://queue.fightforthefuture.org/action', true);
    // xhr1.send(data);

    // modal_show('thank-you');
    // document.querySelector('input[type=tel]').focus();
}, false);

function modal_show(id) {
    var overlayNode = document.getElementById(id);
    overlayNode.style.display = 'table';
    setTimeout(function() {
        overlayNode.className = overlayNode.className.replace(/ ?invisible ?/, ' ');
    }, 50);
};

function modal_hide(id) {
    var overlayNode = document.getElementById(id);
    overlayNode.className += 'invisible';
    setTimeout(function() {
        overlayNode.style.display = 'none';
    }, 400);
}

var bindModalEvents = function(modal, permanent) {
    modal = document.getElementById(modal);

    if (!modal)
        return;

    var closeButton = modal.querySelector('.modal .close');

    if (permanent) {
        closeButton.parentElement.removeChild(closeButton);
        return;
    }

    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        modal_hide(modal.id);
    }, false);

    modal.querySelector('.gutter').addEventListener('click', function(e) {
        if (e.target === e.currentTarget) {
            e.preventDefault();
            modal_hide(modal.id);
        }
    }, false);
}
bindModalEvents('confirmed', true);
bindModalEvents('goodbye_modal', true);
bindModalEvents('letter');
bindModalEvents('sent');
bindModalEvents('share_modal');

var fb = document.querySelectorAll('a.facebook');
for (var i = 0; i < fb.length; i++) {
    fb[i].addEventListener('click', function(e) {
        e.preventDefault();
        window.open(
            'https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(DOMAIN + '/?source=' + org.id + '-fbshare')
        );
    }, false);
}

var tws = document.querySelectorAll('a.twitter');
for (var i = 0; i < tws.length; i++) {
    tws[i].addEventListener('click', function(e) {
        e.preventDefault();
        window.open(
            'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent(
                TWEET_TEXT.replace('${source}', org.id)
            )
        );
    }, false);
}

var ems = document.querySelectorAll('a.email');
for (var i = 0; i < ems.length; i++) {
    ems[i].addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href =
            'mailto:?subject=' + encodeURIComponent(EMAIL_SUBJECT) +
            '&body=' + encodeURIComponent(
                EMAIL_BODY.replace('${source}', org.id)
            );
    }, false);
}

document.querySelector('button.add-your-name').addEventListener('click', function(e) {
    e.preventDefault();
    location.hash = 'add-your-name';
});

function removeNode(target) {
    var node = document.querySelector(target);
    node.parentElement.removeChild(node);
}

var disclaimer = document.querySelector('.disclaimer');
if (org.isPooling) {
    if (org.disclaimer === false) {
        removeNode('.disclaimer');
    }
} else {
    removeNode('.squaredFour.pooling');
    document.querySelector('.disclaimer').innerHTML = org.disclaimer;
}

var resizeTimeout = false;
window.addEventListener('resize', function(e) {
    resizeTimeout = setTimeout(onResize, 300);
}, false);

function onResize() {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.maxHeight = innerHeight + 'px';
    }
}

if (window.location.href.indexOf('dropoff=1') != -1) {
    window.location.href = '#dropoff';
}

function directOpenCallModal() {
    document.getElementById('call_header').textContent = 'Enter your phone number and we\'ll connect you.';
    modal_show('call_tool');
}
if (window.location.href.indexOf('call=1') != -1) {
    directOpenCallModal()
}

// Hashes
if (location.hash === '#confirmed') {
    modal_show('confirmed');
    showThanks();
} else if (location.hash === '#sent') {
    modal_show('sent');
    showThanks();
}

function showThanks() {
    var thanks = document.getElementById('thanks');
    document.querySelector('form button').setAttribute('disabled', true);
    thanks.style.display = 'block';
    thanks.style.opacity = 1;
}



})(); // End closure
