# 🚀 gtm-react-hook: Easy-to-use React hooks for Google Tag Manager

A lightweight, fully typed React hook library for seamless Google Tag Manager (GTM) integration.

---

## 🎯 Features

✅ Simple & intuitive React hooks✅ Fully typed with TypeScript✅ Tiny bundle size (~1kB)✅ Customizable GTM configuration✅ Zero external dependencies (only React 19)✅ Built-in event logging✅ Test coverage ensured

---

## 📦 Installation

```sh
# Using npm
npm install gtm-react-hook

# Using yarn
yarn add gtm-react-hook

# Using pnpm
pnpm install gtm-react-hook
```

---

## ⚡ Quickstart

```tsx
import { useEffect } from "react";
import { useGTM } from "gtm-react-hook";
import { useLocation } from "react-router-dom";

const App = () => {
  const { runGTM, eventGTM } = useGTM();
  const { pathname } = useLocation();

  useEffect(() => {
    runGTM({
      tagId: "GTM-XXXXXXX", // Provide your GTM Tag ID
    });
  }, []);

  useEffect(() => {
    eventGTM("page_view", { pathname });
  }, [pathname]);

  return <>...</>;
};
```

---

## 🔍 API Reference

### 🏗 `useGTM()`

```tsx
const { runGTM, eventGTM } = useGTM();
```

#### `runGTM({ tagId, dataLayerName, environment, domain, script, nonce, devMode })`

- **tagId** *(required)* – Your GTM measurement ID.
- `dataLayerName` – Custom name for `dataLayer` object.
- `environment` – GTM environment parameters (`gtm_auth`, `gtm_preview`).
- `domain` – Custom GTM domain.
- `script` – Custom GTM script name.
- `nonce` – Security nonce.
- `devMode` – Enables logging for GTM initialization & events.

#### `eventGTM(eventName: string, data?: object)`

- **eventName** *(required)* – Name of the event.
- `data` – Payload for the dataLayer (e.g., action, URL, customer ID, etc.).

---

## 📖 Usage Examples

### 📊 Page Tracking

```tsx
const { eventGTM } = useGTM();
const { pathname } = useLocation();

useEffect(() => {
  eventGTM("page_view", { pathname });
}, [pathname]);
```

### 🎯 Track Custom Events

```tsx
const { eventGTM } = useGTM();

const saveCustomerInfo = (customer) => {
  eventGTM("customer_info", {
    customerId: customer.customerId,
    customerRegion: customer.customerRegion,
  });
};

return <button onClick={saveCustomerInfo}>Submit</button>;
```

### 🛠 Custom Data Layer Name

```tsx
const { runGTM } = useGTM();

useEffect(() => {
  runGTM({
    gtmId: "GTM-XXXXXXX",
    dataLayerName: "myGTMLayer", // Events stored in `window.myGTMLayer`
  });
}, []);
```

### 🔒 Install GTM Only After User Consent

```tsx
const { runGTM } = useGTM();

useEffect(() => {
  if (isUserConfirmAnalytics) {
    runGTM({
      gtmId: "GTM-XXXXXXX",
    });
  }
}, [isUserConfirmAnalytics]);
```

### 🛠 Enable Debugging & Logging

```tsx
const { runGTM } = useGTM();

useEffect(() => {
  runGTM({
    gtmId: "GTM-XXXXXXX",
    devMode: true, // Enables GTM logs in browser console
  });
}, []);
```

---

## ❤️ Contributing

We welcome contributions! Feel free to submit issues and PRs to make this library even better.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

### 🚀 Happy tracking with `gtm-react-hook`! 🎉
