# Easy-used React hooks for Google Tag Management based on TypeScript

## Features

 - Zero dependencies
 - Fully typed with TypeScript
 - Based on React hooks
 - Support tools for custom GTM configutation
 - Small bundle size
 
## Install

    npm install gtm-react-hook

or

    yarn add gtm-react-hook

## Quickstart

```typescript
    import  React, { FC, useEffect } from  "react";
	import { useGTM } from  "gtm-react-hook";
	import { useLocation } from  "react-router-dom";

	const  App: FC = () => {
	  const { initialize, event } = useGTM();
	  const  location = useLocation();

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
## API

### useGTM()

```typescript 
    const { initialize, event } = useGTM();
```

#### initialize
##### Arguments

 1. **tagId** (required) - your GTM measurement ID;
 2. dataLayerName - custom name of dataLayer object;
 3. environment - GTM enviroment params;
 4.  domain - custom GTM domain;
 5. script - custom GTM script's name;
 6. nonce;

#### event
##### Arguments

 1. **eventName** (required) - name of an event;
 2. data - payload of dataLayer;
