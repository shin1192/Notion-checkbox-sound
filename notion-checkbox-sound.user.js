// ==UserScript==
// @name         Notion チェックボックス効果音
// @namespace    https://github.com/shin1192/Notion-checkbox-sound
// @version      3.0
// @description  Notionのチェックボックスをクリックすると好きな効果音が鳴る
// @author       shin1192
// @match        https://www.notion.so/*
// @match        https://notion.so/*
// @match        https://*.notion.site/*
// @match        https://www.notion.com/*
// @match        https://notion.com/*
// @match        https://app.notion.com/*
// @match        https://*.notion.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // ===== 設定 =====
    // お好きなMP3をBase64に変換してここに貼り付けてください
    // 変換サイト例: https://www.base64encode.org/
    // ※著作権のある音源は私的使用の範囲でのみご利用ください
    const SOUND_BASE64 = ''; // ← ここにBase64を貼り付け
    const VOLUME = 0.8;      // 音量 (0.0 ~ 1.0)
    // ================

    let blobUrl = null;
    function initBlobUrl() {
        if (!SOUND_BASE64) {
            console.warn('⚠ SOUND_BASE64 が未設定です。README を参照してください。');
            return;
        }
        try {
            const binary = atob(SOUND_BASE64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'audio/mpeg' });
            blobUrl = URL.createObjectURL(blob);
        } catch (e) {
            console.log('❌ Blob生成エラー:', e);
        }
    }
    initBlobUrl();

    function playSound() {
        if (!blobUrl) return;
        const audio = new Audio(blobUrl);
        audio.volume = VOLUME;
        audio.play().catch(e => console.log('音声再生エラー:', e));
    }

    function isToggle(el) {
        let current = el;
        for (let i = 0; i < 5 && current; i++) {
            const cls = (current.className && typeof current.className === 'string') ? current.className : '';
            if (cls.includes('toggle') || cls.includes('Toggle')) return true;
            if (current.tagName === 'DETAILS' || current.tagName === 'SUMMARY') return true;
            const aria = current.getAttribute && current.getAttribute('aria-label');
            if (aria && (aria.includes('トグル') || aria.includes('toggle') || aria.includes('Toggle'))) return true;
            current = current.parentElement;
        }
        return false;
    }

    function isCheckbox(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        if (rect.top < 120) return false;
        if (isToggle(el)) return false;

        let current = el;
        for (let i = 0; i < 6 && current; i++) {
            const role = current.getAttribute && current.getAttribute('role');
            const cls = (current.className && typeof current.className === 'string') ? current.className : '';
            const aria = current.getAttribute && current.getAttribute('aria-label');

            if (role === 'checkbox') return true;
            if (cls.includes('checkbox') && !cls.includes('toggle')) return true;
            if (aria && (aria.includes('To-do') || aria.includes('チェック') || aria === 'Checkbox')) return true;
            if (current.tagName === 'INPUT' && current.type === 'checkbox') return true;

            current = current.parentElement;
        }
        return false;
    }

    document.addEventListener('click', function(e) {
        if (isCheckbox(e.target)) {
            playSound();
        }
    }, true);

    console.log('🎵 Notion チェックボックス効果音 起動');
})();
