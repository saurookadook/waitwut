---
title: "Using virtualenvwrapper"
date: "2024-08-19"
fullPath: "/notes/python/pkgs-n-virtual-envs/using-virtualenvwrapper"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# Using `virtualenvwrapper`

- user-friendly wrapper around virtualenv
- easy creation and activation
- bind projects to virtualenvs
- great with large number of projects

As of May 2022, `virtualenvwrapper` is tested under Python 2.7-3.6
- meaning limited support for any versions outside of that range

## Installing `virtualenvwrapper`

### On Linux or MacOS

- Should be installed globally
```bash
$ python3 -m pip install virtualenvwrapper
```

- Additional configuration
```bash
$ which virtualenvwrapper.sh
```
Additions to `.bash_profile`
```bash
export PATH="$HOME/.local/bin:$PATH"
export PATH="/usr/local/opt/python/libexec/bin:$PATH"

export VIRTUALENVWRAPPER_PYTHON=$(which python)
export VIRTUALENVWRAPPER_VIRTUALENV=$(which virtualenv)

export WORKON_HOME="$HOME/virtualenvs"
export PROJECT_HOME="$HOME/Development"
source "/usr/local/bin/virtualenvwrapper.sh"
```

## Working with `virtualenvwrapper`

- activating a project
- switching projects
- creating projects
- removing projects
- linking projects with virtualenvs

**Will show virtual environments**
```bash
$ workon
```

**Can activate virtual environment by passing the env as an argument**
```bash
$ workon my_env
```

**Making new projects using virtualenvwrapper**
```bash
$ mkproject new_project
```

**Binding environment to project location**
```bash
# activate environment
$ workon my_env
# move to correct folder
(my_env) $ cd ~/some/path/to/my_env
# bind environment to folder
(my_env) $ setvirtualenvproject
```

**Can make temporary environment**
```bash
$ mktmpenv
```
_deactivating this environment with `deactivate` will delete the environment and any packages installed for it_
