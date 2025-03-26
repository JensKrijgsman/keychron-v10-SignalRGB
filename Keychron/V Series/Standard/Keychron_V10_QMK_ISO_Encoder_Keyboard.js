export function Name() { return "V10 ISO Knob"; }
export function Version() { return "1.0.0"; }
export function VendorId() { return 0x3434; }
export function ProductId() { return 0x03A3; }
export function Publisher() { return "WhirlwindFX"; }
export function Documentation() { return "qmk/srgbmods-qmk-firmware"; }
export function DeviceType() { return "keyboard"; }
export function Size() { return [18, 6]; }
export function DefaultPosition() { return [10, 100]; }
export function DefaultScale() { return 1.0; }
/* global
shutdownMode:readonly
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters() {
    return [
        { "property": "shutdownMode", "group": "lighting", "label": "Shutdown Mode", "type": "combobox", "values": ["SignalRGB", "Hardware"], "default": "SignalRGB" },
        { "property": "shutdownColor", "group": "lighting", "label": "Shutdown Color", "min": "0", "max": "360", "type": "color", "default": "000000" },
        { "property": "LightingMode", "group": "lighting", "label": "Lighting Mode", "type": "combobox", "values": ["Canvas", "Forced"], "default": "Canvas" },
        { "property": "forcedColor", "group": "lighting", "label": "Forced Color", "min": "0", "max": "360", "type": "color", "default": "009bde" },
    ];
}

// Plugin Version: Built for Protocol V1.0.6

// Updated arrays for 75% Alice layout
//
// 1) Numeric IDs for each key
//
const vKeys = [
    // 0–14   (Row 0)
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    // 15–29  (Row 1)
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    // 30–44  (Row 2)
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
    // 45–58  (Row 3)
    45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    // 59–71  (Row 4)
    59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
    // 72–81  (Row 5)
    72, 73, 74, 75, 76, 77, 78, 79, 80, 81
  ];
  
  //
  // 2) Human-readable names for each key (same order as vKeys above)
  //    Adjust these to match your actual legends/layout.
  //
  const vKeyNames = [
    // Row 0 (indices 0..14)
    "Encoder Knob",  // 0
    "Esc",           // 1 (red key, top-left)
    "F1",            // 2
    "F2",            // 3
    "F3",            // 4
    "F4",            // 5
    "F5",            // 6
    "F6",            // 7
    "F7",            // 8
    "F8",            // 9
    "F9",            // 10
    "F10",           // 11
    "F11",           // 12
    "F12",           // 13
    "Backspace",     // 14 (red key, top-right)
  
    // Row 1 (indices 15..29)
    "`",  "1",  "2",  "3",  "4",  "5",
    "6",  "7",  "8",  "9",  "0",  "-", 
    "+",  "Delete", "Page Up",
  
    // Row 2 (indices 30..44)
    "Tab", "Q", "W", "E", "R", "T", 
    "Y",   "U", "I", "O", "P", "[", 
    "]",   "\\", "Page Down",
  
    // Row 3 (indices 45..58)
    "CapsLock", "A", "S", "D", "F", "G", 
    "H",        "J", "K", "L", ";", "'",
    "Enter",    "Home",
  
    // Row 4 (indices 59..71)
    "Left Shift", "Z", "X", "C", "V", "B",
    "N",          "M", "<", ">", "/", 
    "Right Shift", "Up Arrow",
  
    // Row 5 (indices 72..81)
    "Left Ctrl", "Left Win", "Left Alt", "Space",
    "Right Alt", "Fn",       "Right Win",
    "Left Arrow", "Down Arrow", "Right Arrow"
  ];
  
  //
  // 3) Logical (x,y) positions for each key
  //    This re-uses the same row/column ‘shape’ as your first code,
  //    including the same skipped columns. Each row is y = 0..5.
  //    Note how Row 3 skips [13,3], Row 4 skips [1,4] & [14,4], etc.
  //
  const vKeyPositions = [
    // Row 0: indices 0..14 => columns [0..14, row=0]
    [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0],
    [10,0], [11,0], [12,0], [13,0], [14,0],
  
    // Row 1: indices 15..29 => columns [0..14, row=1]
    [0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1], [8,1], [9,1],
    [10,1], [11,1], [12,1], [13,1], [14,1],
  
    // Row 2: indices 30..44 => columns [0..14, row=2]
    [0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2], [9,2],
    [10,2], [11,2], [12,2], [13,2], [14,2],
  
    // Row 3: indices 45..58 => 14 keys
    // (skip [13,3], so we go 0..12 and then 14)
    [0,3], [1,3], [2,3], [3,3], [4,3], [5,3],
    [6,3], [7,3], [8,3], [9,3], [10,3], [11,3],
    [12,3],              // skip [13,3]
    [14,3],
  
    // Row 4: indices 59..71 => 13 keys
    // (skip [1,4] and [14,4], so we place keys at 0,2..13)
    [0,4],              // skip [1,4]
    [2,4], [3,4], [4,4], [5,4], [6,4],
    [7,4], [8,4], [9,4], [10,4], [11,4], [12,4], [13,4],
  
    // Row 5: indices 72..81 => 10 keys
    // (skip [3,5], [4,5], [5,5], [7,5], [8,5])
    [0,5], [1,5], [2,5],           // skip [3,5], [4,5], [5,5]
    [6,5],                         // skip [7,5], [8,5]
    [9,5], [10,5], [11,5], [12,5], [13,5], [14,5]
  ];

let LEDCount = 0;
let IsViaKeyboard = false;
const MainlineQMKFirmware = 1;
const VIAFirmware = 2;
const PluginProtocolVersion = "1.0.6";

export function LedNames() {
    return vKeyNames;
}

export function LedPositions() {
    return vKeyPositions;
}

export function vKeysArrayCount() {
    device.log('vKeys ' + vKeys.length);
    device.log('vKeyNames ' + vKeyNames.length);
    device.log('vKeyPositions ' + vKeyPositions.length);
}

export function Initialize() {
    requestFirmwareType();
    requestQMKVersion();
    requestSignalRGBProtocolVersion();
    requestUniqueIdentifier();
    requestTotalLeds();
    effectEnable();
}

export function Render() {
    sendColors();
}

export function Shutdown(SystemSuspending) {
    if (SystemSuspending) {
        sendColors("#000000"); // Go Dark on System Sleep/Shutdown
    } else {
        if (shutdownMode === "SignalRGB") {
            sendColors(shutdownColor);
        } else {
            effectDisable();
        }
    }
}

function commandHandler() {
    const readCounts = [];
    do {
        const returnpacket = device.read([0x00], 32, 10);
        processCommands(returnpacket);
        readCounts.push(device.getLastReadSize());
        if (IsViaKeyboard) {
            device.read([0x00], 32, 10);
        }
    } while (device.getLastReadSize() > 0);
}

function processCommands(data) {
    switch (data[1]) {
        case 0x21:
            returnQMKVersion(data);
            break;
        case 0x22:
            returnSignalRGBProtocolVersion(data);
            break;
        case 0x23:
            returnUniqueIdentifier(data);
            break;
        case 0x24:
            sendColors();
            break;
        case 0x27:
            returnTotalLeds(data);
            break;
        case 0x28:
            returnFirmwareType(data);
            break;
    }
}

function requestQMKVersion() {
    device.write([0x00, 0x21], 32);
    device.pause(30);
    commandHandler();
}

function returnQMKVersion(data) {
    const QMKVersionByte1 = data[2];
    const QMKVersionByte2 = data[3];
    const QMKVersionByte3 = data[4];
    device.log("QMK Version: " + QMKVersionByte1 + "." + QMKVersionByte2 + "." + QMKVersionByte3);
    device.log("QMK SRGB Plugin Version: " + Version());
    device.pause(30);
}

function requestSignalRGBProtocolVersion() {
    device.write([0x00, 0x22], 32);
    device.pause(30);
    commandHandler();
}

function returnSignalRGBProtocolVersion(data) {
    const ProtocolVersionByte1 = data[2];
    const ProtocolVersionByte2 = data[3];
    const ProtocolVersionByte3 = data[4];
    const SignalRGBProtocolVersion = ProtocolVersionByte1 + "." + ProtocolVersionByte2 + "." + ProtocolVersionByte3;
    device.log(`SignalRGB Protocol Version: ${SignalRGBProtocolVersion}`);
    if (PluginProtocolVersion !== SignalRGBProtocolVersion) {
        device.notify("Unsupported Protocol Version", `This plugin is intended for SignalRGB Protocol version ${PluginProtocolVersion}. This device is version: ${SignalRGBProtocolVersion}`, 2, "Documentation");
    }
    device.pause(30);
}

function requestUniqueIdentifier() {
    if (device.write([0x00, 0x23], 32) === -1) {
        device.notify("Unsupported Firmware", "This device is not running SignalRGB-compatible firmware. Click the Documentation button to learn more.", 3, "Documentation");
    }
    device.pause(30);
    commandHandler();
}

function returnUniqueIdentifier(data) {
    const UniqueIdentifierByte1 = data[2];
    const UniqueIdentifierByte2 = data[3];
    const UniqueIdentifierByte3 = data[4];
    if (!(UniqueIdentifierByte1 === 0 && UniqueIdentifierByte2 === 0 && UniqueIdentifierByte3 === 0)) {
        device.log("Unique Device Identifier: " + UniqueIdentifierByte1 + UniqueIdentifierByte2 + UniqueIdentifierByte3);
    }
    device.pause(30);
}

function requestTotalLeds() {
    device.write([0x00, 0x27], 32);
    device.pause(30);
    commandHandler();
}

function returnTotalLeds(data) {
    LEDCount = data[2];
    device.log("Device Total LED Count: " + LEDCount);
    device.pause(30);
}

function requestFirmwareType() {
    device.write([0x00, 0x28], 32);
    device.pause(30);
    commandHandler();
}

function returnFirmwareType(data) {
    const FirmwareTypeByte = data[2];
    if (!(FirmwareTypeByte === MainlineQMKFirmware || FirmwareTypeByte === VIAFirmware)) {
        device.notify("Unsupported Firmware", "Click the Documentation button to learn more.", 3, "Documentation");
    }
    if (FirmwareTypeByte === MainlineQMKFirmware) {
        IsViaKeyboard = false;
        device.log("Firmware Type: Mainline");
    }
    if (FirmwareTypeByte === VIAFirmware) {
        IsViaKeyboard = true;
        device.log("Firmware Type: VIA");
    }
    device.pause(30);
}

function effectEnable() {
    device.write([0x00, 0x25], 32);
    device.pause(30);
}

function effectDisable() {
    device.write([0x00, 0x26], 32);
    device.pause(30);
}

function createSolidColorArray(color) {
    const rgbdata = new Array(vKeys.length * 3).fill(0);
    for (let iIdx = 0; iIdx < vKeys.length; iIdx++) {
        const iLedIdx = vKeys[iIdx] * 3;
        rgbdata[iLedIdx] = color[0];
        rgbdata[iLedIdx + 1] = color[1];
        rgbdata[iLedIdx + 2] = color[2];
    }
    return rgbdata;
}

function grabColors(overrideColor) {
    if (overrideColor) {
        return createSolidColorArray(hexToRgb(overrideColor));
    } else if (LightingMode === "Forced") {
        return createSolidColorArray(hexToRgb(forcedColor));
    }
    const rgbdata = new Array(vKeys.length * 3).fill(0);
    for (let iIdx = 0; iIdx < vKeys.length; iIdx++) {
        const iPxX = vKeyPositions[iIdx][0];
        const iPxY = vKeyPositions[iIdx][1];
        let color = device.color(iPxX, iPxY);
        const iLedIdx = vKeys[iIdx] * 3;
        rgbdata[iLedIdx] = color[0];
        rgbdata[iLedIdx + 1] = color[1];
        rgbdata[iLedIdx + 2] = color[2];
    }
    return rgbdata;
}

function sendColors(overrideColor) {
    const rgbdata = grabColors(overrideColor);
    const LedsPerPacket = 9;
    let BytesSent = 0;
    let BytesLeft = rgbdata.length;
    while (BytesLeft > 0) {
        const BytesToSend = Math.min(LedsPerPacket * 3, BytesLeft);
        StreamLightingData(Math.floor(BytesSent / 3), rgbdata.splice(0, BytesToSend));
        BytesLeft -= BytesToSend;
        BytesSent += BytesToSend;
    }
}

function StreamLightingData(StartLedIdx, RGBData) {
    const packet = [0x00, 0x24, StartLedIdx, Math.floor(RGBData.length / 3)].concat(RGBData);
    device.write(packet, 33);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const colors = [];
    colors[0] = parseInt(result[1], 16);
    colors[1] = parseInt(result[2], 16);
    colors[2] = parseInt(result[3], 16);
    return colors;
}

export function Validate(endpoint) {
    return endpoint.interface === 1;
}