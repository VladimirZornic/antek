* to use app with this phonebook api you need to change port for reactjs app
1. to change port on Mac OS in folder `clients` use command $ exort PORT=8000
1. to change port on Windos OS in folder `clients` use command set PORT=8000

2. then create .env file with content PORT=8000

# ** if you use Windows OS skip step 3 **
3. change package.json file, find 'scripts' and find command 'start',
change this line `react-scripts start` to `PORT=8000 react-scripts start`

* now start server from `server` folder with command node server.js which will start server on port 3000
* then start reactjs app from `client` folder with npm start which will start your app on port 8000

#******************************** ENJOY ********************************# 