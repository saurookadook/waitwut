---
title: "Choosing the Right Tools"
date: "2024-08-19"
fullPath: "/notes/python/pkgs-n-virtual-envs/choosing-the-right-tools"
iconComponentName: "python_icon"
sectionSlug: "notes"
---

# `pipenv` and `poetry`

- `pip` and `virtualenv` are standard tools
- but situation is changing
- _many_ different tools and projects
- overview of current situation
- future is uncertain

## Python Packaging Authority (pypa)

- working group that maintains many of the relevant projects in Python packaging

## Installation
- `pip`
    - formats of packages
        - wheels
        - eggs
- `easy_install`
    - don't use

## Development
- dependency management
    - `requirements.txt`
- project isolation
    - `virtualenv`
    - `venv`
- new projects
    - `pipenv`
    - `poetry`
- _NOTE: as of May, 2022: neither `pipenv` or `poetry` are standard tools for Python community_

## Anaconda

- [https://www.anaconda.com/](https://www.anaconda.com/)
- have their own Python distribution
- have their own package management
- have their own distribution system
- have tool called `conda`
    - does everything `pip` and `virtualenv` do
    - installer
    - virtual environment tool
    - and much more
    - can install non-Python packages too
- mostly aimed at Data Science community
- _NOTE: as of May, 2022: Anaconda isn't really part of standard Python ecosystem_

## Requirements

- `requirements.txt`
    - standard (`pip`)
    - non-deterministic dependency resolution
- `Pipfile`
    - `pipenv`
    - custom format
    - deterministic dependency resolution
- `pyproject.toml`
    - `poetry`
    - standard (PEP-518)
    - deterministic dependency resolution

## `pipenv`

> 🚧 _TODO_ 🚧

## `poetry`

- [Basic Usage](https://python-poetry.org/docs/basic-usage/)

## Useful and Common Commands

```bash
# Create new project
$ poetry new <project_name>

# Add package to project
$ cd ~/path/to/project
$ poetry add <package_name>

# Run script
$ poetry run python ~/path/to/project/some_script.py

# Start shell
$ poetry shell
$ . $HOME/.cache/pypoetry/virtualenvs/<project_name>-<some_hash>-py<version>/bin/activate
```
