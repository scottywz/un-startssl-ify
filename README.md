Un-StartSSL-ify
===============

Removes/distrusts StartCom's certificate authorities in Firefox, desktop and
mobile.

Copyright (C) 2014 Scott Zeid.  Released under the X11 License.  
http://code.s.zeid.me/un-startssl-ify

 

This is an addon for Firefox and Firefox for Android that removes (or in the
case of built-in certificates, distrusts) StartCom's certificate authorities
from the certificate database.  (StartCom is the company that operates the
"free" StartSSL certificate authority.)  This is necessary due to [their
hostile attitude](https://raim.codingfarm.de/blog/2014/04/12/distrusting-startssl/)
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

Resources
---------

* [Heartbleed.com](http://www.heartbleed.com/)
* [Distrusting StartSSL](https://raim.codingfarm.de/blog/2014/04/12/distrusting-startssl/)
* [StartCom's Heartbleed statement (via the WayBack Machine for obvious reasons)](https://web.archive.org/web/20140413143129/https://www.startssl.com/?app=43)
* [StartCom Forums - "Heartbleed vulnerability - is StartCom affected?" (also WayBack Machine)](https://web.archive.org/web/20140421064654/https://forum.startcom.org/viewtopic.php?p=8074&sid=9ff80cab27595d3558208b0580c1583a#p8074)
* [Mozilla bug #994033 - Most StartSSL certs will stay compromised (RESOLVED INVALID)](https://bugzilla.mozilla.org/show_bug.cgi?id=994033)
* [Debian bug #744027 - Please remove StartCom Certification Authority root certificate (WONTFIX)](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=744027)
* [Here's why StartSSL revoke fees won't matter and SSL certs are funky](http://www.ahtik.com/blog/startssl-revocation-fees-will-not-matter-and-ssl-certs-are-funky_u1g8E/)