# New Room, New Chapter

A private, mobile-first HTML/CSS/JavaScript hype page for Ainain's move-in day.

## Preview locally

From this folder, run `python3 -m http.server 8000`, then visit `http://localhost:8000`. You can also open `index.html` directly, though the local server is a more reliable preview.

## Edit the words

All displayed copy is directly in `index.html`. Each section has a clear HTML comment above it. The closing signature is in the **CLOSING** section (`— Kamran`).

## Tune the motion

Most timings and easing are in `styles/main.css`: look for `.enter`, `.reveal`, `.reveal-card`, and the `@keyframes` rules at the end. The closing canvas confetti count, gravity, colors, and duration are in `scripts/main.js`, inside `burstConfetti()`.

The page honors `prefers-reduced-motion`: all entrance animations become immediate, subtle appearance changes and the confetti is disabled.

## Share privately

The simplest option tonight is to deploy this folder to a private/password-protected site host, then send the link in a private message. The page already includes `noindex, nofollow`, which asks search engines not to index it; that setting is not a substitute for access control if the message needs to stay truly private.
