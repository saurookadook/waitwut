---
title: 'Concurrency'
date: '2025-09-07'
fullPath: '/notes/python/concurrency'
iconComponentName: 'python_icon'
sectionSlug: 'notes'
---

## Resources

- [Concurrency in Python: Understanding Threading, Multiprocessing, and Asyncio](https://medium.com/@ark.iitkgp/concurrency-in-python-understanding-threading-multiprocessing-and-asyncio-03bd92ca298b)

## Threads and Processes

### Processes

**Processes** are independent instances of a program in execution.

Each process:

- runs in own memory space
- has own resources allocated by operating system
- does not share memory with other processes unless _explicitly_ designed to do so through inter-process communication (IPC)

### Threads

**Threads** are smallest unit of execution within a process.

Multiple threads within same process share memory space.

- allows threads to communicate more efficiently than separate processes
- shared memory runs risk of synchronization issues

#### Simple Example of Creating a Thread

```python
import threading
import time


def print_numbers():
    for i in range(5):
        print(f"Thread: {i}")
        time.sleep(1)


# Create new thread object to run `print_numbers`
thread = threading.Thread(target=print_numbers)

# Start thread
thread.start()

# Wait for thread to finish before exiting main program
thread.join()
print("Main thread: execution finished")
```

---

## Multithreading vs Multiprocessing

### Multithreading

**Multithreading** allows multiple threads to run concurrently within same process.

- useful for I/O bound tasks, where threads can wait for external resources _(i.e. file I/O, network operations, etc.)_ while others continue executing

> _**NOTE**: in **Python**, true parallelism using multithreading is limited by Global Interpreter Lock (GIL), which allows only one thread to execute **Python** bytecode at a time._

#### Simple Multithreading Example

```python
import threading
import time


def worker(name):
    print(f"Worker {name} starting")
    time.sleep(2)
    print(f"Worker {name} finished")


threads = []

for i in range(5):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()


for t in threads:
  t.join()


```

### Multiprocessing

**Multiprocessing** involves running multiple processes, each with its own **Python** interpreter and memory space.

- allows for _**true**_ parallelism
- ideal for CPU-bound tasks

#### Simple Multiprocessing Example

```python
import multiprocessing
import time


def worker(name):
    print(f"Worker {name} starting")
    time.sleep(2)
    print(f"Worker {name} finished")


if __name__ == "__main__":
    processes = []

    for i in range(5):
        p = multiprocessing.Process(target=worker, args=(i,))
        processes.append(p)
        p.start()


    for p in processes:
        p.join()


```

---

## `asyncio`

**`asyncio`** is a **Python** library for writing concurrent code using `async/await` syntax.

- designed for I/O-bound tasks
- uses event loop to manage and schedule tasks

### Key Concepts in `asyncio`

1. **Coroutines**: functions defined with `async def`
    - building blocks of `asyncio`
    - represent tasks that can be _paused_ and _resumed_
2. **Event Loop**: core of `asyncio` that manages execution of tasks
3. **Tasks**: wrappers around coroutines that are scheduled on event loop
4. **await**: pauses execution of coroutine, yielding control back to event loop

#### Simple `asyncio` Example

```python
import asyncio


async def task(name):
    print(f"Task {name} starting")
    await asyncio.sleep(2)
    print(f"Task {name} finished")


async def main():
    await asyncio.gather(task("A"), task("B"), task("C"))


asyncio.run(main())

```

### Handling CPU-Bound Tasks in `asyncio`

**`asyncio`** is _not_ well-suited for CPU-bound tasks since they can block event loop; however, CPU-bound tasks can be offloaded to separate thread or process using `asyncio.to_thread()` or `asyncio.run_in_executor()`, respectively.

#### Example of Offloading CPU-Bound Task in `asyncio`

```python
import asyncio
import time


def cpu_bound_task(n):
    time.sleep(n)
    return n * n


async def main():
    result = await asyncio.to_thread(cpu_bound_task, 2)
    print(f"Result: {result}")


asyncio.run(main())

```
