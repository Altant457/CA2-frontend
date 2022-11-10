
*This project is meant as start code for CA-3 and exam projects, made by members of group CA2-2-Bornholm-B*

*Projects which are expected to use this start-code are projects that require all, or most of the following technologies:*
- *JPA and REST*
- *Testing, including database test*
- *Testing, including tests of REST-API's*
- *CI and CONTINUOUS DELIVERY*

## CA2

### Preconditions
*In order to use this code, you should have a local developer setup + 
a "matching" server on the internet, which you have admin access to.
You will also need to set up nginx and certbot on your server, if you want
HTTPS (don't forget `ufw allow 443` to allow https traffic).*

### Getting Started

**Remember to run `npm install` after cloning. Else nothing will work.**

To start using this project, edit the URL in `src/settings.js` and the ip 
in `deploy.sh`, so they point at your server. Then you should be good to go.
