# Ad Configuration

There are optional parameters that can be used to customise the Fluid Player ad serving. 
No parameters are required and will default if not passed through. 
Vast options relate to the ads served and the how the player handles them

```js
fluidPlayer(
   'my-video',
    {
        vastOptions: {
            adList:                     {},
            skipButtonCaption:          'Skip ad in [seconds]',
            skipButtonClickCaption:     'Skip ad <span class="skip_button_icon"></span>',
            adText:                     null,
            adTextPosition:             'top left',
            adCTAText:                  'Visit now!',
            adCTATextPosition:          'bottom right',
            vastTimeout:                5000,
            showPlayButton:             false,
            maxAllowedVastTagRedirects: 1,

            vastAdvanced: {
				vastLoadedCallback:       (function() {}),
				noVastVideoCallback:      (function() {}),
				vastVideoSkippedCallback: (function() {}),
				vastVideoEndedCallback:   (function() {})
            }
        }
    }
);
```






















































































































