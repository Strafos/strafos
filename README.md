## Intro

I use Google Keep, Evernote, iPhone Notes, Google Docs, Facebook messenges to myself, and a bash script to take notes. The goal of this project is to take the best parts of each and create a centralized note system.

### Google Keep

Use Cases:

- Quotes
- Images
- Unplanned reminders (if I pin something up, I will probably look over it when I open Keep)
- Links

Pros:

- Dashboard layout gives me a group of notes which I pinned up
- Easy to look in the past, scrolling down a little usually will go months in past
- Ctrl+V images

### quick notes

This is a command line note taker. Alias is ff because it's quick to type. Example:

```
ff Today, I went to the park"""
```

It records the date and stores the note in a text file.

- It's super convenient when I'm on laptop
- going through past notes is diffcult.
- Only way to query is by string search
- Different way of accessing data (vim textfile) vs entering (ff ${note})
- Local files are totally isolated

### Facebook Messenger

Sometimes, I just message myself on Facebook to record something down.

- Usually, when I'm on the go and only phone is accessible.
- Cross platform
- Hard to look in the past and search for something specific.
- It's circumstantially convenient
- I message myself for non-note reasons so things can get lost

### Evernote

- For longer style of notes, usually requires minimum 30 minutes to write a note
- Webclipper for taking notes on articles/blogposts
- Tags allow for psuedo organization (much better than categorization)
- Search is good
- Inconvenient because after clipping, I have to open the evernote web client and even wait before the clipped article shows up
- Notes at the top of the page instead of inline
- Easy to share a written up document

### iPhone Notes

Not sure when I use this over Messenger (w/ respect to mobile) but it happens sometimes.

### Google Docs

A lot of old stuff on here. I think Evernote has a better editor client so it's strictly better. (Except for pasting images). Good for collaboration and has inline commenting

## Goals

1.  Webclipper like Evernote's
1.  Convenience of quicknotes
1.  Dashboard like Google Keep's
1.  Inline comments on webclipped articles (like those on google docs)
1.  Integration across phone, tablet, and laptops
    - On phone, I only enter notes, never look at them
    - Tablet use case is not important
1.  Able to search through all notes
1.  Unified tagging
1.  Backfill with old notes
