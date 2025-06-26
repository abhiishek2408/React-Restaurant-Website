<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Step 1: Get the JSON input
$data = json_decode(file_get_contents("php://input"), true);
$prompt = $data["prompt"] ?? "";

if (!$prompt) {
    echo json_encode(["error" => "No prompt received"]);
    exit;
}

// Step 2: OpenAI API setup
$apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // ✅ Replace this with your key
$apiUrl = "https://api.openai.com/v1/chat/completions";

// Step 3: Prepare the payload
$postData = json_encode([
    "model" => "gpt-3.5-turbo", // ✅ Use "gpt-3.5-turbo" if you're not on GPT-4
    "messages" => [
        ["role" => "system", "content" => "You are a helpful restaurant assistant. Answer menu, offer, and timing related questions."],
        ["role" => "user", "content" => $prompt]
    ],
    "temperature" => 0.7
]);

// Step 4: Initialize cURL
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $apiKey"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

// Optional: for development only
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Step 5: Execute and capture
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Step 6: Parse and handle response
$result = json_decode($response, true);

if ($curlError) {
    echo json_encode(["error" => "Curl error: $curlError"]);
} elseif ($httpCode !== 200 || !isset($result['choices'][0]['message']['content'])) {
    echo json_encode([
        "error" => "API Error",
        "httpCode" => $httpCode,
        "details" => $result['error']['message'] ?? 'Unknown error',
        "raw" => $response
    ]);
} else {
    echo json_encode([
        "reply" => $result['choices'][0]['message']['content']
    ]);
}
