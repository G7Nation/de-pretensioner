# depretentioner
Firefox browser extension that replaces occurances of pretentious words with their normal-person equivalent when viewing webpages:
```
whilst  -> while  
amongst -> among  
whomst  -> whom  
```
Since Firefox version 46, Mozilla fucked everyone over by forbidding unsigned or self-signed extensions (unless you use a development/nightly/unbranded build).

To get around this, every time you start your browser, direct it to about:debugging in the URL bar.  Click on "Load Temporary Add-on" then select any of the files in the depretentioner directory.

Known Issues: Searching for "whilst" (and presumably the other words that this extension replaces) may crash the browser.  I don't really know JavaScript, so please feel free to figure out what's wrong and open a pull request.
