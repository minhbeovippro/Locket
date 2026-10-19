const mapping = {
  'Locket': ['Gold']
};

if (typeof $response === "undefined" || !$response || !$response.body) {
    $done({});
} else {
    var ua = ($request && $request.headers) ? ($request.headers["User-Agent"] || $request.headers["user-agent"] || "") : "";
    var obj;

    try {
        obj = JSON.parse($response.body);
    } catch (e) {
        $done($response);
    }

    if (obj) {
        obj.subscriber = obj.subscriber || {};
        obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
        obj.subscriber.entitlements = obj.subscriber.entitlements || {};

        var amin6789 = {
            auto_resume_date: null,
            display_name: "locket_1600_1y",
            is_sandbox: true,
            ownership_type: "PURCHASED",
            billing_issues_detected_at: null,
            management_url: "https://apps.apple.com/account/subscriptions",
            period_type: "normal",
            price: { "amount": 399000.0, "currency": "VND" },
            expires_date: "9999-01-09T10:10:14Z",
            grace_period_expires_date: null,
            refunded_at: null,
            unsubscribe_detected_at: null,
            original_purchase_date: "2026-10-10T10:10:15Z",
            purchase_date: "2026-10-10T10:10:15Z",
            store: "app_store",
            store_transaction_id: "2000001108724193",
        },
        locketGold = {
            grace_period_expires_date: null,
            purchase_date: "2026-10-10T10:10:15Z",
            product_identifier: "locket_1600_1y",
            expires_date: "9999-01-09T10:10:14Z"
        };

        const match = Object.keys(mapping).find(e => ua.includes(e));
        
        if (match) {
            let entitlementKey = mapping[match][0];
            let productId = mapping[match][1] || "locket_1600_1y";
            
            locketGold.product_identifier = productId;
            amin6789.display_name = productId;
            
            obj.subscriber.subscriptions[productId] = amin6789;
            obj.subscriber.entitlements[entitlementKey] = locketGold;
        } else {
            obj.subscriber.subscriptions["locket_1600_1y"] = amin6789;
            obj.subscriber.entitlements.pro = locketGold;
        }
    }

    $done({ body: JSON.stringify(obj) });
}
