import type { GTMConstructor, GTMEnvironment } from "@/typings/typedefs";

import {
  DEFAULT_DATALAYER_NAME,
  DEFAULT_DOMAIN,
  DEFAULT_SCRIPT,
  SCRIPT_ID,
  NOSCRIPT_ID,
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

const logEvent = (tag: "script" | "noscript") => {
  const [_tag, element] =
    tag === "script" ? ["Script", "header"] : ["Noscript", "body"];
  console.info(`🟢 [gtm-react-hook] GTM ${_tag} was added to ${element}`);
};

export const createTags = (args: GTMConstructor) => {
  const {
    tagId,
    domain = DEFAULT_DOMAIN,
    script = DEFAULT_SCRIPT,
    dataLayerName = DEFAULT_DATALAYER_NAME,
    nonce,
    environment,
    devMode,
  } = args;
  const scriptTag = document.createElement("script");
  scriptTag.id = SCRIPT_ID;
  scriptTag.setAttribute("data-testid", SCRIPT_ID);

  if (nonce) {
    scriptTag.setAttribute("nonce", nonce);
  }
  const scriptEnv = getEnvironmentString(environment, "script");
  scriptTag.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '${domain}/${script}?id='+i+dl${scriptEnv};f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${tagId}');`;
  document.head.insertBefore(scriptTag, document.head.childNodes[0]!);

  if (devMode) {
    logEvent("script");
  }

  const noScriptTag = document.createElement("noscript");
  noScriptTag.id = NOSCRIPT_ID;
  noScriptTag.setAttribute("data-testid", NOSCRIPT_ID);
  const iframeEnv = getEnvironmentString(environment, "noscript");
  noScriptTag.innerHTML = `<iframe
                  src="${domain}/ns.html?id=${tagId}${iframeEnv}"
                  height="0"
                  width="0"
                  style="display:none;visibility:hidden"
                  />`;

  document.body.insertBefore(noScriptTag, document.body.childNodes[0]!);

  if (devMode) {
    logEvent("noscript");
  }
};

export const removeTags = () => {
  const scriptTag = document.getElementById(SCRIPT_ID);
  const noScriptTag = document.getElementById(NOSCRIPT_ID);

  if (scriptTag && noScriptTag) {
    document.head.removeChild(scriptTag);
    document.body.removeChild(noScriptTag);
  }
};
