/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  ShieldCheck,
  Clock,
  Sparkles,
  Users,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
  Zap,
  Lock,
  ExternalLink,
  Smartphone,
  Globe
} from 'lucide-react';

const TELEGRAM_WEB_URL = 'https://t.me/+plLcXhn1Z3diY2Q1';
const TELEGRAM_APP_URL = 'tg://join?invite=plLcXhn1Z3diY2Q1';
const INITIAL_TIMER_SECONDS = 10;
const PROFILE_IMAGE_SRC = '/src/assets/images/ritik_sir_photo_1792067051118.jpg';
const BACKUP_IMAGE_SRC = '/ritik_sir.jpg';

export default function App() {
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIMER_SECONDS);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [redirectTriggered, setRedirectTriggered] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(PROFILE_IMAGE_SRC);
  const [onlineMembers] = useState<number>(() => 48720 + Math.floor(Math.random() * 450));

  const hasFiredAutoRedirect = useRef(false);

  // Safe redirect function that works inside iframes and standard browsers
  const performRedirect = () => {
    setRedirectTriggered(true);

    // 1. Try opening via a dynamic anchor with target="_blank"
    try {
      const link = document.createElement('a');
      link.href = TELEGRAM_WEB_URL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.warn('Anchor navigation failed:', e);
    }

    // 2. If running standalone (outside iframe), try window.location
    try {
      const isOutsideIframe = window.self === window.top;
      if (isOutsideIframe) {
        window.location.href = TELEGRAM_WEB_URL;
      }
    } catch {
      // In cross-origin iframe window.top access might throw; target="_blank" handles it
    }
  };

  // Timer countdown loop
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!hasFiredAutoRedirect.current) {
            hasFiredAutoRedirect.current = true;
            performRedirect();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeLeft]);

  // Copy Link function
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(TELEGRAM_WEB_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = TELEGRAM_WEB_URL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Reset timer
  const handleResetTimer = () => {
    hasFiredAutoRedirect.current = false;
    setRedirectTriggered(false);
    setTimeLeft(INITIAL_TIMER_SECONDS);
    setIsPaused(false);
  };

  // SVG Progress Circle calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = (timeLeft / INITIAL_TIMER_SECONDS) * 100;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <main className="min-h-screen bg-[#070709] text-gray-100 flex flex-col justify-between items-center relative overflow-hidden px-4 py-8 select-none">
      {/* Luxury Background Glow Effects */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-b from-amber-600/15 via-yellow-500/10 to-transparent blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-t from-amber-500/10 via-yellow-600/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Decorative Subtle Starfield / Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#ffd700 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Notification Banner */}
      <header className="w-full max-w-md mx-auto z-10 mb-4">
        <div className="flex items-center justify-between bg-[#121216]/90 border border-amber-500/20 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg shadow-black/40">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Official Channel</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-300/80 font-medium bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>{onlineMembers.toLocaleString()}+ Members</span>
          </div>
        </div>
      </header>

      {/* Central Glass Card */}
      <div className="w-full max-w-md mx-auto z-10 flex-1 flex flex-col justify-center my-auto">
        <div className="relative glass-dark gold-border-glow rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 text-center transition-all duration-300">
          
          {/* VIP Badge top pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>VIP Community Access</span>
          </div>

          {/* Ritik sir Portrait Image (Compulsory) */}
          <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 mb-5 group">
            {/* Glowing gold backlight aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-500" />
            
            {/* Gold border ring */}
            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-700 shadow-2xl overflow-hidden">
              <img
                src={imgSrc}
                alt="Ritik sir"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (imgSrc !== BACKUP_IMAGE_SRC) {
                    setImgSrc(BACKUP_IMAGE_SRC);
                  }
                }}
                className="w-full h-full object-cover rounded-full select-none"
              />
            </div>

            {/* Verified Shield Badge on Profile */}
            <div 
              className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-amber-500 to-yellow-300 text-black p-1.5 rounded-full shadow-lg border-2 border-[#121216]"
              title="Verified Official"
            >
              <ShieldCheck className="w-5 h-5 fill-current" />
            </div>
          </div>

          {/* Profile Name & Title */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight gold-gradient-text drop-shadow-md">
                Ritik sir
              </h1>
              <CheckCircle2 className="w-6 h-6 text-amber-400 fill-amber-400/20" />
            </div>
            <p className="text-sm text-gray-400 mt-1 font-medium">
              Official Telegram Channel • Premium Community
            </p>
          </div>

          {/* 10-Second Countdown Section */}
          <div className="bg-[#0b0b0e] border border-amber-500/25 rounded-2xl p-4 sm:p-5 mb-6 relative overflow-hidden">
            {/* Ambient gold streak */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            <div className="flex items-center justify-between gap-4">
              {/* Circular SVG Timer */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  {/* Animated Gold Ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="url(#goldGradient)"
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-linear"
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Number inside circle */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-amber-400 tracking-tight font-mono">
                    {String(timeLeft).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest -mt-1">
                    SEC
                  </span>
                </div>
              </div>

              {/* Status Text & Controls */}
              <div className="flex-1 text-left pl-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {timeLeft > 0 ? 'Auto-Redirecting to Telegram' : 'Redirecting to Telegram...'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {timeLeft > 0 ? (
                    <>
                      You will be transferred in <strong className="text-amber-300 font-bold">{timeLeft}s</strong>.
                    </>
                  ) : (
                    <span className="text-emerald-400 font-semibold animate-pulse">
                      Redirect triggered! If not opened, click below:
                    </span>
                  )}
                </p>

                {/* Pause / Resume & Reset controls */}
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#1a1a22] text-gray-300 hover:text-amber-300 border border-gray-800 hover:border-amber-500/30 transition-colors cursor-pointer"
                    title={isPaused ? 'Resume countdown' : 'Pause countdown'}
                  >
                    {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
                    <span>{isPaused ? 'Resume' : 'Pause'}</span>
                  </button>

                  <button
                    onClick={handleResetTimer}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#1a1a22] text-gray-300 hover:text-amber-300 border border-gray-800 hover:border-amber-500/30 transition-colors cursor-pointer"
                    title="Reset to 10 seconds"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full bg-gray-900 rounded-full h-1.5 mt-4 overflow-hidden border border-gray-800/80">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Primary Gold CTA Button: 'Join Now' */}
          <div className="space-y-3">
            <a
              href={TELEGRAM_WEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setRedirectTriggered(true)}
              className="gold-shimmer-btn relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-black font-extrabold text-lg sm:text-xl tracking-wide uppercase transition-all duration-300 active:scale-[0.98] group cursor-pointer shadow-xl shadow-amber-500/20"
            >
              <Send className="w-6 h-6 fill-black group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
              <span>Join Now</span>
              <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            {/* Direct App Link Alternative */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <a
                href={TELEGRAM_APP_URL}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300/90 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors"
                title="Directly opens Telegram App on Mobile"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Open in Telegram App</span>
              </a>

              <a
                href={TELEGRAM_WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-[#15151c] hover:bg-[#1e1e28] px-3 py-1.5 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                title="Opens in Browser / Web"
              >
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span>Telegram Web</span>
              </a>
            </div>

            {/* Direct fallback info */}
            {redirectTriggered && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-200 animate-fade-in">
                Telegram खोलने के लिए ऊपर <strong>'Join Now'</strong> या <strong>'Open in Telegram App'</strong> पर क्लिक करें।
              </div>
            )}
          </div>

          {/* Channel Benefits / Highlights */}
          <div className="grid grid-cols-2 gap-2 mt-6 pt-5 border-t border-gray-800/80 text-left">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#15151a] border border-gray-800/60">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium">Daily VIP Signals & Calls</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#15151a] border border-gray-800/60">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] sm:text-xs text-gray-300 font-medium">100% Free VIP Access</span>
            </div>
          </div>

          {/* Copy Link & Share Utilities */}
          <div className="mt-5 flex items-center justify-between text-xs text-gray-400 pt-3">
            <div className="flex items-center gap-1.5 truncate max-w-[200px] text-gray-500 font-mono text-[11px]">
              <ExternalLink className="w-3 h-3 text-gray-500 shrink-0" />
              <span className="truncate">t.me/+plLcXhn1Z3diY2Q1</span>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181820] hover:bg-amber-500/10 text-gray-300 hover:text-amber-300 border border-gray-800 hover:border-amber-500/30 transition-all font-medium text-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Footer / Trust Mark */}
      <footer className="w-full max-w-md mx-auto z-10 text-center mt-4">
        <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500/60" />
          <span>Official Secure Redirect • Ritik sir Community © 2026</span>
        </p>
      </footer>
    </main>
  );
}
