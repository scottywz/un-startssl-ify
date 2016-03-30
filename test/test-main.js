var main = require("../main");

exports["test main async"] = function(assert, done) {
 main.unStartSSLify();
 
 var tabs = require("sdk/tabs");
 var testTab = tabs.activeTab;
 var badUrl = "https://www.startssl.com/";
 testTab.url = badUrl;
 testTab.on("ready", function(tab) {
  tab.attach({
   contentScript: 'self.port.emit("realUrl", document.URL);'
  }).port.on("realUrl", function(realUrl) {
   assert.ok(
    (realUrl.match(/^about:certerror\?/) && realUrl.match(/SEC_ERROR_UNKNOWN_ISSUER/)),
    "request to StartCom-encumbered site fails"
   );
   done();
  });
 });
};

require("sdk/test").run(exports);

// about:certerror?e=nssBadCert&u=https%3A//www.startssl.com/&c=UTF-8&f=regular&d=www.startssl.com%20uses%20an%20invalid%20security%20certificate.%0A%0AThe%20certificate%20is%20not%20trusted%20because%20the%20issuer%20certificate%20is%20unknown.%0AThe%20server%20might%20not%20be%20sending%20the%20appropriate%20intermediate%20certificates.%0AAn%20additional%20root%20certificate%20may%20need%20to%20be%20imported.%0A%0AError%20code%3A%20%3Ca%20id%3D%22errorCode%22%20title%3D%22SEC_ERROR_UNKNOWN_ISSUER%22%3ESEC_ERROR_UNKNOWN_ISSUER%3C/a%3E%0A
