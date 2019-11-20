import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as MailComposer from 'expo-mail-composer';
export default  function App() {
  alertmessage = ()=>{
    alert('some message')
  }
  registerForPushNotificationsAsync= async()=>{
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    alert(token)
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    // try {
    //   MailComposer.composeAsync({
    //     recipients: ['cyruschan@hsu.edu.hk'],
    //     subject: token,
    //     body: 'Testing multiple Attachments',
       
    // })
    // } catch (error) {
    //   alert(error)
    // }
   

  // alert('mail sent')
  }

  sendPushNotification = ()=>{
    alert('send push')
    try {
      let response = fetch('https://exp.host/--/api/v2/push/send',{
        method:'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to:'ExponentPushToken[Hskgn6LEq28o3Kvb62GbnD]',
          title:'Hello',
          body: 'how are you??'
        }),
      })
      alert('success')
    } catch (error) {
      alert(error)
    }

  }

   registerForPushNotificationsAsync()
   sendPushNotification()

  
   return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Push notification" onPress={sendPushNotification}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
