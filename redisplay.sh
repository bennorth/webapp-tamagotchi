#!/bin/bash

case "$1" in
    monitor)
        (echo page.html; echo style.css ; echo code.js ) \
            | entr ./$0 refresh
        ;;
    refresh)
        active_wid=$(xdotool getactivewindow)
        xdotool search --name "Tamagotchi - Google Chrome" \
            windowactivate \
            --sync \
            key --clearmodifiers "ctrl+r"
        xdotool windowactivate $active_wid
        ;;
    *)
        echo "specify monitor or refresh"
esac
