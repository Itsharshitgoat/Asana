# Asana Pomodoro Timer

A sleek and customizable Pomodoro timer web application with a minimalist design, featuring multiple themes and motivational quotes.

## Features

### Timer Modes
- **Pomodoro**: Default 25-minute focused work session
- **Short Break**: Default 5-minute quick rest
- **Long Break**: Default 15-minute extended rest

### Customization
- **Timer Duration**: Adjustable durations for all timer modes
  - Pomodoro: 1-60 minutes
  - Short Break: 1-30 minutes
  - Long Break: 1-60 minutes

### Themes
- **Light Themes**
  - Green gradient (#ACC3AD)
  - Blue gradient (#BFD5D9)
- **Dark Themes**
  - Green accent (#ACC3AD with dark background)
  - Blue accent (#BFD5D9 with dark background)

### Visual Elements
- **Progress Bar**
  - Real-time progress indication
  - Percentage display
- **Timer Controls**
  - Start/Pause functionality
  - Visual state indicators

### Motivational Quotes
- **Category-specific quotes**
  - Work session quotes
  - Break session quotes
  - Long break quotes
- **Auto-rotating quotes** (20-second intervals)

### Notifications
- **Audio Alert**: Ring sound when timer completes
- **Desktop Notifications**: Custom messages based on completed session type

## Technical Details

### File Structure
```
/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── ring.mp3
```

### Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)
- Web Notifications API
- Audio API

### Font Stack
- Primary: 'Inter Tight'
- Timer & Quotes: 'Michroma'
- Fallback: Helvetica, sans-serif

### Responsive Design
- Desktop optimized
- Tablet landscape support
- Tablet portrait support
- Mobile-responsive layouts

### CSS Variables
```css
:root {
    --all-text-font: 'Inter Tight', 'Helvetica', sans-serif;
    --timer-quote-font: 'Michroma', sans-serif;
    --text-color: #3D4C52;
    --hover-text-transition: font-weight 150ms ease-out;
    --smooth-appearance-transition: opacity 200ms ease-out;
    --timer-text-size: 1.6rem;
}
```

### JavaScript Features
- Event-driven architecture
- Local storage for theme persistence
- Input validation for timer settings
- Dynamic quote rotation system
- Progress calculation and display
- Notification permission handling

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations
- Minimal dependencies
- Optimized transitions
- Efficient DOM operations
- Local storage for preferences

## License
MIT License - feel free to use and modify for your own projects.

## Credits
Created by [Harshit](https://itsharshitgoat.github.io/Website/)
