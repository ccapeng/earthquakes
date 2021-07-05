# Earthquakes

## Features
- Load US earthquake data from [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson)

- Click a location to zoom in.
- Click "USA Earthquake Locations" to go back the full USA map.
- Run `npm run server` to start.

## API Endpoint
- Check eathquake data:  
  [http://127.0.0.1:5001/api/earthquakes](http://127.0.0.1:5001/api/earthquakes)

- Search earthquark location by query string `?place=CA`.   
  For example : [http://127.0.0.1:5001/api/earthquakes?place=CA](http://127.0.0.1:5001/api/earthquakes?place=CA)

## Tech Highlights
- All environment settings are in the `settings.js`.
- Two data mode, cache and elastic search, are available.
- When server startup, load earthquake data first.  
- When backend mode is used:
  - When server startup, wait for elastic search ready.  
    In docker environment, elastic search takes longer time to start up. Use a loop to wait for it ready.
  - Default elastic search server is `http://localhost:9200`.  


## Deply to AWS
- Development environment:
  - In package.json, do not apply `"type":"module"`.
  - Also make sure `esm` package installed (`npm install esm`).
- Settings:
  - In `serverless.yml`,  
    make sure the handle point to correct js file and function.
    ```
    functions:
      api:
        handler: handler.universal
        events:
          - http: ANY {proxy+}
          - http: ANY /
    ```
  - Also `in serverless.yml`,
    the following settings are necessary.
    ```
    plugins:
      - serverless-webpack
    ```
  - Also `handler.js` is default file for the handler.
  - Test in local `serverless invoke local --function api`
  - Run in local `serverless offline start`
- Deployment:
  - Run run AWS CLI, `aws configure`.  
    Enter key key id, secret, region, default output.

  - Then run `serverless deploy`
    ```
    d:\dvp\node\earthquakes\api>aws configure
    AWS Access Key ID [****************XXXX]:
    AWS Secret Access Key [****************xxxx]:
    Default region name [us-east-1]:
    Default output format [json]:
    ```  
    Run `serverless deploy`
    Find the url after deployed
    https://3uovjdqjme.execute-api.us-east-1.amazonaws.com/dev/api/earthquakes