# NPM

Node Package Manager (NPM) provides two main functionalities:

- online repositories for node.js packages/modules
- command line utility to install Node.js packages, do version management and dependency management of Node.js packages

NPM comes bundled with Node.js

Check NPM version:

```bash
npm -v
```

Initialize

```bash
npm init
```

Install package:

```bash
npm install <package>
```

## Global vs Local

_Globally_ installed packages/dependencies are stored in system directory. Such dependencies can be used in CLI (Command Line Interface) function of any node.js but cannot be imported using require() in Node application directly.

By default, NPM installs any dependency in the local mode. Here local mode refers to the package installation in node_modules directory lying in the folder where Node application is present. Locally deployed packages are accessible via require() method. For example, when we installed express module, it created node_modules directory in the current directory where it installed the express module.
