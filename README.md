# A simple web redirect to allow users to open links in-app

Since Gmail forbids pop-ups redirecting to app links in email attachments, I've decided to create an app to help me with that.

## Sample Usage

When a user creates an account, an email is sent which redirects to the link below
https://lemeow125.github.io/simple-redirect/#/redirect/stude/activation/MUID/12asdSDFGSDTSDFG

The link above when clicked will open another link

stude://activation/MUID/12asdSDFGSDTSDFG

This link will open the "activation" page/screen of our mobile app, pass the UID slug value of "MUID" and activation slug value of "12asdSDFGSDTSDFG", thus allowing the user to activate his/her account without needing a dedicated web app

## Notes

- You should have Linking properly set up in your mobile app
- Do not change the "redirect" keyword in the URL
- "stude" in the example above must correspond to the name of your mobile app
- "activation" should correspond to the link to your mobile app's screen/page
- You can adjust the last two URL slugs/values according to your needs
- simple-redirect does not allow HTTP/HTTPS redirects for security reasons. If you wish to enable it, fork this repository, change forbid_http_links to false in App.tsx, and deploy it to Github pages on your own account

#### Powered by Vite, ReactJS, and React Router
