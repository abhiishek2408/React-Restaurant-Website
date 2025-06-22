<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$paypalClientID = 'AcE5tnVEdPIABDFHbELA6SP5UmuwvrI3Cet__4pw2-HW58dd7F_FGCVR5xzazDbk9kxoPCIcKo2bN-h0';
$paypalSecret = 'EGcrBwHAjp24ZibeTMUTI1sjP4lzNy9ai7rBRKyKuGvRiHDbWGDbVuk-fglQwjdOdcEAK0tH0Xhe5M5Z';

$paypalUrl = "https://api-m.sandbox.paypal.com"; // Change to live URL when going live

function getAccessToken($clientID, $secret, $paypalUrl) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$paypalUrl/v1/oauth2/token");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_USERPWD, "$clientID:$secret");
    curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");

    $headers = ['Accept: application/json', 'Accept-Language: en_US'];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    curl_close($ch);

    return json_decode($result, true)['access_token'] ?? null;
}

$input = json_decode(file_get_contents('php://input'), true);
$totalAmount = $input['total']; 

$accessToken = getAccessToken($paypalClientID, $paypalSecret, $paypalUrl);

if (!$accessToken) {
    echo json_encode(['status' => 'error', 'message' => 'Unable to get access token']);
    exit;
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "$paypalUrl/v2/checkout/orders");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken",
    "Content-Type: application/json"
]);

$data = [
    "intent" => "CAPTURE",
    "purchase_units" => [
        [
            "amount" => [
                "currency_code" => "USD",
                "value" => $totalAmount
            ]
        ]
    ]
];

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
