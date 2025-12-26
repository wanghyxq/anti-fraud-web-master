// 工具函数：Base64解码和手机号脱敏
class MobileUtils {
    
    // Base64解码
    static decodeBase64(encodedStr) {
        try {
            // 浏览器环境
            if (typeof atob === 'function') {
                return decodeURIComponent(escape(atob(encodedStr)));
            }
            // Node.js环境
            else if (typeof Buffer === 'function') {
                return Buffer.from(encodedStr, 'base64').toString('utf8');
            }
            // 备用方案
            else {
                return this.fallbackBase64Decode(encodedStr);
            }
        } catch (error) {
            console.error('Base64解码失败:', error);
            return encodedStr; // 解码失败返回原字符串
        }
    }
    
    // 备用Base64解码方案
    static fallbackBase64Decode(encodedStr) {
        const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
        let i = 0;
        
        encodedStr = encodedStr.replace(/[^A-Za-z0-9+/=]/g, '');
        
        while (i < encodedStr.length) {
            const enc1 = base64Chars.indexOf(encodedStr.charAt(i++));
            const enc2 = base64Chars.indexOf(encodedStr.charAt(i++));
            const enc3 = base64Chars.indexOf(encodedStr.charAt(i++));
            const enc4 = base64Chars.indexOf(encodedStr.charAt(i++));
            
            const chr1 = (enc1 << 2) | (enc2 >> 4);
            const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            const chr3 = ((enc3 & 3) << 6) | enc4;
            
            output += String.fromCharCode(chr1);
            if (enc3 !== 64) output += String.fromCharCode(chr2);
            if (enc4 !== 64) output += String.fromCharCode(chr3);
        }
        
        return output;
    }
    
    // 手机号脱敏（中间4位用*代替）
    static desensitizeMobile(mobile) {
        if (!mobile || mobile.length !== 11) {
            return mobile;
        }
        return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
    
    // 完整处理：解码 + 脱敏
    static processEncodedMobile(encodedMobile) {
        const decodedMobile = this.decodeBase64(encodedMobile);
        return this.desensitizeMobile(decodedMobile);
    }
    
    // 仅解码，不脱敏
    static decodeMobileOnly(encodedMobile) {
        return this.decodeBase64(encodedMobile);
    }
}

export default MobileUtils;