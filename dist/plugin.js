var PassiveFaceLivenessPlugin = (function (exports, core) {
    'use strict';

    class PassiveFaceLivenessResult {
        constructor(result) {
            this.result = result;
        }
    }

    class PassiveFaceLivenessSuccess extends PassiveFaceLivenessResult {
        constructor(imagePath, imageUrl, signedResponse, trackingId, capturePath, lensFacing) {
            super("SUCCESS");
            this.imagePath = imagePath;
            this.imageUrl = imageUrl;
            this.signedResponse = signedResponse;
            this.trackingId = trackingId;
            this.capturePath = capturePath;
            this.lensFacing = lensFacing;
        }
    }
    PassiveFaceLivenessSuccess.LENS_FACING_FRONT = 0;
    PassiveFaceLivenessSuccess.LENS_FACING_BACK = 1;

    class PassiveFaceLivenessFailure extends PassiveFaceLivenessResult {
        constructor(message, type) {
            super("FAILURE");
            this.message = message;
            this.type = type;
        }
    }

    class PassiveFaceLivenessClosed extends PassiveFaceLivenessResult {
        constructor() {
            super("CLOSED");
        }
    }

    class ShowPreview {
        constructor(show, title, subTitle, confirmLabel, retryLabel) {
            this.title = title;
            this.subTitle = subTitle;
            this.confirmLabel = confirmLabel;
            this.retryLabel = retryLabel;
            this.show = show;
        }
    }

    class AndroidSettings {
        constructor(options) {
            this.customization = options === null || options === void 0 ? void 0 : options.customization;
            this.sensorSettings = options === null || options === void 0 ? void 0 : options.sensorSettings;
            this.showButtonTime = options === null || options === void 0 ? void 0 : options.showButtonTime;
            this.enableSwitchCameraButton = options === null || options === void 0 ? void 0 : options.enableSwitchCameraButton;
            this.enableGoogleServices = options === null || options === void 0 ? void 0 : options.enableGoogleServices;
            this.useEmulator = options === null || options === void 0 ? void 0 : options.useEmulator;
            this.useRoot = options === null || options === void 0 ? void 0 : options.useRoot;
            this.enableBrightnessIncrease = options === null || options === void 0 ? void 0 : options.enableBrightnessIncrease;
            this.useDeveloperMode = options === null || options === void 0 ? void 0 : options.useDeveloperMode;
            this.useAdb = options === null || options === void 0 ? void 0 : options.useAdb;
            this.useDebug = options === null || options === void 0 ? void 0 : options.useDebug;
        }
    }

    class VideoCapture {
        constructor(options) {
            this.use = options.use;
            this.time = options.time;
        }
    }

    class ImageCapture {
        constructor(options) {
            this.use = options.use;
            this.beforePictureMillis = options.beforePictureMillis;
            this.afterPictureMillis = options.afterPictureMillis;
        }
    }

    class CaptureMode {
        constructor(options) {
            this.videoCapture = options.videoCapture;
            this.imageCapture = options.imageCapture;
        }
    }

    class SensorSettingsAndroid {
        constructor(sensorStabilitySettings, sensorOrientationSettings) {
            this.sensorStabilitySettings = sensorStabilitySettings;
            this.sensorOrientationSettings = sensorOrientationSettings;
        }
    }

    class PassiveFaceLivenessCustomizationAndroid {
        constructor(maskType, styleResIdName, layoutResIdName, greenMaskResIdName, redMaskResIdName, whiteMaskResIdName) {
            this.styleResIdName = styleResIdName;
            this.layoutResIdName = layoutResIdName;
            this.greenMaskResIdName = greenMaskResIdName;
            this.redMaskResIdName = redMaskResIdName;
            this.whiteMaskResIdName = whiteMaskResIdName;
            this.maskType = maskType;
        }
    }

    class IosSettings {
        constructor(options) {
            this.customization = options === null || options === void 0 ? void 0 : options.customization;
            this.beforePictureMillis = options === null || options === void 0 ? void 0 : options.beforePictureMillis;
            this.sensorStability = options === null || options === void 0 ? void 0 : options.sensorStability;
            this.enableManualCapture = options === null || options === void 0 ? void 0 : options.enableManualCapture;
            this.timeEnableManualCapture = options === null || options === void 0 ? void 0 : options.timeEnableManualCapture;
            this.resolution = options === null || options === void 0 ? void 0 : options.resolution;
            this.compressQuality = options === null || options === void 0 ? void 0 : options.compressQuality;
        }
    }

    class IosResolution {
    }
    IosResolution.LOW = "LOW";
    IosResolution.MEDIUM = "MEDIUM";
    IosResolution.HIGH = "HIGH";
    IosResolution.PHOTO = "PHOTO";
    IosResolution.INPUT_PRIORITY = "INPUT_PRIORITY";
    IosResolution.HD1280x720 = "hd1280x720";
    IosResolution.HD1920x1080 = "hd1920x1080";
    IosResolution.hd4K3840x2160 = "hd4K3840x2160";
    IosResolution.iFrame960x540 = "iFrame960x540";
    IosResolution.iFrame1280x720 = "iFrame1280x720";
    IosResolution.VGA640x480 = "VGA640x480";
    IosResolution.CIF352x288 = "CIF352x288";

    class PassiveFaceLivenessCustomizationIos {
        constructor(options) {
            this.colorHex = options === null || options === void 0 ? void 0 : options.colorHex;
            this.greenMaskImageName = options === null || options === void 0 ? void 0 : options.greenMaskImageName;
            this.whiteMaskImageName = options === null || options === void 0 ? void 0 : options.whiteMaskImageNam;
            this.redMaskImageName = options === null || options === void 0 ? void 0 : options.redMaskImageName;
            this.closeImageName = options === null || options === void 0 ? void 0 : options.closeImageName;
            this.showStepLabel = options === null || options === void 0 ? void 0 : options.showStepLabel;
            this.showStatusLabel = options === null || options === void 0 ? void 0 : options.showStatusLabel;
            this.buttonSize = options === null || options === void 0 ? void 0 : options.buttonSize;
            this.buttonContentMode = options === null || options === void 0 ? void 0 : options.buttonContentMode;
        }
    }

    class SensorStabilitySettingsIos {
        constructor(options) {
            this.message = options === null || options === void 0 ? void 0 : options.message;
            this.stabilityThreshold = options === null || options === void 0 ? void 0 : options.stabilityThreshold;
        }
    }

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const { PassiveFaceLivenessPlugin } = core.Plugins;
    class PassiveFaceLiveness {
        constructor() { }
        set setMobileToken(mobileToken) {
            this.mobileToken = mobileToken;
        }
        set setPeopleId(peopleId) {
            this.peopleId = peopleId;
        }
        set setPersonName(personName) {
            this.personName = personName;
        }
        set setPersonCpf(personCpf) {
            this.personCpf = personCpf;
        }
        set setUseAnalytics(useAnalytics) {
            this.useAnalytics = useAnalytics;
        }
        setAudioSettings(enable, soundResId) {
            this.enableSound = enable;
            this.sound = soundResId;
        }
        set setRequestTimeout(requestTimeout) {
            this.requestTimeout = requestTimeout;
        }
        set setShowDelay(showDelay) {
            this.showDelay = showDelay;
        }
        set setDelay(delay) {
            this.delay = delay;
        }
        setCurrentStepDoneDelay(showDelay, delay) {
            this.showDelay = showDelay;
            this.delay = delay;
        }
        set setShowPreview(showPreview) {
            this.showPreview = showPreview;
        }
        set setAndroidSettings(androidSettings) {
            this.androidSettings = androidSettings;
        }
        setIosSettings(iosSettings) {
            this.iosSettings = iosSettings;
        }
        set setCaptureMode(captureMode) {
            this.captureMode = captureMode;
        }
        set setGetImageUrlExpireTime(expireTime) {
            this.expireTime = expireTime;
        }
        setEyesClosedSettings(enable, threshold) {
            this.useOpenEyeValidation = enable;
            this.openEyesThreshold = threshold;
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                var param = JSON.stringify(this);
                const result = (yield PassiveFaceLivenessPlugin.start({ builder: param })).results;
                if (result.success == null) {
                    return new PassiveFaceLivenessClosed();
                }
                else if (result.success) {
                    return new PassiveFaceLivenessSuccess(result.imagePath, result.imageUrl, result.signedResponse, result.trackingId, result.capturePath, result.lensFacing);
                }
                else {
                    return new PassiveFaceLivenessFailure(result.message, result.type);
                }
            });
        }
    }

    exports.AndroidSettings = AndroidSettings;
    exports.CaptureMode = CaptureMode;
    exports.ImageCapture = ImageCapture;
    exports.IosResolution = IosResolution;
    exports.IosSettings = IosSettings;
    exports.PassiveFaceLiveness = PassiveFaceLiveness;
    exports.PassiveFaceLivenessCustomizationAndroid = PassiveFaceLivenessCustomizationAndroid;
    exports.PassiveFaceLivenessCustomizationIos = PassiveFaceLivenessCustomizationIos;
    exports.SensorSettingsAndroid = SensorSettingsAndroid;
    exports.SensorStabilitySettingsIos = SensorStabilitySettingsIos;
    exports.ShowPreview = ShowPreview;
    exports.VideoCapture = VideoCapture;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
