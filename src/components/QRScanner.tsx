import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, X, CheckCircle, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setCameraPermission('granted');
      return true;
    } catch (err) {
      setCameraPermission('denied');
      setError('Camera permission denied. Please enable camera access in your browser settings.');
      return false;
    }
  };

  const startScanning = async () => {
    setError('');
    
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScanSuccess(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          // Ignore scanning errors (they happen continuously while scanning)
          console.debug('QR scan error:', errorMessage);
        }
      );

      setIsScanning(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to start camera';
      setError(errorMsg);
      if (onScanError) onScanError(errorMsg);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
    setIsScanning(false);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold tracking-tight flex items-center gap-2">
          <Camera className="h-5 w-5" />
          QR Code Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {cameraPermission === 'denied' && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Camera access is required to scan QR codes. Please enable camera permissions in your browser settings and refresh the page.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {!isScanning ? (
            <Button
              onClick={startScanning}
              className="w-full"
              size="lg"
              disabled={cameraPermission === 'denied'}
            >
              <Camera className="h-5 w-5 mr-2" />
              Start Camera
            </Button>
          ) : (
            <Button
              onClick={stopScanning}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <X className="h-5 w-5 mr-2" />
              Stop Camera
            </Button>
          )}

          <div
            id="qr-reader"
            className={`w-full ${isScanning ? 'block' : 'hidden'} rounded-lg overflow-hidden border-2 border-border`}
          />

          {!isScanning && (
            <div className="text-center p-8 border-2 border-dashed border-border rounded-lg bg-muted/30">
              <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click "Start Camera" to scan QR code
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Position the QR code within the camera frame
              </p>
            </div>
          )}
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            How to use:
          </h4>
          <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Click "Start Camera" button</li>
            <li>Allow camera access when prompted</li>
            <li>Point your camera at the teacher's QR code</li>
            <li>Wait for automatic detection</li>
            <li>Your attendance will be marked instantly</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
