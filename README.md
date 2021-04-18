# WARNING
I know this app and codebase is a mess. I am aware of this. It was only meant to be proof of the concept. Many, if not all, things need to be rewritten. Some features were written in a hurry and were not intended to be used in the "final" version, but they are.
If a final and rewritten version is produced somehow, I want it to be safe, modular, and code pleasant to read.
Things I want to add:

* Voice interface to interact with everything in the app.
* Crawler that achieves more functionalities through third party services, rather than relying on an API.
* New UI design
* Reworked task runner and visual language for non-technical users.
* Create a database schema? Currently, this application uses an encrypted JSON format.

I am not proud of the quality of this code, but maybe someone will take an example and not write such code.

# flerovium

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn electron:serve
```

### Compiles and minifies for production on current platform
```
yarn electron:build
```
## To build for other platforms use
* MacOS ```--mac, -m, -o, --macos```
* Linux ```--linux, -l```
* Windows ```--win, -w, --windows```

Just pass arguments to yarn/npm command

For linux: ```yarn electron:serve -l```

For other options head to [Electron-Builder CLI](https://www.electron.build/cli)

### Lints and fixes files
```
yarn lint
```

# Configuration

## Configuring services

As for now, I've only added Spotify and Discord templates to use. You can add own if your service uses OAuth2.
You can create own authentication flow editing default script.

Required paths for application to work:

In Spotify dashboard create application and add redirect url: http://localhost:8080/authorize/spotify

For other services do the same but with your own name of service http://localhost:8080/authorize/Here_Put_Name

In service settings inside app, change client_id and client_secret to your own and modify url paths etc.
