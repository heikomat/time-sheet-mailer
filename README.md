### time-sheet-mailer
A node-module to automatically send excel time-sheets

### Installation
```bash
npm install -g time-sheet-mailer
```

### Configuration
```bash
tsm config
```
edit the existing demo-config according to your needs.  
`$project` in email.subject will be replaced by the projectname. 

This will try to open the tsm-config with your prefered editor, but falls back to vim
if it can't find one. You can also specify the editor to use in an environment-variable, like so:
```bash
EDITOR=nano tsm config
```

#### google-caveats
If you use google, and **don't** have 2FA, you might need to allow less secure apps  [here](https://www.google.com/settings/security/lesssecureapps)  
If you use google, and **do** have 2FA, you need to create an app-password [here](https://security.google.com/settings/security/apppasswords)

### Testing the config
```bash
tsm dryrun
```
This will not actually send emails, but show you what would be sent.

### Sending the time-sheets
```bash
tsm run
```

### Config-file
The config-file has the following format:
```JavaScript
{
    "directory": "/path/to/your/timesheets",

    "smtp": {
        "host": "smtp.gmail.com",
        "port": 465,
        "username": "YourSMTPUsernameHere",
        "password": "YourSMTPPasswordHere"
    },

    "email": {
        "sender": "YourSender NameHere",
        "subject": "Timesheet for $project"
    },

    "mailadresses": {
        "boss": "boss@mycompany.com",
        "team": "team@mycompany.com",
        "accounting": "accounting@mycompany.com"
    },

    "projects": {
        "CoolProject": ["team"],
        "InternalProject": ["boss", "team"],
        "YourprojectNameHere": ["accounting", "boss"]
    }
}
```

