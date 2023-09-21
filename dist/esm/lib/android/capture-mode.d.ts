import { VideoCapture } from './video-capture';
import { ImageCapture } from './image-capture';
export declare class CaptureMode {
    private videoCapture?;
    private imageCapture?;
    constructor(options: {
        videoCapture?: VideoCapture;
        imageCapture?: ImageCapture;
    });
}
