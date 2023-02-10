benchmarking the commuincation between the background script and content script

background script should call executeScript, which takes a function, taht function should call a function defined inside the content script,
the function in the content script should return two values, time recieved and time sent. The results of this function are returned to executeScript as an array
calculate one way trip and two way trip
two way mark before executeScript is called and when it receives it's results
one way from background
oneway from contentscript




when running tests keep devtools closed because it allocates more resources to extension

extension should open 10 tabs and communicate between them

each extension should only send messages in one of these ways
test ports vs scripting API vs websockets(if possible to setup), vs regular broadcast channel?

benchamrk total messages sent and recieveing in a minute
benchmark average response time

graph the response time over the minute, because it may start fast and slow down

there may be multiple ways to use the scripting api to send and recieving messages, lisetener and callback function


button in extension to run test, results are shown in page or extendsion dropdown






Benchmark project outline

It should be a nodejs project that should be runnable with params like this:

npm run test --tabs=10 --method=scriptingAPI --timeMinutes=2 --output=C:\users\asd\asd\results.log

This will create a playwright instance with the extension injected using a launch option
Before injecting the extension and running playwright you will modify the extension dynamically based on the options we provide

The extension itself will include all the code logic, but only one method must be used at a time for accurate results.
(either scripting, either postMessage, either something else)

You'll have a folder that's the extension source code and a folder that's for built extension.
In your extension you will have some settings variables like so:

const SETTING_TAB_COUNTS = "{{TAB_COUNT_PLACEHOLDER}}"
const SETTING_METHOD = "{{METHOD_PLACEHOLDER}}"
const SETTING_TIME = "{{TIME_PLACEHOLDER}}"

...
...
...

if(SETTING_METHOD == "scriptingAPI") {
  ...
  ...
}
else if(SETTING_METHOD == "broadcastMessage") {
      ...
     ...
}

When we run npm run (....) your code will build that extension into a separete folder with the replaced values, and
only them it will run puppeteer with the extension loaded.

NOTES: - The browser must be running headful for accurate results.
     : - Only one method of messaging should be tested at a time.
     : - After the extension is finished (time passed) it will give the results to your program via web socket message
     : - Then you can save it into a file in whatever format you choose

You program will then have another script that takes those data and generates a graph of sorts
(you're free to make that work however you want)

npm run graph --logsFolder=--output=C:\users\asd\asd