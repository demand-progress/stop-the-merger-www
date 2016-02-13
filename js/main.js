(function() { // Begin closure




// Share text
var DOMAIN = window.DOMAIN || "nomoremergers.com";
var TWEET_TEXT = "I just called on the @FCC to stop the #CharterTWC merger! Join here: http://" + DOMAIN + "?source=${source}-twshare #NoMoreMergers";
var EMAIL_SUBJECT = "Sign this petition to stop the Charter-Time Warner Cable merger?";
var EMAIL_BODY = "Hi,\
\n\n\
I just called on the FCC to stop the Charter-Time Warner Cable merger! Join here: http://" + DOMAIN + "?source=${source}-emailshare\
\n\n\
Thanks!";







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
document.querySelector('[name=source]').value = StaticKit.query.source;
document.querySelector('[name=url]').value = location.href;

// Update swappable field based on source
var nonSwapSources = [
    'fromcredons',
    'fromopenmedians',
];
if (nonSwapSources.indexOf(StaticKit.query.cleanedSource) > -1) {
    removeNode('.squaredFour');
    removeNode('#logos');

    document.querySelector('.specific-logos').style.display = 'block';
    document.querySelector('.specific-logos a.' + StaticKit.query.cleanedSource).style.display = 'inline';
    document.querySelector('.disclaimer.no-swap').style.display = 'block';
}


var requiredFields = [
    'name',
    'address1',
    'email',
    'postcode',
];

document.querySelector('.email_signup form').addEventListener('submit', function(e) {
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];

        if (!document.getElementById(field).value || !document.getElementById(field).value.trim()) {
            e.preventDefault();
            var el = document.getElementById(field);
            alert('Please enter your ' + el.getAttribute('placeholder') + '.');
            return el.focus();
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

var fbs = document.querySelectorAll('a.facebook');
for (var i = 0; i < fbs.length; i++) {
    fbs[i].setAttribute('target', '_blank');
    fbs[i].setAttribute(
        'href',

        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(DOMAIN + '?source=' + StaticKit.query.cleanedSource + '-fbshare')
    );
}

var tws = document.querySelectorAll('a.twitter');
for (var i = 0; i < tws.length; i++) {
    tws[i].setAttribute('target', '_blank');
    tws[i].setAttribute(
        'href',

        'https://twitter.com/intent/tweet?text=' +
        encodeURIComponent(
            TWEET_TEXT.replace('${source}', StaticKit.query.cleanedSource)
        )
    );
}

var ems = document.querySelectorAll('a.email');
for (var i = 0; i < ems.length; i++) {
    // ems[i].setAttribute('target', '_blank');
    ems[i].setAttribute(
        'href',

        'mailto:?subject=' + encodeURIComponent(EMAIL_SUBJECT) +
        '&body=' + encodeURIComponent(
            EMAIL_BODY.replace('${source}', StaticKit.query.cleanedSource)
        )
    );
}

document.querySelector('a.the-letter').addEventListener('click', function(e) {
    e.preventDefault();
    modal_show('letter');
});

function removeNode(target) {
    var node = document.querySelector(target);
    node.parentElement.removeChild(node);
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
    location.hash = '';
} else if (location.hash === '#sent') {
    modal_show('sent');
    showThanks();
    location.hash = '';
}

function showThanks() {
    var thanks = document.getElementById('thanks');
    document.querySelector('form button').setAttribute('disabled', true);
    thanks.style.display = 'block';
    thanks.style.opacity = 1;
}



// Scroll to anchors
var links = document.querySelectorAll(".animated-scroll");
var i = links.length;
var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
var easeInOutCubic = function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
    }

    return c / 2 * ((t -= 2) * t * t + 2) + b;
}

while (i--) {
    links.item(i).addEventListener("click", function(e) {
        var startTime;
        var startPos = root.scrollTop;
        var targetId = this.getAttribute('data-target');
        var endPos = document.getElementById(targetId).getBoundingClientRect().top;
        var maxScroll = root.scrollHeight - window.innerHeight;
        var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos;
        var duration = 900;
        var scroll = function(timestamp) {
            startTime = startTime || timestamp;
            var elapsed = timestamp - startTime;
            var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration);
            root.scrollTop = progress;
            elapsed < duration && requestAnimationFrame(scroll);
        }
        requestAnimationFrame(scroll);
        e.preventDefault();
    });
}



})(); // End closure
