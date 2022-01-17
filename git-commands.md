# Git commands

## clone repo

`git clone {repo-url}`

## change folder

`cd xml-and-js`

## change origin

`git remote set-url origin {repo-url}`

## check origin

`git config --get remote.origin.url`
should show url of your repo

## commit and push

```git
  git add *
  git commit -m "{message-here}"
  git push
```

## add another remote

```git
  git remote add source https://github.com/OleksiiKachan/xml-and-js.git
```

## pull from another source

```git
  git pull source main
```
