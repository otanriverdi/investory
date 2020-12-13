<p align="center">
  <img width="200" height="200" src="https://raw.githubusercontent.com/otanriverdi/investory/main/assets/logo.png">
</p>

<p align="center"><b>>_ A clutter free personal investment portfolio tracker.</b></p>

<p align="center">📒 Investory can keep track of your investment portfolio across a range of financial instruments. You can clearly see your gains or losses on each position as well as see news associated with your open instruments. You can also interact with other users through commenting on specific instruments.</p>

![](https://raw.githubusercontent.com/otanriverdi/investory/main/assets/landing-mock.png)
![](https://raw.githubusercontent.com/otanriverdi/investory/main/assets/dash-mock.png)
![](https://raw.githubusercontent.com/otanriverdi/investory/main/assets/inst-mock.png)

# Getting Started

* Use `npm install` to install the dependencies.
* Run `docker-compose start` to start the database. You can also change the optional DB env variables inside the `server` directory to use a local database installation.
* Set the required env variables for both the `server` and the `client`. Required variables are marked with a '!' in the template file. 
* To run in development, please use `npm run dev`
* To build the app, please use `npm run build`

# Tech Stack

* TypeScript
* NextJS
* Apollo Client
* Apollo Server
* TypeORM
* type-graphql
* Graphql Codegen
* many more...
