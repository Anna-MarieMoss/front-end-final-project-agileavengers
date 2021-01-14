////// PUSH NOTIFICATIONS EXAMPLES ///////////

// Displays the notification
function reminderNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      // Adding notification options - images, text etc
      var options = {
        body: `HEY! How you doing this week?  Don't forget to pop a note in your School of Code Journal!`,
        icon:
          'https://d33wubrfki0l68.cloudfront.net/e6fddcbea146f91d2f3c160f7d56a9391a4740b0/4e758/static/logo-51c754388b198e5bbb0d08a971ebbfa2.png',
        vibrate: [100, 50, 100],
        image:
          'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2018/06/how-are-you-doing-760x400.jpg',
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        // Optional - Add actions to the notification.  One to go to journal and the other to close notification.
        actions: [
          {
            action: 'explore',
            title: 'Login to journal',
            icon: 'https://webstockreview.net/images/check-mark-icon-png-3.png',
          },
          {
            action: 'close',
            title: 'Close notification',
            icon:
              'https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png',
          },
        ],
      };
      reg.showNotification('SoC Journal', options);
    });
  }
}
reminderNotification();

function hackerthonNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      // Adding notification options - images, text etc
      var options = {
        body: `Yeh baby yeh! It's Hackerthon Friday!!!  Don't forget to take a photo with your partner and record how it went in your journal`,
        icon:
          'https://d33wubrfki0l68.cloudfront.net/e6fddcbea146f91d2f3c160f7d56a9391a4740b0/4e758/static/logo-51c754388b198e5bbb0d08a971ebbfa2.png',
        vibrate: [100, 50, 100],
        image:
          'https://www.founderpassion.org/wp-content/uploads/2017/09/hackathon-founderpassion-foundation.png',
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        // Optional - Add actions to the notification.  One to go to journal and the other to close notification.
        actions: [
          {
            action: 'explore',
            title: 'Login to journal',
            icon: 'https://webstockreview.net/images/check-mark-icon-png-3.png',
          },
          {
            action: 'close',
            title: 'Close notification',
            icon:
              'https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png',
          },
        ],
      };
      reg.showNotification('SoC Journal', options);
    });
  }
}
hackerthonNotification();
