# Page_Basket

A scalable web boilerplate for anyone who's in need to kickstart developing webpages using html, css and javascript. 

## When to use ?
If you're to develop a set of static web pages (html,css & js), and to quick-start the dev process in less than a minute time.

## Why this?

This is to achieve maintaining a generic codebase throughout the development, facilitating reusability of components (be it styles or javascript based).

## Benefits?

* `Separation of concern` is the key that it holds throughout.
* Maintainability -- stick to the flow and I tell you, you'll thank me later for the time you'd have saved in future.
* `Microservice` way of codebase structuring. (Yes, definitely not the `monolithic` pattern)
* Loading assets on demand -- reduced network loads -- quick page rendering. (Yes, AMD'ish way of loading modules)



## Tools Needed

- Node
- Yarn

## Initial Setup

- Clone the repo
    `git clone git@github.com:venkatb4u/page_basket.git && cd page_basket`
- Install dependencies
    `yarn`
- Run the node web server 
    `yarn start` 
  Note: App will now be running at `localhost:3000`
- Trigger the Gulp tasks and watch for changes (in new terminal window)
    `yarn run build` or `gulp watch`
  Note: if needed for one time tasks trigger, use just `gulp`