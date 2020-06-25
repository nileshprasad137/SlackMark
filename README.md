# SlackMark

Bookmark URLs to your slack channel.

| <img width="400" alt="Slack example message" src="https://user-images.githubusercontent.com/16336390/85766330-925d6c80-b734-11ea-811d-864eddfa394d.png"> | <img width="600" height="200" alt="Slack example message" src="https://user-images.githubusercontent.com/16336390/85767123-51198c80-b735-11ea-94a0-c09a8a85ff2e.png"> |
|:---:|:---:|



This project uses:

- the [Serverless Framework](https://serverless.com/);
- Slack's [incoming webhooks](https://api.slack.com/incoming-webhooks)
- For client side purpose, I have developed a very minimal Chrome Extension available [here](https://github.com/nileshprasad137/slackMark-chromeExtension)

# Usage

1. Install the Serverless Framework and then clone this repo:

  ```bash
  $ npm install -g serverless
  ```
2. Create an [incoming webhook integration](https://my.slack.com/services/new/incoming-webhook/) in Slack. Copy the webhook URL into `serverless.yml` as the `WEBHOOK_URL` environment variable.


3. Test your serverless service
 
 ```bash
  $ serverless invoke local --function slackMarker --path testData.json
  ```
4. Deploy your Serverless service :

  ```bash
  $ sls deploy
  ```
   You'll see an endpoint for your function in the `Service Information` section once the deploy is finished.
   
5. Get chrome extension from [here](https://github.com/nileshprasad137/slackMark-chromeExtension)

6. Now keep bookmarking your URLs on your slack channel!   
   
 -----------------------------------------------
 
 ###### Note : I wanted to add a backend layer for adding new features later, that's why I have added Serverless. You can instead keep bookmarking URLs just through the Chrome Extension, by configuring the Slack's incoming webhook there. 
 
 -------------------------
 
 #### LICENSE
 MIT
 
   
