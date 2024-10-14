// See https://github.com/bluwy/vite-plugin-iso-import#using-client-and-server-loses-intellisense
// Required to isomorphically import modules with `?client`/`?server`
declare module 'sveaflet?client' {
	import * as all from 'sveaflet';
	export = all;
}
