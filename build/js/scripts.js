var v,e,f,b,t,n;"undefined"!=typeof window&&window.addEventListener&&(v=Object.create(null),f=function(){clearTimeout(e),e=setTimeout(t,100)},b=function(){},t=function(){function o(){var e;0===--i&&(b(),window.addEventListener("resize",f,!1),window.addEventListener("orientationchange",f,!1),b=window.MutationObserver?((e=new MutationObserver(f)).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),function(){try{e.disconnect(),window.removeEventListener("resize",f,!1),window.removeEventListener("orientationchange",f,!1)}catch(e){}}):(document.documentElement.addEventListener("DOMSubtreeModified",f,!1),function(){document.documentElement.removeEventListener("DOMSubtreeModified",f,!1),window.removeEventListener("resize",f,!1),window.removeEventListener("orientationchange",f,!1)}))}function e(e){return function(){!0!==v[e.base]&&(e.useEl.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+e.hash),e.useEl.hasAttribute("href")&&e.useEl.setAttribute("href","#"+e.hash))}}function t(e){return function(){e.onerror=null,e.ontimeout=null,o()}}var n,i=0;b();for(var r,u,d,s=document.getElementsByTagName("use"),a=0;a<s.length;a+=1){try{var l=s[a].getBoundingClientRect()}catch(e){l=!1}var c=(h=(n=s[a].getAttribute("href")||s[a].getAttributeNS("http://www.w3.org/1999/xlink","href")||s[a].getAttribute("xlink:href"))&&n.split?n.split("#"):["",""])[0],h=h[1],w=l&&0===l.left&&0===l.right&&0===l.top&&0===l.bottom;l&&0===l.width&&0===l.height&&!w?(s[a].hasAttribute("href")&&s[a].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n),c.length&&(!0!==(n=v[c])&&setTimeout(e({useEl:s[a],base:c,hash:h}),0),void 0===n&&(r=c,d=u=void 0,window.XMLHttpRequest&&(u=new XMLHttpRequest,d=m(location),r=m(r),u=void 0===u.withCredentials&&""!==r&&r!==d?XDomainRequest||void 0:XMLHttpRequest),void 0!==(h=u)&&(n=new h,(v[c]=n).onload=function(n){return function(){var e=document.body,t=document.createElement("x");n.onload=null,t.innerHTML=n.responseText,(t=t.getElementsByTagName("svg")[0])&&(t.setAttribute("aria-hidden","true"),t.style.position="absolute",t.style.width=0,t.style.height=0,t.style.overflow="hidden",e.insertBefore(t,e.firstChild)),o()}}(n),n.onerror=t(n),n.ontimeout=t(n),n.open("GET",c),n.send(),i+=1)))):w?c.length&&v[c]&&setTimeout(e({useEl:s[a],base:c,hash:h}),0):void 0===v[c]?v[c]=!0:v[c].onload&&(v[c].abort(),delete v[c].onload,v[c]=!0)}function m(e){var t;return void 0!==e.protocol?t=e:(t=document.createElement("a")).href=e,t.protocol.replace(/:/g,"")+t.host}s="",i+=1,o()},n=function(){window.removeEventListener("load",n,!1),e=setTimeout(t,0)},"complete"!==document.readyState?window.addEventListener("load",n,!1):n()),jQuery(document).ready(function(){});