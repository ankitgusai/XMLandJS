# AJAX

**AJAX** stands for _Asynchronous JavaScript and XML_. AJAX is a technique for creating better, faster, and more interactive web applications with the help of XML/JSON, HTML, CSS, and JS.

Ajax uses XHTML for content, CSS for presentation, along with Document Object Model and JS for dynamic content display.

Conventional web applications transmit information to and from the sever using synchronous requests. It means you fill out a form, hit submit, and get directed to a new page with new information from the server.

With AJAX, when you hit submit, JavaScript will make a request to the server, interpret the results, and update the current screen. In the purest sense, the user would never know that anything was even transmitted to the server.

AJAX is a web browser technology independent of web server software.

A user can continue to use the application while the client program requests information from the server in the background.

Intuitive and natural user interaction. Clicking is not required, mouse movement is a sufficient event trigger.

Data-driven as opposed to page-driven.

AJAX is based on the following open standards:

- Browser-based presentation using HTML and CSS
- Data is stored in XML/JSON format and fetched from the server
- Behind-the-scenes data fetches using XMLHttpRequest objects in the browser
- JavaScript to make everything happen

AJAX cannot work independently. It is used in combination with other technologies to create interactive webpages

- JavaScript
  - Loosely typed scripting language.
  - JavaScript function is called when an event occurs in a page.
  - Glue for the whole AJAX operation.
- DOM
  - API for accessing and manipulating structured documents.
  - Represents the structure of XML and HTML documents.
- CSS
  - Allows for a clear separation of the presentation style from the content and may be changed programmatically by JavaScript
- XMLHttpRequest
  - JavaScript object that performs asynchronous interaction with the server

## Browser support

Not all browsers support XMLHttpRequest object. To support IE need to have a fallback

```js
let ajaxRequest;

try {
  ajaxRequest = new XMLHttpRequest();
} catch (e) {
  // Internet Explorer Browsers
  try {
    ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      // Something went wrong
      alert("Your browser broke!");
    }
  }
}
```

## AJAX Flow

- A client event occurs.
- An XMLHttpRequest object is created.
- The XMLHttpRequest object is configured.
- The XMLHttpRequest object makes an asynchronous request to the server.
- Server returns the result containing XML document.
- The XMLHttpRequest object calls the callback() function/resolves promise and processes the result.
- The HTML DOM is updated.
