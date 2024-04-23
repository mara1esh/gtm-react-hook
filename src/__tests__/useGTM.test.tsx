import { screen, renderHook, act, waitFor } from "@testing-library/react";

import { useGTM } from "@/hooks/useGTM";
import { removeTags } from "@/utils/tags";

const GTM_ID = "GTM-XXXXXXX";
const DOMAIN = "https://www.mock-domain.com/";
const GTM_AUTH = "mock_gtm_auth";
const GTM_PREVIEW = "mock_gtm_preview";
const SCRIPT = "test-gtm.js";
const NONCE = "test-nonce";
const DATA_LAYER = "myDataLayer";

describe("useGTM basic init", () => {
  const { result } = renderHook(() => useGTM());

  act(() => {
    result.current.runGTM({ tagId: GTM_ID });
  });

  const noScriptTag = screen.getByTestId("gtm-noscript");
  const scriptTag = window.document.getElementById("gtm-script")!;

  test("should create gtm tags in the document", () => {
    expect(noScriptTag).toBeTruthy();
    expect(scriptTag).toBeTruthy();
  });

  test("should pass correct GTM id to iframe", () => {
    expect(noScriptTag.textContent).toContain(`id=${GTM_ID}`);
  });

  removeTags();
  delete window["dataLayer" as keyof Window];
});

describe("useGTM extended init", () => {
  const { result } = renderHook(() => useGTM());

  act(() => {
    result.current.runGTM({
      tagId: GTM_ID,
      domain: DOMAIN,
      dataLayerName: DATA_LAYER,
      environment: {
        gtm_auth: GTM_AUTH,
        gtm_preview: GTM_PREVIEW,
      },
      devMode: true,
      nonce: NONCE,
      script: SCRIPT,
    });
  });

  const noScriptTag = screen.getByTestId("gtm-noscript");
  const scriptTag = window.document.getElementById("gtm-script")!;

  test("should contain custom domain", () => {
    expect(noScriptTag.textContent).toContain(DOMAIN);
  });

  test("should contain custom environment", () => {
    expect(noScriptTag.textContent).toContain(GTM_AUTH);
    expect(noScriptTag.textContent).toContain(GTM_PREVIEW);
  });

  test("should contain custom script", () => {
    expect(scriptTag.textContent).toContain(SCRIPT);
  });

  test("should contain nonce attribute", () => {
    expect(scriptTag.nonce).toEqual(NONCE);
  });

  test("should create custom dataLayer's name", () => {
    expect(window[DATA_LAYER as keyof Window]).toBeTruthy();
  });
});

describe("useGTM event", () => {
  const { result } = renderHook(() => useGTM());

  act(() => {
    result.current.runGTM({ tagId: GTM_ID, devMode: true });
  });

  test("should create new event", () => {
    waitFor(() => {
      result.current.eventGTM("jest-event", { payload: "test" });
    });
    expect(window["dataLayer" as keyof Window].length).toEqual(2);
  });
});
