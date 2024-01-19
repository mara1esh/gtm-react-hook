import type { GTMConstructor, GTMEnvironment } from "@/typings/typedefs";

import {
  DEFAULT_DATALAYER_NAME,
  DEFAULT_DOMAIN,
  DEFAULT_SCRIPT,
} from "./consts";

const getEnvironmentString = (
  environment: GTMEnvironment | undefined,
  tag: "script" | "noscript"
) => {
  if (environment === undefined) {
    return "";
  }
  if (tag === "script") {
    return `+ '&gtm_auth=${environment.gtm_auth}&gtm_preview=${environment.gtm_preview}&gtm_cookies_win=x'`;
  } else {
    return `&gtm_auth=${environment.gtm_auth}&gtm_preview=${environment.gtm_preview}&gtm_cookies_win=x`;
  }
};

export const createTags = (args: GTMConstructor) => {
  const {
    tagId,
    domain = DEFAULT_DOMAIN,
    script = DEFAULT_SCRIPT,
    dataLayerName = DEFAULT_DATALAYER_NAME,
    nonce,
    environment,
  } = args;
  const scriptTag = document.createElement("script");
  if (nonce) {
    scriptTag.setAttribute("nonce", nonce);
  }
  const scriptEnv = getEnvironmentString(environment, "script");
  scriptTag.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '${domain}/${script}?id='+i+dl${scriptEnv};f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${tagId}');`;
  if (document.head.childNodes[0]) {
    document.head.insertBefore(scriptTag, document.head.childNodes[0]);
  } else {
    document.head.appendChild(scriptTag);
  }

  const noScriptTag = document.createElement("noscript");
  const iframeEnv = getEnvironmentString(environment, "noscript");
  noScriptTag.innerHTML = `<iframe
                  src="https://${domain}/ns.html?id=${tagId}${iframeEnv}"
                  height="0"
                  width="0"
                  style="display:none;visibility:hidden"
                  />`;
  if (document.body.childNodes[0]) {
    document.body.insertBefore(noScriptTag, document.body.childNodes[0]);
  } else {
    document.body.appendChild(noScriptTag);
  }
};