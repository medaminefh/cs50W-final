# This is the Final Project of the CS50 Web Programming with <img width="30px" src="https://banner2.cleanpng.com/20180806/fv/kisspng-python-scalable-vector-graphics-logo-javascript-cl-coderpete-game-development-5b6819307ca155.2506144815335488485105.jpg" alt="python logo" /> and <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" width="30px" alt="js logo" />

<p align="center"><img src="https://i.pinimg.com/originals/77/6d/d9/776dd95c3db6ce5d3c4f9489ffe8a3cd.png" alt="cs50"></p>

PS: SO this App is not ready for production yet, because Everyone can delete and update other's blogs (It needs Authentication Authorization thing), Any way its not meant to be for production

## Distinctiveness and Complexity:

- I Believe that this App is different from any other Apps out there, because its not common to build a Blogs App that has Front and backend functionalities.
- I Built it with Reactjs in the front and Django in the backend.
- It supports the Markdown language

## The structure of the App

### Frontend (blogs folder):

In the blogs folder lives all the frontend so here i'll explain what these folders and files inside the **src/components/**.

- Blog folder:

in here we find the Blog component

- Card folder:

in here we find the UI of the blogs when you 1st run the app

- Footer folder :

in here we find the Footer component

- Header folder:

in here we find the Header (Its just the Logo)

- LandingPage folder:

in here we find the landing page where all the blogs lives

- Markdown:

in here we find the markdown component, When you create, edit blogs

- utils folder (here all the helper function i used in my components):

  **HandleDate.js** --> This handle the dates.

  **Loading.js** --> This is the Loading component.

  **notification.js** --> This is the Notification component.

  **routing.js** --> This is where routing lives.

### Backend (backend folder):

**views.py** :

- `index` function: For testing the server is running 😁.

- `tweets` function: For Creating and Getting Blogs.

- `twt` function: For Getting, Updating and deleting Blogs.

**models.py**:

This is where it lives all our `models`.

**urls.py**:

All our `routes`.

## How To Run The App:

1- Clone this Repo to your machine.

2- cd To the project
So we need first to install all the packages needed for this app to work properly.

3- Open another terminal and place it side by side with the other one.

4- pick one of the Terminals and cd to **`blogs`** folder (This is where the frontend live) and run `npm i` (This will install all the frontend packages).

5- Go the other Terminal and run

`pip install -r requirements.txt`

or

`pip3 install -r requirements.txt` (if you're using python3).

6- after the both installation are done, its time to run the App :

- run the server :

  `python3 manage.py makemigrations`

  `python3 manage.py migrate`

  `python3 manage.py runserver`

- run the client :

  `npm run start`

  or

  `yarn start`

  <br>

---

<br>
<br>
<br>

## And after that I want to Thank All the CS50 staff and Happy New Year to All of you for making this Great Content availbe for Free, Thank you so Much 🌹

![Happy new Year](https://i.pinimg.com/originals/8f/27/d4/8f27d444c9b922eb5b8d17339a140638.gif)
