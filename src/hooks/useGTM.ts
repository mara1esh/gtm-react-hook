import { useCallback, useMemo, useRef } from "react";

import { createTags } from "@/utils/tags";
import { DEFAULT_DATALAYER_NAME } from "@/utils/consts";
import type { GTMConstructor, PageViewArguments } from "@/typings/typedefs";

const useGTM = () => {
  const dataLayerName = useRef<string>(DEFAULT_DATALAYER_NAME);

  const initialize = useCallback((args: GTMConstructor) => {
    createTags(args);

    if (typeof args.dataLayerName === "string") {
      dataLayerName.current = args.dataLayerName;
    }
  }, []);

  const event = useCallback((eventName: string, data?: object) => {
    if (dataLayerName.current in window) {
      const dataLayer = {
        event: eventName,
        ...data,
      };

      window[dataLayerName.current as keyof Window].push(dataLayer);
    } else {
      console.warn("GTM is not initialized! Please, check its initialization");
    }
  }, []);

  const pageview = useCallback((args: PageViewArguments) => {
    if (dataLayerName.current in window) {
      const dataLayer = {
        event: args.name || "page_view",
        path: args.path,
        ...args.options,
      };
      if (args.options !== undefined && "customDataLayer" in args.options) {
        window[args.options.customDataLayer as keyof Window].push(dataLayer);
      } else {
        window[dataLayerName.current as keyof Window].push(dataLayer);
      }
    } else {
      console.warn("GTM is not initialized! Please, check its initialization");
    }
  }, []);

  return useMemo(
    () => ({
      initialize,
      event,
      pageview,
    }),
    [initialize, event, pageview]
  );
};

export { useGTM };
