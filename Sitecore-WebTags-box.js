// Define the Boxever queue
var _boxeverq = _boxeverq || [];

//Define the Boxever settings
var _boxever_settings = {
  client_key: "klus01taib90pmh5tnf817nbmgiksmdg", //US "klus01taib90pmh5tnf817nbmgiksmdg", // EU "psfu6uh05hsr9c34rptlr06dn864cqrx" Replace with your client key
  target: "https://api-us.boxever.com/v1.2", // Replace with your API target endpoint specific to your data center region
  cookie_domain: ".steep-excellent-sushi.glitch.me", // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
  javascriptLibraryVersion: "1.4.8", // Replace with the latest Boxever JavaScript library version"
  pointOfSale: "SpinBurger", // Replace with the same point of sale configured in system settings"
  web_flow_target: "https://d35vb5cccm4xzp.cloudfront.net",
};
// Import the Boxever library asynchronously
(function () {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = "https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.8.min.js";
  var x = document.getElementsByTagName("script")[0];
  x.parentNode.insertBefore(s, x);
})();

_boxeverq.push(function () {
  var viewEvent = {
    browser_id: Boxever.getID(),
    channel: "WEB",
    type: "VIEW",
    language: "EN",
    currency: "USD",
    page: "homepage",
    pos: "SpinBurger",
  };
  // Invoke event create
  //(<event msg>, <callback function>, <format>)
  Boxever.eventCreate(viewEvent, function (data) {}, "json");
});

function login(email) {
  _boxeverq.push(function () {
    var identityEvent = {
      browser_id: Boxever.getID(),
      channel: "WEB",
      type: "IDENTITY",
      language: "EN",
      currency: "USD",
      page: "homepage",
      pos: "SpinBurger",
      email: email,
      identifiers: [
        {
          provider: "email",
          id: email,
        },
      ],
    };
    // Invoke event create
    // (<event msg>, <callback function>, <format>)
    Boxever.eventCreate(identityEvent, function (data) {}, "json");
  });
}

function sendAddEvent(
  productType,
  itemID,
  productName,
  productPrice,
  productID,
  productCurrency
) {
  _boxeverq.push(function () {
    var addEvent = {
      browser_id: Boxever.getID(),
      channel: "WEB",
      type: "ADD",
      language: "EN",
      currency: "USD",
      page: "homepage",
      pos: "SpinBurger",
      product: {
        type: productType,
        item_id: itemID,
        name: productName,
        orderedAt: new Date().toISOString(),
        quantity: 1,
        price: productPrice,
        productId: productID,
        currencyCode: productCurrency,
      },
    };
    // Invoke event create
    // (<event msg>, <callback function>, <format>)
    Boxever.eventCreate(addEvent, function (data) {}, "json");
  });
}

function sendConfirmEvent(confirmedProducts) {
  _boxeverq.push(function () {
    var confirmEvent = {
      browser_id: Boxever.getID(),
      channel: "WEB",
      type: "CONFIRM",
      language: "EN",
      currency: "USD",
      page: "checkout",
      pos: "SpinBurger",
      product: confirmedProducts,
    };
    // Invoke event create
    // (<event msg>, <callback function>, <format>)
    Boxever.eventCreate(confirmEvent, function (data) {}, "json");
  });
}

function sendCheckoutEvent() {
  _boxeverq.push(function () {
    var checkoutEvent = {
      browser_id: Boxever.getID(),
      channel: "WEB",
      type: "CHECKOUT",
      language: "EN",
      currency: "USD",
      page: "checkout",
      pos: "SpinBurger",
      reference_id: "ORDER_1123",
      status: "PURCHASED",
    };
    // Invoke event create
    // (<event msg>, <callback function>, <format>)
    Boxever.eventCreate(checkoutEvent, function (data) {}, "json");
  });
}

//send a CONFIRM event
async function sendConfirmEvent(confirmedProducts) {
  // Confirm event object
  var confirmEvent = {
    channel: "WEB",
    currency: "USD",
    pointOfSale: "Spinburger",
    language: "EN",
    page: "homepage",
    product: confirmedProducts,
  };
  // Send a Confirm event
  await engage.event("CONFIRM", confirmEvent);
}

//send a CHECKOUT event
async function sendCheckoutEvent() {
  // Confirm event object
  var checkoutEvent = {
    channel: "WEB",
    currency: "USD",
    pointOfSale: "Spinburger",
    language: "EN",
    page: "homepage",
    reference_id: "ORDER_1213",
    status: "PURCHASED",
  };
  // Send a Confirm event
  await engage.event("CHECKOUT", checkoutEvent);
}
