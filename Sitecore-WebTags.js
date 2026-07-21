// Initialize the engage variable
var engage = undefined;

// Create and inject the <script> tag into the HTML
var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = "https://d1mj578wat5n4o.cloudfront.net/sitecore-engage-v.1.4.1.min.js";
var x = document.querySelector("script");
x.parentNode.insertBefore(s, x);

// Initialize the Engage SDK
s.addEventListener("load", async () => {
  var settings = {
    clientKey: "klus01taib90pmh5tnf817nbmgiksmdg",
    targetURL: "https://api-engage-us.sitecorecloud.io",
    pointOfSale: "SpinBurger",
    cookieDomain: "",
    cookieExpiryDays: 365,
    forceServerCookieMode: false,
    includeUTMParameters: true,
    webPersonalization: true, //turn personalization on or off
  };
  engage = await window.Engage.init(settings);

  // VIEW event object
  var eventData = {
    channel: "WEB",
    language: "EN",
    currency: "USD",
    page: "homepage",
    pointOfSale: "SpinBurger",
  };

  // Send a VIEW event
  engage.pageView(eventData);
});

async function login(email) {
  // Identity event object
  var identityEvent = {
    channel: "WEB",
    language: "EN",
    currency: "USD",
    page: "homepage",
    pointOfSale: "SpinBurger",
    email,
    identifiers: [
      {
        id: email,
        provider: "email",
      },
    ],
  };
  // Send a identity event
  await engage.identity(identityEvent);
}

//function to ADD the product items to the cart and send to CDP
async function sendAddEvent(
  productType,
  itemID,
  productName,
  productPrice,
  productID,
  productCurrency
) {
  // Add event object
  var addEvent = {
    channel: "WEB",
    currency: "USD",
    pointOfSale: "SpinBurger",
    language: "EN",
    page: "homepage",
    product: {
      name: productName,
      type: productType,
      item_id: itemID,
      productId: productID,
      referenceId: productID,
      orderedAt: new Date().toISOString(),
      quantity: 1,
      price: productPrice,
      currency: productCurrency,
    },
  };
  // Send a add event
  await engage.event("ADD", addEvent);
}

//send a CONFIRM event
async function sendConfirmEvent(confirmedProducts) {
  // Confirm event object
  var confirmEvent = {
    channel: "WEB",
    currency: "USD",
    pointOfSale: "SpinBurger",
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
    pointOfSale: "SpinBurger",
    language: "EN",
    page: "homepage",
    reference_id: "ORDER_1213",
    status: "PURCHASED",
  };
  // Send a Confirm event
  await engage.event("CHECKOUT", checkoutEvent);
}
