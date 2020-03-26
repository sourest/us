
// declare module '*.css';
// declare module '*.less';
// declare module '*.scss';

declare module '*.ico'
declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
declare module '*.svg' {
  const url: string
  export default url
}

declare module '*.mp3'
declare module '*.mp4'

