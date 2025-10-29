/// <reference types="react" />
/// <reference types="react-dom" />

import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
