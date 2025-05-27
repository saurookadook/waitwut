---
title: 'Docker'
date: '2025-05-15'
fullPath: '/notes/docker'
iconComponentName: "docker_icon"
sectionSlug: 'notes'
---

## Overview

- Docker provides much more predictable way to ship applications
- additionally, it can:
  - accelerate developer onboarding
  - eliminate app conflicts
  - environment consistency
  - ship software faster

### Images and Containers

<dl>
    <dt>
        <b>Docker Image</b>
    </dt>
    <dd>defines contents that are needed to run a container</dd>
    <dd>read-only template composed of layered filesystems used to share common files and create Docker container instances</dd>
    <dt>
        <b>Docker Container</b>
    </dt>
    <dd>runs your application</dd>
    <dd>an isolated, secured shipping container created from image that can be run, started, stopped, moved, and deleted</dd>
</dl>

### Dockerfile

- text document
- contains all of the commands a user could call on the command line to assemble an image

<figure>

```Dockerfile
FROM        node:alpine
LABEL       author="Andy Maskiell"

ENV         NODE_ENV=production
ENV         PORT=3000

WORKDIR     /var/www
COPY        package.json package-lock.json ./
RUN         npm install

COPY        . ./
EXPOSE      $PORT
# NOTE: this exposed port refers to the INTERNAL PORT

ENTRYPOINT  ["npm", "start"]
```

<figcaption>

<em>Simple `Dockerfile` example</em>

</figcaption>
</figure>

### Building the Image

```sh
# `-t`: short for `--tag`
# `<name>`: Image name
# `.`: build context
docker build -t <name> .

# `<registry>`: Docker registry name
# `<name>`: Image name
# `<tag>`: Tag (often a version number)
docker build -t <registry>/<name>:<tag> .
```

### Deploying Image to Docker Hub

```sh
docker push <user-name>/<image-name>:<tag>
```

### Images, Containers, and File Layers

```txt
R/O = Read Only
R/W = Read/Write

┌ - - - - - - - - - -┐ ─╮
┆   Thin R/W Layer   ┆  ├──> Container Layer
└- - - - - - - - - - ┘ ─╯

╔════════════════════╗ ─╮
║ ┌──────────────┐   ║  │
║ │ 91e54dfb1179 │   ║  │
║ └──────────────┘   ║  │
║ ┌──────────────┐   ║  │
║ │ d74508fb6632 │   ║  │
║ └──────────────┘   ║  │
║ ┌──────────────┐   ║  │
║ │ c22013c84729 │   ║  │
║ └──────────────┘   ║  ├──> Image Layers (R/O)
║ ┌──────────────┐   ║  │
║ │ d3a1f33e8a5a │   ║  │
║ └──────────────┘   ║  │
║                    ║  │
║      Ubuntu        ║  │
║                    ║  │
╚════════════════════╝ ─╯
┌──────────────┐           ╮
│              │           ├
└──────────────┘           ╯
```

<!--
┐ └ ┴ ┬ ├ ─ ┼ ┘ ┌ │ ┤
╣ ║ ╗ ╝ ╚ ╔ ╩ ╦ ╠ ═ ╬
░ ▒ ▓ █ ▄ ▀ ■
-->

### Running a Container

```sh
docker run -p <external-port>:<internal-port> <image-name>
```

### Viewing Container Logs

```sh
docker logs <container-id>
```

## Using Container Volumes

- [Docs on Volumes](https://docs.docker.com/storage/volumes)
- can use volumes to store data outside of a container

### Volume Mounts

#### Creating a Container Volume

Created by passing `-v` flag to `docker run`

- syntax: `-v <path-to-directory-or-file-in-container>` or `-v <path-to-directory-or-file-on-host>:<path-to-directory-or-file-in-container>`
- tells Docker that data in folder should be stored on container host


```sh
docker run -p <external-port>:<internal-port> -v /var/www/logs <image-name>

docker run -p <external-port>:<internal-port> -v $(pwd):/var/www/logs <image-name>

docker run -p <external-port>:<internal-port> -v $HOME/some/folder:/var/www/logs <image-name>
```
