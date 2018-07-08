# Uni WC Hub Application (client-side)

Uni WC Hub Application is a client-side web application built in [React](https://reactjs.org/). Its main purpose is to connect to [Uni WC Hub server-side app](https://github.com/moomoo-agency/uni-wc-hub-app-server) and display the sales reports from connected WooCommerce based online stores.

[![Sales report](https://moomoo.agency/wp-content/uploads/2018/07/uni-wc-hub-app-sales-report.png)](https://www.youtube.com/watch?v=c4oNnKuYeR0)

## Developing

If you'd like to fork or clone the project, after installing all of the node modules, here are the project's relevant commands:

* `npm run start` - Start development server, watch for changes & continuously build into the `/public` directory.
* `npm run build:prod` - Build/re-build the `/public` directory for production.

## Configuration

Locate 'config.js' file and replace ids and names of sites with your actual ones. The original data looks like this:

```javascript
export const sites = [
     {
         val: "furniture",
         name: "Furniture Store"
     },
     {
         val: "printing",
         name: "Printing Cards Online Store"
     }
 ];
```

Values like "furniture" and "printing" are unique ids of sites. The same you probably configured in the [server-side app](https://github.com/moomoo-agency/uni-wc-hub-app-server)

## Application design

The visual appearance is minimal