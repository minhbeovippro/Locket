var specificDate = "2025-04-01T00:00:00Z"; 

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  $done({});
}

obj.subscriber = obj.subscriber || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};

var locketgold = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T00:00:00Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  store: "us_app_store",
  store_country: "US",
  country: "US",
  region: "us" 
};

var gold_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: "locket_3600_1y",
  expires_date: "2099-12-31T00:00:00Z",
  store: "us_app_store",
  store_country: "US",
  country: "US",
  region: "us"
};

const match = Object.keys(mapping).find(e => ua && ua.includes(e));

if (match) {
  let entitlementKey = mapping[match][0] || "Locket";
  
  obj.subscriber.subscriptions["locket_3600_1y"] = locketgold;
  obj.subscriber.entitlements[entitlementKey] = gold_entitlement;
} else {
  obj.subscriber.subscriptions["locket_3600_1y"] = locketgold;
  obj.subscriber.entitlements["Locket"] = gold_entitlement;
}

$done({ body: JSON.stringify(obj) });