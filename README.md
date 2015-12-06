Un-StartSSL-ify
===============

Removes/distrusts StartCom's certificate authorities in Firefox, desktop and
mobile.

Copyright (C) 2014-2015 Scott Zeid.  Released under the X11 License.  
<https://addons.mozilla.org/en-US/firefox/addon/un-startssl-ify/>  
<https://code.s.zeid.me/un-startssl-ify>

 

This is an addon for Firefox and Firefox for Android that removes (or in the
case of built-in certificates, distrusts) StartCom's certificate authorities
from the certificate database.  (StartCom is the company that operates a
widely-known "free" StartSSL certificate authority.)  This is necessary due to
[their hostile attitude](https://raim.codingfarm.de/blog/2014/04/12/distrusting-startssl/)
towards customers affected by [the infamous Heartbleed bug](http://heartbleed.com):
they require us to pay US$24.90 ***per certificate*** in order to have them
revoked, blaming *us* for the fact that we may have been compromised, and not
offering any waiver or discount for users who have multiple certificates with
them and cannot afford to revoke them all.

They are apparently waiving the revocation fee for (at least some) paying
customers, but that means jack shit to me.  StartCom has shown that they do not
possess any common sense whatsoever, and that they are willing to let their
users of lesser financial means suffer just because they want to make a quick
buck off of a severe security bug that even they couldn't have anticipated.
(There is *no way* it actually costs them US$24.90 just to revoke *one
certificate*.) The only solution to this problem is to **distrust StartCom**.

**Permanently.**  Because even if they change their minds in this one instance,
they have already shown that they cannot be trusted with anyone's security.

(I am aware that [revocations aren't as useful against many attacks](http://www.ahtik.com/blog/startssl-revocation-fees-will-not-matter-and-ssl-certs-are-funky_u1g8E/),
but it's better to protect users against some attacks than none.  This may also
be the reason that Mozilla and Debian have refused to remove StartCom's CAs
themselves, but I disagree with those decisions, again because some protection
is better than none.  Furthermore, if revocations weren't as broken as they are
now, I don't see how StartCom's policy would have been any different.)

This add-on does that for Firefox users, both on desktops and mobile.  While
this add-on is installed and enabled, StartCom's CA certificates will be
removed/distrusted each time the browser is started, as well as each time the
add-on is enabled.  (Disabling or removing the add-on does *not* re-trust them,
simply because I'm lazy; you will need to do that manually if you want to.)

This is useful for mobile users, as Firefox for Android doesn't have a
graphical certificate manager (you can access the desktop's one via
`chrome://pippki/content/certManager.xul`, but it's unusable on mobile), as
well as for users or organizations with multiple Firefox installations who
would like to distrust StartCom with the least effort possible.

**Note:**  After installing this add-on, some StartCom certificate authorities
may still appear in the certificate manager.  These would be built-in
certificates that cannot be removed, so instead they are distrusted.  You can
verify this by clicking on each certificate and then clicking "Edit Trust".
None of the three checkboxes should be checked.


Note to server operators who (still) use StartCom
-------------------------------------------------

Now that [Let's Encrypt](https://letsencrypt.org/) is open to the public, there
is absolutely *no excuse* to continue using StartCom.  Destroy your old private
keys and switch over **now**.  If you're worried about how the client works, a
couple of notes:

 * `letsencrypt certonly --webroot -w <web-root>` will let you get certificates
   without having to shut down your server temporarily.  Just make sure that
   paths that start with `/.well-known/acme-challenge/` get served from the
   `web-root` that you specify in the command (the client will create the
   `.well-known` subdirectory inside `web-root`).  You can also have your server
   serve *just* the ACME challenge directory from a separate web root.  The
   `certonly` part will also cause it to *only* get the certificate, so that you
   can install it manually.
 * You can also [use HAProxy and the `--tls-sni-01-port` `letsencrypt` option
   to do TLS SNI validation on a separate port from your normal HTTPS server](https://coolaj86.com/articles/lets-encrypt-with-haproxy/).
 * If you don't like giving the client root access, there are [plenty of other
   clients—and libraries for many programming languages—available](https://community.letsencrypt.org/t/list-of-client-implementations/2103).  Knock yourself out.
 * If you can't or don't want to generate certificates on the server itself,
   (at least) the official client has a manual mode that lets you do it from
   another machine.
 * If you're worried about 90-day lifetimes, they're working on making automated
   renewals easier.  In the meantime, set up a cron job.


Resources
---------

* [**Let's Encrypt**](https://letsencrypt.org/)
* [**Let's Encrypt**](https://letsencrypt.org/)
* [**Let's Encrypt**](https://letsencrypt.org/)
* [Heartbleed.com](http://www.heartbleed.com/)
* [Test your server for Heartbleed (does not check for StartSSL certificates)](https://filippo.io/Heartbleed/)
* [Distrusting StartSSL](https://raim.codingfarm.de/blog/2014/04/12/distrusting-startssl/)
* [Techdirt - "Shameful Security: StartCom Charges People To Revoke SSL Certs Vulnerable To Heartbleed"](https://www.techdirt.com/articles/20140409/11442426859/shameful-security-startcom-charges-people-to-revoke-ssl-certs-vulnerable-to-heartbleed.shtml)
* [StartCom's Heartbleed statement (via the WayBack Machine for obvious reasons)](https://goo.gl/T09jnC)
* [StartCom Forums - "Heartbleed vulnerability - is StartCom affected?" (also WayBack Machine)](https://goo.gl/TQClPk)
* [Mozilla bug #994033 - Most StartSSL certs will stay compromised (RESOLVED INVALID)](https://bugzilla.mozilla.org/show_bug.cgi?id=994033)
* [Debian bug #744027 - Please remove StartCom Certification Authority root certificate (WONTFIX)](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=744027)
* [StartCom's Wikipedia article - Response to Heartbleed](https://en.wikipedia.org/wiki/StartCom#Response_to_Heartbleed)
* [StartCom's Wikipedia article - (other) Criticism](https://en.wikipedia.org/wiki/StartCom#Criticism)
* [Here's why StartSSL revoke fees won't matter and SSL certs are funky](http://www.ahtik.com/blog/startssl-revocation-fees-will-not-matter-and-ssl-certs-are-funky_u1g8E/)
