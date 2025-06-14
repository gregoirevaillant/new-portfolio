#!/bin/bash

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
SESH="portfolio"

tmux has-session -t $SESH 2>/dev/null

if [ $? != 0 ]; then
    
    tmux new-session -d -s $SESH -n editor

    
    tmux send-keys -t $SESH:editor.1 "cd /Users/groune/Documents/project/git/new-portfolio" C-m

    
    tmux split-window -h -t $SESH:editor.1
    tmux send-keys -t $SESH:editor.2 "cd /Users/groune/Documents/project/git/new-portfolio/backend" C-m

    
    tmux split-window -v -t $SESH:editor.2
    tmux send-keys -t $SESH:editor.3 "cd /Users/groune/Documents/project/git/new-portfolio/frontend" C-m

    
    tmux send-keys -t $SESH:editor.1 "code ." C-m

    
    tmux new-window -t $SESH -n runner
    tmux send-keys -t $SESH:runner.1 "cd /Users/groune/Documents/project/git/new-portfolio/backend" C-m

    
    tmux split-window -h -t $SESH:runner.1
    tmux send-keys -t $SESH:runner.2 "cd /Users/groune/Documents/project/git/new-portfolio/frontend" C-m

    
    tmux send-keys -t $SESH:runner.1 "npm run local" C-m
    tmux send-keys -t $SESH:runner.2 "npm run local" C-m

    
    tmux select-window -t $SESH:editor
fi


tmux attach-session -t $SESH
