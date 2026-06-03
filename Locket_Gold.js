try {
  var obj = JSON.parse($response.body);
} catch (e) {
  $done({});
}

var now = new Date().toISOString();
var specificDate = now; // dùng thời điểm hiện tại để tránh lỗi "future purchase"
var expiresDate = "2099-12-31T00:00:00Z";

obj.subscriber = obj.subscriber || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
obj.subscriber.non_subscriptions = obj.subscriber.non_subscriptions || {};

// Subscription object cho gói yearly
var locketGoldSub = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: expiresDate,
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  store: "app_store",
  product_plan_identifier: null
};

// Subscription object cho gói monthly (fallback)
var locketGoldMonthly = Object.assign({}, locketGoldSub);

// Entitlement object
var goldEntitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: "com.locket.premium.yearly",
  expires_date: expiresDate,
  store: "app_store"
};

// Inject cả yearly lẫn monthly để app không bị lỗi version mới
obj.subscriber.subscriptions["com.locket.premium.yearly"] = locketGoldSub;
obj.subscriber.subscriptions["com.locket.premium.monthly"] = locketGoldMonthly;

// Entitlement key "Gold" là key Locket dùng để check trong app
obj.subscriber.entitlements["Gold"] = goldEntitlement;

// Một số bản Locket mới check thêm key "gold" (chữ thường)
obj.subscriber.entitlements["gold"] = Object.assign({}, goldEntitlement);

$done({ body: JSON.stringify(obj) });
