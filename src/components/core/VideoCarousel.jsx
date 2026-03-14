import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Share2,
  Heart,
  Download,
  Settings,
  Loader2,
  AlertCircle,
  Wifi,
  WifiOff,
  Repeat,
  Shuffle
} from 'lucide-react';

const VideoCarousel = ({ 
  videos = [], 
  autoPlay = true, 
  showControls = true, 
  interval = 5000,
  showThumbnails = true,
  className = "",
  height = "h-96 md:h-[500px]",
  showProgress = true,
  showShareButton = true,
  showDownloadButton = true,
  showSettings = true,
  loop = true,
  shuffle = false,
  showVolumeControl = true,
  showFullscreenButton = true,
  enableKeyboardShortcuts = true,
  customTheme = "default",
  onVideoChange = null,
  onVideoPlay = null,
  onVideoPause = null,
  onVideoEnd = null
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [repeatMode, setRepeatMode] = useState(loop ? 'all' : 'none');
  const [isShuffled, setIsShuffled] = useState(shuffle);
  const [isLiked, setIsLiked] = useState(false);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const videoRefs = useRef([]);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const progressBarRef = useRef(null);

  // Enhanced utility functions
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getShuffledIndex = useCallback(() => {
    const availableIndices = videos
      .map((_, index) => index)
      .filter(index => index !== currentIndex);
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
  }, [videos, currentIndex]);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    console.error('Video loading error');
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleProgressClick = useCallback((e) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickPercent = clickX / rect.width;
      const newTime = clickPercent * duration;
      
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo) {
        currentVideo.currentTime = newTime;
        setProgress(clickPercent * 100);
        setCurrentTime(newTime);
      }
    }
  }, [duration, currentIndex]);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  }, [currentIndex]);

  const handlePlaybackRateChange = useCallback((rate) => {
    setPlaybackRate(rate);
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.playbackRate = rate;
    }
  }, [currentIndex]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: videos[currentIndex]?.title,
        text: videos[currentIndex]?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  }, [videos, currentIndex]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = videos[currentIndex]?.url;
    link.download = videos[currentIndex]?.title;
    link.click();
  }, [videos, currentIndex]);

  // Callback functions - defined before useEffect to avoid hoisting issues
  const handleNext = useCallback(() => {
    let nextIndex;
    if (isShuffled) {
      nextIndex = getShuffledIndex();
    } else {
      nextIndex = (currentIndex + 1) % videos.length;
    }
    setCurrentIndex(nextIndex);
    setProgress(0);
    setCurrentTime(0);
    setIsLoading(true);
    onVideoChange?.(videos[nextIndex], nextIndex);
  }, [currentIndex, videos, isShuffled, getShuffledIndex, onVideoChange]);

  const handlePrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setProgress(0);
    setCurrentTime(0);
    setIsLoading(true);
    onVideoChange?.(videos[prevIndex], prevIndex);
  }, [currentIndex, videos, onVideoChange]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePlayPause = useCallback(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        onVideoPause?.(videos[currentIndex], currentIndex);
      } else {
        currentVideo.play();
        onVideoPlay?.(videos[currentIndex], currentIndex);
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, currentIndex, videos, onVideoPlay, onVideoPause]);

  const toggleMute = useCallback(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted, currentIndex]);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      carouselRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  const toggleLike = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const cycleRepeatMode = useCallback(() => {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
    
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.loop = nextMode === 'one';
    }
  }, [repeatMode, currentIndex]);

  const handleVideoTimeUpdate = useCallback(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && duration > 0) {
      const progressPercent = (currentVideo.currentTime / currentVideo.duration) * 100;
      setProgress(progressPercent || 0);
      setCurrentTime(currentVideo.currentTime || 0);
    }
  }, [currentIndex, duration]);

  const handleVideoLoadedMetadata = useCallback(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      setDuration(currentVideo.duration || 0);
      setVolume(currentVideo.volume || 1);
    }
  }, [currentIndex]);

  const handleVideoProgress = useCallback(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && currentVideo.buffered.length > 0) {
      const bufferedEnd = currentVideo.buffered.end(currentVideo.buffered.length - 1);
      const bufferedPercent = (bufferedEnd / currentVideo.duration) * 100;
      setBufferedProgress(bufferedPercent || 0);
    }
  }, [currentIndex]);

  const handleVideoEnded = useCallback(() => {
    onVideoEnd?.(videos[currentIndex], currentIndex);
    
    if (repeatMode === 'one') {
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play();
      }
    } else if (repeatMode === 'all' || autoPlay) {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  }, [repeatMode, autoPlay, currentIndex, videos, handleNext, onVideoEnd]);

  // ALL useEffect hooks - moved to the end to ensure all functions are defined first
  useEffect(() => {
    if (autoPlay && isPlaying && videos.length > 1) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, interval);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoPlay, isPlaying, currentIndex, interval, videos.length, handleNext]);

  // Keyboard shortcuts - ensure stable dependencies with proper memoization
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (togglePlayPause) togglePlayPause();
          break;
        case 'ArrowLeft':
          if (handlePrev) handlePrev();
          break;
        case 'ArrowRight':
          if (handleNext) handleNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (handleVolumeChange) handleVolumeChange(Math.min(volume + 0.1, 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (handleVolumeChange) handleVolumeChange(Math.max(volume - 0.1, 0));
          break;
        case 'f':
          if (toggleFullscreen) toggleFullscreen();
          break;
        case 'm':
          if (toggleMute) toggleMute();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcuts, volume]);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    // Pause other videos when current video changes
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });
  }, [currentIndex]);

  if (!videos || videos.length === 0) {
    return (
      <div className={`flex items-center justify-center ${height} bg-gray-100 rounded-2xl`}>
        <p className="text-gray-500 text-lg">No videos available</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={carouselRef}>
      {/* Main Video Carousel */}
      <div className={`relative ${height} overflow-hidden rounded-2xl bg-black shadow-2xl`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <video
              ref={(el) => (videoRefs.current[currentIndex] = el)}
              src={videos[currentIndex]?.url}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop={repeatMode === 'one'}
              onEnded={handleVideoEnded}
              onTimeUpdate={handleVideoTimeUpdate}
              onLoadedMetadata={handleVideoLoadedMetadata}
              onProgress={handleVideoProgress}
              onPlay={() => {
                setIsPlaying(true);
                onVideoPlay?.(videos[currentIndex], currentIndex);
              }}
              onPause={() => {
                setIsPlaying(false);
                onVideoPause?.(videos[currentIndex], currentIndex);
              }}
              onError={handleVideoError}
              onLoadStart={() => setIsLoading(true)}
              onCanPlay={handleVideoLoad}
              autoPlay={autoPlay && isPlaying}
              playsInline
              crossOrigin="anonymous"
            />
            
            {/* Loading Overlay */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
              >
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              </motion.div>
            )}

            {/* Error Overlay */}
            {hasError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
              >
                <div className="text-center text-white">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">Video Loading Error</p>
                  <p className="text-sm opacity-80">Please check your connection and try again</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setHasError(false);
                      setIsLoading(true);
                    }}
                    className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
                  >
                    Retry
                  </motion.button>
                </div>
              </motion.div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold mb-2"
                >
                  {videos[currentIndex]?.title}
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl opacity-90"
                >
                  {videos[currentIndex]?.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {showControls && videos.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Video Controls */}
        {showControls && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
          >
            {/* Enhanced Progress Bar */}
            {showProgress && (
              <div 
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="relative w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer group"
              >
                {/* Buffered Progress */}
                <div 
                  className="absolute h-full bg-white/30 rounded-full"
                  style={{ width: `${bufferedProgress}%` }}
                />
                {/* Played Progress */}
                <motion.div
                  className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
                {/* Progress Handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `calc(${progress}% - 8px)` }}
                />
              </div>
            )}

            {/* Time Display */}
            <div className="flex items-center justify-between text-white text-sm mb-3">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Enhanced Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Previous/Next */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                  disabled={videos.length <= 1}
                >
                  <SkipBack className="w-4 h-4" />
                </motion.button>
                
                {/* Play/Pause */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlayPause}
                  className="p-3 bg-white/90 text-black rounded-full hover:bg-white transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                  disabled={videos.length <= 1}
                >
                  <SkipForward className="w-4 h-4" />
                </motion.button>

                {/* Volume Control */}
                {showVolumeControl && (
                  <div className="flex items-center gap-2 group">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleMute}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </motion.button>
                    <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-full h-full opacity-0 cursor-pointer"
                      />
                      <div 
                        className="h-full bg-white rounded-full"
                        style={{ width: `${volume * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Repeat Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={cycleRepeatMode}
                  className={`p-2 rounded-full transition-all ${
                    repeatMode !== 'none' 
                      ? 'bg-white/30 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {repeatMode === 'one' ? <Repeat className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                </motion.button>

                {/* Shuffle Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2 rounded-full transition-all ${
                    isShuffled 
                      ? 'bg-white/30 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2">
                {/* Like Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleLike}
                  className={`p-2 rounded-full transition-all ${
                    isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>

                {/* Share Button */}
                {showShareButton && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                )}

                {/* Download Button */}
                {showDownloadButton && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDownload}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                )}

                {/* Settings Button */}
                {showSettings && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSettingsPanel(!showSettingsPanel)}
                    className={`p-2 rounded-full transition-all ${
                      showSettingsPanel 
                        ? 'bg-white/30 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                )}

                {/* Fullscreen Button */}
                {showFullscreenButton && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettingsPanel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 right-4 bg-black/90 backdrop-blur-xl rounded-xl p-4 text-white z-30 min-w-[200px]"
            >
              <h4 className="font-semibold mb-3">Playback Settings</h4>
              
              {/* Playback Speed */}
              <div className="mb-3">
                <label className="text-xs text-gray-300 block mb-1">Speed</label>
                <select 
                  value={playbackRate}
                  onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-sm"
                >
                  <option value="0.5">0.5x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
              </div>

              {/* Quality */}
              <div className="mb-3">
                <label className="text-xs text-gray-300 block mb-1">Quality</label>
                <select className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-sm">
                  <option>Auto</option>
                  <option>1080p</option>
                  <option>720p</option>
                  <option>480p</option>
                  <option>360p</option>
                </select>
              </div>

              {/* Keyboard Shortcuts Info */}
              <div className="text-xs text-gray-400 mt-3">
                <p className="mb-1">Keyboard shortcuts:</p>
                <p>Space: Play/Pause</p>
                <p>←/→: Previous/Next</p>
                <p>↑/↓: Volume</p>
                <p>F: Fullscreen</p>
                <p>M: Mute</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Video Indicators */}
        {videos.length > 1 && (
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {videos.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleThumbnailClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Thumbnail Navigation */}
      {showThumbnails && videos.length > 1 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Video Playlist</h3>
            <span className="text-xs text-gray-500">{currentIndex + 1} / {videos.length}</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {videos.map((video, index) => (
              <motion.button
                key={video.id || index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 relative rounded-xl overflow-hidden transition-all group ${
                  index === currentIndex 
                    ? 'ring-4 ring-blue-500 shadow-xl scale-105' 
                    : 'ring-2 ring-gray-200 hover:ring-gray-300'
                }`}
              >
                <div className="relative w-32 h-20">
                  <img
                    src={video.thumbnail || '/api/placeholder/200/120'}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/200/120';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                  {video.duration && (
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs font-medium truncate">
                    {video.title}
                  </p>
                </div>
                {index === currentIndex && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                    NOW PLAYING
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
