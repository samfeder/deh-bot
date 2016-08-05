# FAQ

1. Do we need to pass country code in all user requests? or does Uplink determine region independently? Does Uplink register the user's country code to the session upon login?

2. How can we request configuration json for each region? (US, UK and Canada) `i.e. - https://d1d0j1u9ayd8uc.cloudfront.net/channels/A7TIV9SL/show.website.json`

3. How can we request the homepage and sub-categories json for each region (US, UK and Canada)

4. How can we request a list of videos for specific category. How can we apply ordering and pagination to that request?

5. How can we request information about the film? Should I query this information from static API?

6. How can we request the list related videos, with applying by country code? We can’t use the static API.

7. How can we request the list of Shudder.TV for specific country?

8. How can we obtain a DRM certificate from IV for each platform?

9. How do we activate a device with a 5-digit code and current token instead of asking the user to enter login and password if they've already logged in. They shouldn only need to enter the code.

10. Do we going to use the same Channel code for US, UK and Canada?

11. How to get a list activated devices for each user? What are the current limitations and how to change them?

12. When you sign up via ATV, app is passed current user email to IV but later we can’t get this information from IV as it's returning nil. Did we fix this issue? We also can’t find this user into UpLink. It’s really important and we have to fix it.

13. Once you’re sign up via ATV UpLink should send welcome email. How we can customize it?
