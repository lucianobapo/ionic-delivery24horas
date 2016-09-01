!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','//connect.facebook.net/en_US/fbevents.js');

fbq('init', '1982894748602312');
//fbq('track', "PageView");
// ViewContent
// Track key page views (ex: product page, landing page or article)
fbq('track', 'ViewContent');

// Search
// Track searches on your website (ex. product searches)
fbq('track', 'Search');

// AddToCart
// Track when items are added to a shopping cart (ex. click/landing page on Add to Cart button)
fbq('track', 'AddToCart');

// AddToWishlist
// Track when items are added to a wishlist (ex. click/landing page on Add to Wishlist button)
//    fbq('track', 'AddToWishlist');

// InitiateCheckout
// Track when people enter the checkout flow (ex. click/landing page on checkout button)
//    fbq('track', 'InitiateCheckout');

// AddPaymentInfo
// Track when payment information is added in the checkout flow (ex. click/landing page on billing info)
//    fbq('track', 'AddPaymentInfo');

// Purchase
// Track purchases or checkout flow completions (ex. landing on "Thank You" or confirmation page)
//    fbq('track', 'Purchase', {value: '1.00', currency: 'USD'});

// Lead
// Track when a user expresses interest in your offering (ex. form submission, sign up for trial, landing on pricing page)
fbq('track', 'Lead');

// CompleteRegistration
// Track when a registration form is completed (ex. complete subscription, sign up for a service)
//    fbq('track', 'CompleteRegistration');