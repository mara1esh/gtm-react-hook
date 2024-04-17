import React from 'react';
import { createTags } from "../utils/tags";
import { DEFAULT_DATALAYER_NAME } from "../utils/consts";
import type { GTMConstructor } from "../typings/typedefs";

const useGTM = () => {
  const dataLayerRef = React.useRef<string>(DEFAULT_DATALAYER_NAME);
  const devModeRef = React.useRef<boolean>(false);

  const runGTM = React.useCallback(
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

  const eventGTM = React.useCallback((eventName: string, data?: object) => {
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

  return React.useMemo(
    () => ({
      runGTM,
      eventGTM,
    }),
    [runGTM, eventGTM]
  );
};

export { useGTM };
