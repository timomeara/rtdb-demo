# Simple demo of the firebase RTDB in a react app.


- clone and run yarn to install (node v18)

This page is getting data from a Firebase Realtime Database (FBRTDB). 

The data for this demo is structured as a collection of ojects under the notifications/[user_id]/:

<img width="473" alt="Screen Shot 2023-02-22 at 5 08 36 PM" src="https://user-images.githubusercontent.com/5084668/220785127-f7bbe498-d690-4137-af26-806a77e27687.png">
the listener is set up like this:

```angular2html
const getData = () => {
    const notificationsRef = ref(db, `notifications`);
    onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        setMessages(data);
    });
};

```

Put some text in the Input field and hit 'createNotification' to put() a new 'notification' in the collection 



adding a new 'notification' is simple. (there's also a rest api)
```angular2html
const createNotification = () => {
    const db = getDatabase();
    push(ref(db, `notifications/${userId}/`), {
        id: Date.now(),
        message: value,
    });
}
```

to remove a 'notification':
```angular2html
const removeMessage = (id) => {
    remove(ref(db, `notifications/${userId}/${id}/`));
};
```
