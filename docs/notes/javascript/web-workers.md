---
title: 'Web Workers'
date: '2025-03-10'
fullPath: '/notes/javascript/web-workers'
iconComponentName: "javascript_icon"
sectionSlug: 'notes'
---

## Overview

- traditionally, JS is single-threaded
- web workers offer way to enable some tasks to be offloaded from main thread to a background thread
- can help prevent main thread a blocking process, thereby making the app unresponsive
- **benefits**
  - improved performance
  - increased stability
  - enhanced security
  - better resource utilization

### Example

```javascript
import { Thing } from '../path';

// here, `self` represents worker object
self.onmessage = (event) => {
    const dataToProcess = event.data;

    // heavy computation

    self.postMessage(response);
}
```

```javascript
const workerUrl = new URL(
    './data.worker', import.meta.url
);

const worker = new Worker(workerUrl);

worker.addEventListener(
    'message',
    (event) => {
        // handle response from web worker
    }
);

worker.postMessage(dataToSend);
```
