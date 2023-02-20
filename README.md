### Extension Benchmarking Utiliy
---
This repo is used for benchmarking different Manifest V3 APIs and their alternatives.
It's mainly useful for benchmarking and graphing the time cost and stability of various ways the background service worker and the content script can communicate.

#### Task Description

- Create a nodejs program that will be able to launch a chrome browser instance with a custom extension.
- You also have to build the extension that the program injects from scratch.
- The extension should be able to execute different types of tests based on the program's launch arguments.
- The program's launch arguments should include (but not limited to): 
    - [ Benchmark-Lifespan ] How long the current testing benchmark should live.
    - [ Benchmark-Testing-Method ] The specified method that the extension should be executing/benchmarking.
- The program should be able to take the extension's source code and bundle it based on the program's launch options.
- The extension should consist of  (but not limited to) a background service worker file and a content file (running in all pages.)
- The extension should be built modular. It should not be coded to fit a specific test case, but rather resemble a general benchmarking utility. 
- The built extension (after taking the launch options into consideration) should only include the code, important for the specified launch options.

Generally, you can picture the end result to look like something like this:
1. User launches a test using your NodeJS program.
1.1. The program will take it's launch options. It will then build the extension's source code with those launch options in mind.
1.2. The program will launch a `playwright` instance that loads your extension.
1.3. The extension will execute the specified benchmark.
1.4. The program will wait for the extension to finish the benchmark routine, and get the results from the extension.
2. Once the program has the benchmark results from the extension, it should be able to graph the results and generate an html file that can be opened without the need to use the program twice (in other words, a standalone html report file).
