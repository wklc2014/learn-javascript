# [clappr player](https://github.com/clappr/clappr/tree/master) 

PC terminal 支持比较好，部分插件系统对 Mobile terminal 报错。

## Installing 

```js
npm install clappr --save-dev
```

### CDN

```
https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js
```

## Use

```js
var player = new Clappr.Player({
	width: '',
	height: '',
	parentId: '',
	autoPlay: true,
	loop: false,
	chromeless: true,
});
```

### 1. Player Size
```js
{
  width: '',
  height: '',
}
```
#### width(String)
视频宽度。

#### height(String)
视频高度。

### 2. Player Location
```js
{
  parentId: '',
  parent: '',
}
```

#### parentId(String)
插入视频元素 CSS 选择器。

#### parent(Object)
插入视频元素 DOM 对象。

### 3. Auto Play
```js
{
  autoPlay: false,
  disableCanAutoPlay: false,
}
```

#### autoPlay
自动播放。

#### disableCanAutoPlay
默认情况下，插件会尽力检测浏览器是否可以自动播放视频。<br/>
如果要禁用此行为，请添加 `disableCanAutoPlay: true` 参数。

### 4. Loop
```js
{
  loop: false,
}
```
#### loop
循环播放

### 5. Chromeless 更简洁
```js
{
  chromeless: false,
}
```
#### chromeless
隐藏控制栏。

### 6. Internationalization 
#### language
指定语言。 

```js
var options = {
  source: 'example.com/example.mpd',
  language: 'pt-BR',
  strings: {
    'pt-BR': {
      'live': 'ao vivo',
      'back_to_live': 'voltar para o ao vivo',
      'disabled': 'Desativado',
      'playback_not_supported': 'Seu navegador não supporta a reprodução deste video. Por favor, tente usar um navegador diferente.'
     }
  }
}
```

### 7. Allow user interaction (in chromeless mode)
```js
{
  allowUserInteraction: true,
}
```
#### allowUserInteraction

### 8. Disable keyboard shortcuts
```js
{
  disableKeyboardShortcuts: false,
}
```
#### disableKeyboardShortcuts
是否禁止使用键盘控制播放器。

### 9. Mute
```js
{
  mute: true
}
```
#### mute 
是否开始播放时静音。

### 10. Add mimeType for extension-less url
```js
{
  mimeType: "mimetype-for-media"
}
```
#### mimeType
设置视频源 `mimeType`。

### 11. Actual live time
#### actualLiveTime

### 12. Configuration persistance
#### persistConfig

### 13. Playback not supported custom message
```js
{
  playbackNotSupportedMessage: 'Please try on a different browser',
}
```
#### playbackNotSupportedMessage
设置浏览器不支持视频播放的提示文案。

### 14. Preload
```js
{
  preload: 'metadata',
}
```
#### preload
设置视频加载模式。

### 15. Playback configurationPlayback configuration
```js
{
  playback: {
    preload: 'metadata',
    controls: true,
    playInline: true, // allows inline playback when running on iOS UIWebview
    crossOrigin: 'use-credentials',
    recycleVideo: Clappr.Browser.isMobile, // Recycle <video> element only for mobile. (default is true)
    triggerFatalErrorOnResourceDenied: true, // Triggers playback fatal error if resource is denied. (default is false)
    externalTracks: [ // Add external <track> (if supported by browser, see also https://www.w3.org/TR/html5/embedded-content-0.html#the-track-element)
      {lang: 'en', label: 'English', src: 'http://example.com/en.vtt', kind: 'subtitles'},
      {lang: 'fr', label: 'French', src: 'http://example.com/fr.vtt'} // 'kind' default value is 'subtitles'
    ]
  }
}
```

#### playback
播放配置。


### 16. Media Control Auto Hide
```js
{
  hideMediaControl: false,
  hideMediaControlDelay: 200,
}
```
#### hideMediaControl
是否自动隐藏控制栏。

#### hideMediaControlDelay
控制栏自动隐藏的延迟时间(毫秒)。

### 17. Hide Volume Bar
```js
{
  hideVolumeBar: true
}
```
#### hideVolumeBar
是否隐藏音量控制条。

> 当宽度属性小于320时，音量按钮是隐藏的。

### 18. Watermark

```js
  var player = new Clappr.Player({
    source: "http://your.video/here.mp4",
    watermark: "http://url/img.png", 
    position: 'top-right',
    watermarkLink: "http://example.net/"
  });
```
#### watermark
设置水印 Logo。

#### position 
水印位置。
+ bottom-left
+ bottom-right
+ top-left
+ top-right

#### watermarkLink 
水印点击跳转地址。

### 19. Poster
```js
{
  poster: 'http://url/img.png'
}
```
#### poster

### 20. Audio Only Hint
#### audioOnly
指定是音频源。

### 21. Stats

### 22. Automatically Seek To Point Specified in URL
```js
{
  autoSeekFromUrl: false
}
```
#### autoSeekFromUrl
是否自动从视频源地址设置的位置开始播放。

> E.g. example.com?t=100

### 23. Disable HTML5 Video Context Menu
```js
{
  disableVideoTagContextMenu: true,
}
```
#### disableVideoTagContextMenu
是否禁用视频播放器上右键按钮。

### 24. Disable Exiting Full Screen When Media Ends
```js
{
  exitFullscreenOnEnd: true,
}
```
视频播放完成后，是否退出全屏。

### 25. Control bar colors
```js
  var player = new Clappr.Player({
    source: "http://your.video/here.mp4",
    mediacontrol: {
      seekbar: "#E113D3", 
      buttons: "#66B2FF"
    }
  });
```


--------------------------------------------------

## Events API

```js
// You can either listen to events fired from the player layer this way
var player = new Clappr.Player({
  events: {
    onReady: function() { ... }, //Fired when the player is ready on startup
    onResize: function() { ... },//Fired when player resizes
    onPlay: function() { ... },//Fired when player starts to play
    onPause: function() { ... },//Fired when player pauses
    onStop: function() { ... },//Fired when player stops
    onEnded: function() { ... },//Fired when player ends the video
    onSeek: function() { ... },//Fired when player seeks the video
    onError: function() { ... },//Fired when player receives an error
    onTimeUpdate: function() { ... },//Fired when the time is updated on player
    onVolumeUpdate: function() { ... },//Fired when player updates its volume
  }
})
// or this way
player.on(Clappr.Events.PLAYER_PLAY, function() { ... })
```

CONTAINER_READY




























