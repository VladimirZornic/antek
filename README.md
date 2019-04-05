# ** PhoneBookMe **
* to use app with this phonebook api after pull request you need to instal dependencies with npm install and change port for reactjs app
- to change port on Mac OS in folder `clients` use command $ export PORT=8000
- to change port on Windos OS in folder `clients` use command set PORT=8000



# * if you use Windows OS skip this step *
- change package.json file, find 'scripts' and find command 'start',
change this line `react-scripts start` to `PORT=8000 react-scripts start`

#***********************************************************************# 
 now start server from `server` folder with command node server.js which will start server on port 3000
 then start reactjs app from `client` folder with npm start which will start your app on port 8000

#******************************** ENJOY ********************************# 
