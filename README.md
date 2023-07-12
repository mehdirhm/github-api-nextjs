
Subject : github-api-nextjs

Author : Mehdi Rahimsirat

Date : july 12 2023
 
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Subject : github-api-nextjs
Author : Mehdi Rahimsirat
Date : july 12 2023
 
Setup steps : 
	
1. Git clone from repository https://github.com/mehdirhm/github-api-nextjs 
2. Use npm or yarn package manager which has same application ( prefer to use yarn ) 
3. Use yarn run dev which execute nextjs scripts to build a development version for our project 
4. Now project is up, check localhost:3000 to route index page 
5. Use this link https://github-api-nextjs.vercel.app/ to watch the production version which has been deployed on external host 
6. Remember that a VPN is required because that host which the project runs over is banned for IR IPs  
7. Index page title is "Welcome to the Homepage!", in this page you can use two button, one of them is for search profiles after filling the input text, another one lists popular repositories, as the proposal asked for.
8. Search Github  Profile Page
    - By adding a name to search box and cliking "Go to User Profile" button you can access every github profile which you want.
    -  Inforamtions which have been displayed are web-address, number of public repositories and repositories list.
    - List could be sorted by 3 criteria, most stars, most forks and lastest updated.
    - This page also has a search box to find desired repository from list below and a button to loading more repositories which have been 				 showed too.
    - Most Popular Repositories Page 
	-  By clicking "Go to Popular Repositories" button, first 10 repositories with most stars could be displayed
	-  A search box has been designed to search among those ones.
	
Attention : 
	
As in proposal requested, using Github Pages expected, but in this project which implemented by NextJS framework, server-side services needed to handle server side props, while Github pages just support static content which cause to replacing it by another platform, here in this project Vercel PaaS provider is used for deployment. 
	
source : https://stackoverflow.com/questions/70875402/how-to-render-dynamic-pages-on-github-pages





## Demo
We have deployed our website at the address [https://github-api-nextjs.vercel.app](https://github-api-nextjs.vercel.app). You can view the live output of the website through the following link.
## About Project

This project utilizes the GitHub API to fetch the username of a desired user from you and display information about their repositories. Additionally, you can also view the top 10 GitHub repositories.

## Project features
- Possibility to sort repositories based on the number of forks, stars, and the date of the last update.
- Ability to display the top repositories.
- Responsive design.




