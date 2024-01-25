import { useCallback, useMemo, useRef } from "react";

import { createTags } from "../utils/tags";
import { DEFAULT_DATALAYER_NAME } from "../utils/consts";
import type { GTMConstructor } from "../typings/typedefs";

const useGTM = () => {
  const dataLayerRef = useRef<string>(DEFAULT_DATALAYER_NAME);
  const devModeRef = useRef<boolean>(false);

  const runGTM = useCallback(
    ({
      tagId,
      dataLayerName,
      domain,
      environment,
      nonce,
      script,
      devMode,
    }: GTMConstructor) => {
      if (devMode) {
        devModeRef.current = true;
      }

      createTags({
        tagId,
        dataLayerName,
        domain,
        environment,
        nonce,
        script,
        devMode,
      });

      if (typeof dataLayerName === "string") {
        dataLayerRef.current = dataLayerName;
      }
    },
    []
  );

  const eventGTM = useCallback((eventName: string, data?: object) => {
    if (dataLayerRef.current in window) {
      const dataLayer = {
        event: eventName,
        ...data,
      };

      window[dataLayerRef.current as keyof Window].push(dataLayer);

      if (devModeRef.current) {
        console.info("🔵 [gtm-react-hook] Event has sent! Payload:", dataLayer);
      }
    }
  }, []);

  return useMemo(
    () => ({
      runGTM,
      eventGTM,
    }),
    [runGTM, eventGTM]
  );
};

export { useGTM };
