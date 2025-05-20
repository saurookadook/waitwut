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
