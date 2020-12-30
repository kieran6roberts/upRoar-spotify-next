# upRoar - Music App

upRoar integrates with spotify using their api allowing users to listen to their favorite tracks, add tracks to playlists and create their customized music experience. It uses the react framework Next.js for it's hybrid rendering and production optimizations and integrates with strapi to register users and allow authentication.

![upRoar landing page](/public/images/uproar-home.webp?raw=true "upRoar landing page with dark theme")

## Table of contents
* [Project Objectives](#project-objectives)
* [Primary Technologies](#primary-technologies)
* [Getting Started](#getting-started)
* [Running Tests](#running-tests)
* [Author](#author)

## Project Objectives

For this project I wanted to build a full stack application using next.js in order to build up my react skills. A project like this requires frequent use of many of react's core skills such as managing state, context api, custom hooks, external data fetching as well as integrating the next.js frontend with a backend.

It would also require me to use cookies to store user jwt's and implement server-side rendering to pre-populate certain pages with data coming from the spotify api. 

The application itself should be performant, responsive and be able to fallback when there are errors fetching data.

## Primary Technologies

* next 10.0.2
* react 17.0.1
* tailwindcss 2.0.1
* nookies 2.5.0
* jest 26.6.3

## Getting Started

To get up and running, clone the repo to your machine and run 
```
yarn install
```
to install the neccessary dependencies.

You will need a spotify developer account to implement the features of the app.
Head over to [spotify for developers](https://developer.spotify.com/dashboard/).

Then create your `.env.local` file based on the `.env.example`.

Navigate into the backend folder
```
cd backend
```
and then create the `.env` based on the example `.env.example` once again. This strapi backend is configured to use heroku and the heroku postgres add-on.

More information about using the spotify [web api](https://developer.spotify.com/documentation/web-api/).

## Running Tests

To run the applications integration test use the command
```
yarn test
```
These test run the applications key features such as the music player controls,
form hooks, data fetching and auth context.

## Author
* Kieran Roberts

