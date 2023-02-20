benchmarking the commuincation between the background script and content script. Each type of test must be run on it's own not all at once

Extension is inside /src
To build (only needed if updating the background or content script)
    npm run build

build script runs the gulp file which should dynaimcally replace the variables with flags like so --tabs=10 --method=scriptingAPI --timeMinutes=2, this could be improved to build in the same command as the test itself


Run test    
    npm run build


METHOD 1

scripting API

background script should call executeScript, which takes a function, that function should call a function defined inside the content script,
the function in the content script should return two values, time recieved and time sent. 
there may be multiple ways to use the scripting api to send and recieving messages, lisetener and callback function

METHOD 2

postMessage


METHOD 3 

websockets


IMPORTANT

when running tests keep devtools closed because it allocates more resources to extension
performance.now is not conisistent between contexts and had to be calibrated using performance.timeOrigin

TODO:
Also should test the connection being initiated by the background script vs by the content script, if this effects speed

CALCULATE:
two way mark before executeScript is called and when it receives it's results
one way from background
one way from contentscript
Total messages sent and recieveing in a minute


GRAPH:
graph the two way response time over the testing period, right now each tab is graphed on top of eachother but these should be graphed combined, my idea is merge them by every ms and take the highest value, reducing points on the graph and showing the peak latency



Old Benchmark project outline

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

When we run npm run (....) your code will build that extension into a separete folder with the replaced values, and
only them it will run puppeteer with the extension loaded.

NOTES: - The browser must be running headful for accurate results.
     : - Only one method of messaging should be tested at a time.
     : - After the extension is finished (time passed) it will give the results to your program via web socket message
     : - Then you can save it into a file in whatever format you choose

You program will then have another script that takes those data and generates a graph of sorts
(you're free to make that work however you want)

npm run graph --logsFolder=--output=C:\users\asd\asd