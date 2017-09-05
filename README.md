# Atom Dedupe Open Files

### So, turns out this functionality already exists, just hidden away in the tree-view settings.  Heh.  Will be removing soon.  Check out your atom instance's tree view settings if you're like me and have never been able to find such a setting.

Here's what the old readme was all about:

Super simple package that helps make sure you don't accidentally open duplicate files across multiple panes when opening from the tree view, which is something that happens to me all the time.  This will simply intercept the file open event, check if any other panes have the same file open, and if so, will close the newly opened one and activate the existing pane's editor with the file you wanted.

Might seem a bit slow since it has to basically open and close an editor before switching focus state, but that's as good as I could get it with the current atom api.
