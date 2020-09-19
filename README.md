## Description
This service is a simplified version of the secure transactions service.

Principle of operation:

1. Buyer or Seller creates a deal, specifying a description, a partner in the deal, choose a role and indicate the amount of the deal.

2. The second party to the transaction accepts it.

3. The buyer makes the payment, after which the money reserved by the service.

4. The seller fulfills his obligations.

5. The buyer checks the work, after which he confirms, the money goes to the seller's balance, the transaction completed: D.

PS.  In this case, 20-30% of the functionality of the real project implemented.

## Settings for correct work in /config
```json
{
    "app": {
        "port": 5000,
        "jwt_secret": ""
    },
    "database": {
        "mongo_uri": ""
    }
}
```
## Stack

###### Front-Ent:
1. React
2. Redux
3. Redux-Thunk
4. Socket.io-client
5. Bootstrap / React-Bootstrap
6. Axios

###### Back-Ent:
1. Node Js
2. MongoDB
3. Express
4. Jsonwebtoken
3. Socket.io
## Available Scripts

In the project directory, you can run:

### `yarn client`

Runs the app in the development mode, client part.<br />
Open http://localhost:3000 to view it in the browser.

### `yarn server`

Runs the app in the development mode, server part<br />
Open http://localhost:5000 to view it in the browser.

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
