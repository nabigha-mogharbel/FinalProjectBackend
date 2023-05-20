const router = require('express').Router()
const {User, Subscription} = require('../db/models')
const webPush = require('web-push')
module.exports = router


router.post('/', async (req, res, next) => {
  try {
    // Our app has 4 defferent option for reminder, so depends on 
    // which reminder gets called, payload is changed.
    const payloadOptions = {
      exerciseReminder: 'Time to move around!',
      waterReminder: 'Time to drink water!',
      meditationReminder: 'Wanna take a break and meditate?',
      sleepReminder: 'Tamabuddy wants to be tucked..'
    }
    
    //It determines which reminder gets called based on the request's query parameter.
    const reminderType = req.query.reminderType
    const payload = payloadOptions[reminderType]
    const vapidPublicKey ='YOUR_VAPID_PUBLIC_KEY' //This line should be replaced with environment variable
    const vapidPrivateKey = 'YOUR_VAPID_PRIVATE_KEY' //This line should be replaced with environment variable
    const options = {
      TTL: 60,
      vapidDetails: {
        subject: 'mailto:YOUR_EMAIL',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
      }
    }

    //fetching all subscription of the users who opted-in the triggered reminder.
    let subscriber = await Subscription.findAll({
      include: [
        {
          model: User,
          where: {
            [reminderType]: true
          }
        }
      ]
    })
    
    //Since the 'keys' property of the subscription was stringified 
    //when it was stored in the database, it should be pursed to JSON.
    if (subscriber.length) {
      subscriber = subscriber.map(sub => {
        sub.keys = JSON.parse(sub.keys)
        return sub
      })
    }
    //calling webPush on each subscription with message opsions.
    subscriber.forEach(sub => {
      webPush.sendNotification(sub, payload, options)
    })

    res.status(200).send('Push Notification has been sent to User')
  } catch (error) {
    next(error)
  }
})