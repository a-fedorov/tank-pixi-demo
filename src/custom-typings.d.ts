declare module '*.png'

declare module '*.json' {
  const value: any;
  export default value;
}

declare let config: any;