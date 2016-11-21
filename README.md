### time-sheet-mailer
A node-module to automatically send daily time-sheets

### Installation
run `npm install -g time-sheet-mailer`

### Configuration
run `tsm config` and edit the existing demo-config according to your needs.  
`$project` in email.subject will be replaced by the projectname.  


If you use google, and **don't** have 2FA, you might need to allow less secure apps (https://www.google.com/settings/security/lesssecureapps)[here]  
If you use google, and **do** have 2FA, you need to create an app-password (https://security.google.com/settings/security/apppasswords)[here]

### Testing the config
run `tsm dryrun`

### actually sending the time-sheets
run `tsm run`
