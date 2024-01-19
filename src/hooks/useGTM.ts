import { useCallback, useMemo, useRef } from "react";

import { createTags } from "@/utils/tags";
import { DEFAULT_DATALAYER_NAME } from "@/utils/consts";
import type { GTMConstructor } from "@/typings/typedefs";

const useGTM = () => {
  const dataLayerRef = useRef<string>(DEFAULT_DATALAYER_NAME);

  const initialize = useCallback(
    ({
      tagId,
      dataLayerName,
      domain,
      environment,
      nonce,
      script,
    }: GTMConstructor) => {
      createTags({ tagId, dataLayerName, domain, environment, nonce, script });

      if (typeof dataLayerName === "string") {
        dataLayerRef.current = dataLayerName;
      }
    },
    []
  );

  const event = useCallback((eventName: string, data?: object) => {
    if (dataLayerRef.current in window) {
      const dataLayer = {
        event: eventName,
        ...data,
      };

      window[dataLayerRef.current as keyof Window].push(dataLayer);
    } else {
      console.warn("GTM is not initialized! Please, check its initialization");
    }
  }, []);

  return useMemo(
    () => ({
      initialize,
      event,
    }),
    [initialize, event]
  );
};

export { useGTM };
