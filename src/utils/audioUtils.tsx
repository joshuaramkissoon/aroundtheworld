import { Narration } from '../types/Narration';

export async function getAudioDurationEstimate(objectAccessor: string): Promise<number> {
  const url = `https://worldadventures-assets.s3.eu-north-1.amazonaws.com/${objectAccessor}`;
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    if (!contentLength) {
      throw new Error('Content-Length header not available');
    }
    
    const fileSizeInBytes = parseInt(contentLength, 10);
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    
    // Calibrated estimation based on the reference (27MB ≈ 5 minutes)
    const estimatedDurationInSeconds = (fileSizeInMB / 27) * 5 * 60;
    
    return Math.round(estimatedDurationInSeconds);
  } catch (error) {
    console.error('Error estimating audio duration:', error);
    return 0; // Return 0 or some default value in case of error
  }
}
