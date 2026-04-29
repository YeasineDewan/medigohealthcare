<?php

namespace App\Services\Payment;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BkashService
{
    protected $baseUrl;
    protected $appKey;
    protected $appSecret;
    protected $username;
    protected $password;
    protected $isProduction;

    public function __construct()
    {
        $this->isProduction = config('services.bkash.env') === 'production';
        $this->baseUrl = $this->isProduction 
            ? 'https://checkout.pay.bka.sh' 
            : 'https://checkout.sandbox.bka.sh';
        
        $this->appKey = config('services.bkash.app_key');
        $this->appSecret = config('services.bkash.app_secret');
        $this->username = config('services.bkash.username');
        $this->password = config('services.bkash.password');
    }

    /**
     * Grant token for bKash API
     */
    public function grantToken()
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])->post($this->baseUrl . '/v1.2.0-beta/tokenized/checkout/token/grant', [
                'app_key' => $this->appKey,
                'app_secret' => $this->appSecret,
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('bKash token grant failed', [
                'response' => $response->body(),
                'status' => $response->status()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('bKash token grant exception', ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Create checkout payment
     */
    public function createPayment($token, $amount, $orderId, $callbackUrl, $payerReference = '')
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'Authorization' => $token,
            ])->post($this->baseUrl . '/v1.2.0-beta/tokenized/checkout/create', [
                'mode' => '0011',
                'currency' => 'BDT',
                'intent' => 'sale',
                'amount' => $amount,
                'merchantInvoiceNumber' => $orderId,
                'callbackURL' => $callbackUrl,
                'payerReference' => $payerReference ?: 'medigo_' . time(),
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('bKash create payment failed', [
                'response' => $response->body(),
                'status' => $response->status(),
                'order_id' => $orderId
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('bKash create payment exception', [
                'error' => $e->getMessage(),
                'order_id' => $orderId
            ]);
            return null;
        }
    }

    /**
     * Execute payment
     */
    public function executePayment($token, $paymentId)
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'Authorization' => $token,
            ])->post($this->baseUrl . '/v1.2.0-beta/tokenized/checkout/execute', [
                'paymentID' => $paymentId,
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('bKash execute payment failed', [
                'response' => $response->body(),
                'status' => $response->status(),
                'payment_id' => $paymentId
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('bKash execute payment exception', [
                'error' => $e->getMessage(),
                'payment_id' => $paymentId
            ]);
            return null;
        }
    }

    /**
     * Query payment status
     */
    public function queryPayment($token, $paymentId)
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'Authorization' => $token,
            ])->post($this->baseUrl . '/v1.2.0-beta/tokenized/checkout/query', [
                'paymentID' => $paymentId,
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('bKash query payment failed', [
                'response' => $response->body(),
                'status' => $response->status(),
                'payment_id' => $paymentId
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('bKash query payment exception', [
                'error' => $e->getMessage(),
                'payment_id' => $paymentId
            ]);
            return null;
        }
    }

    /**
     * Refund payment
     */
    public function refundPayment($token, $paymentId, $amount, $reason = '')
    {
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'Authorization' => $token,
            ])->post($this->baseUrl . '/v1.2.0-beta/tokenized/checkout/refund', [
                'paymentID' => $paymentId,
                'amount' => $amount,
                'trxID' => $paymentId,
                'reason' => $reason ?: 'Customer requested refund',
                'sku' => 'refund_' . time(),
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('bKash refund payment failed', [
                'response' => $response->body(),
                'status' => $response->status(),
                'payment_id' => $paymentId,
                'amount' => $amount
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('bKash refund payment exception', [
                'error' => $e->getMessage(),
                'payment_id' => $paymentId,
                'amount' => $amount
            ]);
            return null;
        }
    }

    /**
     * Complete checkout process
     */
    public function completeCheckout($amount, $orderId, $callbackUrl, $payerReference = '')
    {
        // Step 1: Get token
        $tokenResponse = $this->grantToken();
        if (!$tokenResponse || !isset($tokenResponse['id_token'])) {
            return ['success' => false, 'message' => 'Failed to get authentication token'];
        }

        $token = $tokenResponse['id_token'];

        // Step 2: Create payment
        $paymentResponse = $this->createPayment($token, $amount, $orderId, $callbackUrl, $payerReference);
        if (!$paymentResponse || !isset($paymentResponse['bkashURL'])) {
            return ['success' => false, 'message' => 'Failed to create payment'];
        }

        return [
            'success' => true,
            'bkash_url' => $paymentResponse['bkashURL'],
            'payment_id' => $paymentResponse['paymentID'],
            'token' => $token
        ];
    }

    /**
     * Verify payment after callback
     */
    public function verifyPayment($token, $paymentId)
    {
        $paymentResponse = $this->queryPayment($token, $paymentId);
        
        if (!$paymentResponse) {
            return ['success' => false, 'message' => 'Failed to query payment'];
        }

        // Check if payment is successful
        if ($paymentResponse['transactionStatus'] === 'Completed') {
            return [
                'success' => true,
                'transaction_id' => $paymentResponse['trxID'] ?? null,
                'amount' => $paymentResponse['amount'] ?? 0,
                'currency' => $paymentResponse['currency'] ?? 'BDT',
                'payment_time' => $paymentResponse['paymentExecuteTime'] ?? null,
                'merchant_invoice' => $paymentResponse['merchantInvoiceNumber'] ?? null,
            ];
        }

        return [
            'success' => false,
            'message' => 'Payment not completed',
            'status' => $paymentResponse['transactionStatus'] ?? 'Unknown'
        ];
    }

    /**
     * Process refund
     */
    public function processRefund($paymentId, $amount, $reason = '')
    {
        // Step 1: Get token
        $tokenResponse = $this->grantToken();
        if (!$tokenResponse || !isset($tokenResponse['id_token'])) {
            return ['success' => false, 'message' => 'Failed to get authentication token'];
        }

        $token = $tokenResponse['id_token'];

        // Step 2: Process refund
        $refundResponse = $this->refundPayment($token, $paymentId, $amount, $reason);
        
        if (!$refundResponse) {
            return ['success' => false, 'message' => 'Failed to process refund'];
        }

        return [
            'success' => true,
            'refund_id' => $refundResponse['refundID'] ?? null,
            'transaction_id' => $refundResponse['trxID'] ?? null,
            'amount' => $refundResponse['amount'] ?? 0,
            'currency' => $refundResponse['currency'] ?? 'BDT',
            'status' => $refundResponse['refundStatus'] ?? 'Unknown'
        ];
    }

    /**
     * Get payment status
     */
    public function getPaymentStatus($paymentId)
    {
        // Step 1: Get token
        $tokenResponse = $this->grantToken();
        if (!$tokenResponse || !isset($tokenResponse['id_token'])) {
            return ['success' => false, 'message' => 'Failed to get authentication token'];
        }

        $token = $tokenResponse['id_token'];

        // Step 2: Query payment
        $paymentResponse = $this->queryPayment($token, $paymentId);
        
        if (!$paymentResponse) {
            return ['success' => false, 'message' => 'Failed to query payment'];
        }

        return [
            'success' => true,
            'status' => $paymentResponse['transactionStatus'] ?? 'Unknown',
            'amount' => $paymentResponse['amount'] ?? 0,
            'currency' => $paymentResponse['currency'] ?? 'BDT',
            'transaction_id' => $paymentResponse['trxID'] ?? null,
            'payment_time' => $paymentResponse['paymentExecuteTime'] ?? null,
            'merchant_invoice' => $paymentResponse['merchantInvoiceNumber'] ?? null,
        ];
    }
}

