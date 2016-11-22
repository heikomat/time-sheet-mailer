### time-sheet-mailer
A node-module to automatically send excel time-sheets

### Installation
run `npm install -g time-sheet-mailer`

### Configuration
run `tsm config` and edit the existing demo-config according to your needs.  
`$project` in email.subject will be replaced by the projectname.  


If you use google, and **don't** have 2FA, you might need to allow less secure apps  [here](https://www.google.com/settings/security/lesssecureapps)  
If you use google, and **do** have 2FA, you need to create an app-password [here](https://security.google.com/settings/security/apppasswords)

### Testing the config
run `tsm dryrun`. This will not actually send emails, but show you what would be sent.

### Sending the time-sheets
run `tsm run`

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

