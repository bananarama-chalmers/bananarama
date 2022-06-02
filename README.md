# Bananarama

![GitHub CI](https://github.com/bananarama-chalmers/bananarama/actions/workflows/unit-tests.yml/badge.svg)

Project repo for a GPS pooling app for finding the best meetup spot when carpooling. Made by Bananarama in TDA257.

## Team members

- Ludvig Digné, [@digneludvig](https://github.com/digneludvig)
- Eric Erlandsson, [@EricErlandssonHollgren](https://github.com/EricErlandssonHollgren)
- Simon Johnsson, [@BAMF0](https://github.com/BAMF0)
- Samuel Kajava, [@samkaj](https://github.com/samkaj)
- Adam Landberg, [@adamplandberg](https://github.com/adamplandberg)
- Hugo Mårdbrink, [@hugomardbrink](https://github.com/hugomardbrink)
- Axel Söderberg, [@axelsoderberg](https://github.com/axelsoderberg)

## Navigating the repository

### Reflections, coding guidelines, meeting protocols and social contract

All documents are found in `./doc` and their respective subdirectory.

- Individual reflections - `./doc/reflections/[team-member-name]`.
- Team reflections - `./doc/reflections/team`.
- Meeting protocols - `./doc/meetings` and via [Google drive](https://drive.google.com/drive/folders/1-7u6WKM9A7ffXk8Di16uuG8JPrV1AxPL). 
- Social contract - `./doc/`.
- Coding guidelines - `./CONTRIBUTING.md`.

### Code and GitHub Actions

- Project code is found in `./dev/app/src`.
  - Backend/model - `./dev/app/src/model`
  - Frontend - `./dev/app/src/components` & `./dev/app/src/pages`
- GitHub Actions CI is found in `./github/workflows`.

## External resources

- [Trello](https://trello.com/invite/b/gPkOTES8/adaa7303cfc620e6b2959125b9f5f90c/scrum-board).
- [Google drive](https://drive.google.com/drive/folders/1-7u6WKM9A7ffXk8Di16uuG8JPrV1AxPL).
- [Figma](https://www.figma.com/file/Bty1vRzHjiHqp5G75nxO4O/Untitled?node-id=0%3A1). Note: make sure to look at both pages (accessible from main menu).

## Installation and running:
Use a CLI (Terminal for MacOS, CMD/PowerShell for Windows) and use the below commands.

## Downloading this repo:

Either use GitHub desktop or use your terminal to clone the repo.

```console
git clone https://github.com/bananarama-chalmers/bananarama.git
```

## Commands

You'll need to use the following commands in the terminal:

* `cd path/to/this/directory` changes the directory to `path/to/this/directory`.
* `git clone https://github.com/...` clones repositories, write the URL to the repository you want to clone

### Change directory to this repo:
```console
cd path/to/this/directory
```

### Install frontend:
```console
cd dev/app
```
```console
npm install
```

### Run app:
```console
cd dev/app
```
```console
npm start
```

### If it doesn't work
Make sure to be in the right directory (the same directory where the git repository is on your computer)
