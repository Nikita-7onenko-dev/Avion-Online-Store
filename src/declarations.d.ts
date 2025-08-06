
// scss модули
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*jpg' {
  const img: string;
  export default img
}