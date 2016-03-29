/* vim: set fdm=marker: */
/* Copyright notice and X11 License {{{
   
   Un-StartSSL-ify
   Removes/distrusts StartCom's certificate authorities in Firefox, desktop and
   mobile.
   
   Copyright (C) 2014-2015 Scott Zeid.
   https://code.s.zeid.me/un-startssl-ify
   
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:
   
   The above copyright notice and this permission notice shall be included in
   all copies or substantial portions of the Software.
   
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   THE SOFTWARE.
   
   Except as contained in this notice, the name(s) of the above copyright holders
   shall not be used in advertising or otherwise to promote the sale, use or
   other dealings in this Software without prior written authorization.
   
}}}*/

var {Cc, Ci} = require("chrome");

var STARTCOM_ORGS = ["StartCom Ltd."];

function unStartSSLify() {
 var certDB = Cc["@mozilla.org/security/x509certdb;1"].getService(Ci.nsIX509CertDB);
 var certDB2 = Cc["@mozilla.org/security/x509certdb;1"].getService(Ci.nsIX509CertDB2);
 var certList = certDB2.getCerts();
 var startComCerts = [];
 
 for (var e = certList.getEnumerator(); e.hasMoreElements();) {
  var cert = e.getNext().QueryInterface(Ci.nsIX509Cert);
  if (STARTCOM_ORGS.indexOf(cert.organization) > -1)
   startComCerts.push(cert);
 }
 
 for (var i = 0; i < startComCerts.length; i++) {
  var cert = startComCerts[i];
  certDB.deleteCertificate(cert);
 }
}

exports.main = function(options, callbacks) {
 unStartSSLify();
}
