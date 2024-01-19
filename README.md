# 📊 Easy-to-use React hooks for Google Tag Management based on TypeScript

## 🔥 Features 

 - Zero dependencies
 - Fully typed with TypeScript
 - Based on React hooks
 - Support tools for custom GTM configuration
 - Logging events
 - Small bundle size
 
## 🛠 Install

    ```shell
		npm install gtm-react-hook
	```

or

	```shell
    	yarn add gtm-react-hook
	```

## 🚀 Quickstart

```typescript
    	import  React, { FC, useEffect } from "react";
	import { useGTM } from "gtm-react-hook";
	import { useLocation } from "react-router-dom";

	const App = () => {
	  const { initialize, event } = useGTM();
	  const location = useLocation();

	  useEffect(() => {
		initialize({
		  tagId: "GTM-XXXXXXX", // Provide your Tag ID
		});
	  }, []);

	  useEffect(() => {
		event("page_view", {
		  pathname: location.pathname,
		});
	  }, [location.pathname]);
	
	  return  <>...</>;
	};
```
## 🧙🏻‍♂️ API

### useGTM()

```typescript 
    const { initialize, event } = useGTM();
```

#### initialize({ tagId: string, dataLayerName?: object, environment?: { gtm_auth: string, gtm_preview: string }, domain?: string, script?: string, nonce?: string, devMode?: boolean })

 1. **tagId** (required) - your GTM measurement ID;
 2. dataLayerName - custom name of dataLayer object;
 3. environment - GTM environment params;
 4. domain - custom GTM domain;
 5. script - custom GTM script's name;
 6. nonce;
 7. devMode - add logging for GTM initialization & events;

#### event(eventName: string, data?: object)

 1. **eventName** (required) - name of an event;
 2. data - payload of dataLayer (action, url, customerID, etc);


## 💅🏽 Examples

### Page tracking

```typescript
	const { event } = useGTM();
	const location = useLocation();

	useEffect(() => {
		event("page_view", { location: location.pathname });
	}, [location]);
```

### Track event

```typescript
	const { event } = useGTM();

	const handleSaveCustomerInfo = (customer) => {
		event("customer_info", { 
			customerId: customer.customerId, 
			customerRegion: customer.customerRegion 
		});
	}
	
	...JSX...

	<button onClick={handleSaveCustomerInfo}>Submit</button>
```

### Custom data layer name

```typescript
	const { initialize } = useGTM();

	useEffect(() => {
		initialize({
			gtmId: "GTM-XXXXXXX",
			dataLayerName: "myGTMLayer", // all GTM events will be stored in `window.myGTMLayer` key
		})
	}, []);
```

### Installation only after user has accepted analytics

```typescript
	const { initialize } = useGTM();

	useEffect(() => {
		if (isUserConfirmAnalytics) {
			initialize({
				gtmId: "GTM-XXXXXXX",
				dataLayerName: "myGTMLayer", // all GTM events will be stored in `window.myGTMLayer` key
			})
		}
	}, [isUserConfirmAnalytics]);
```
