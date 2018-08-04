import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  Menu,
  Message,
  Header,
  Divider,
  Button,
  Input,
  Grid,
} from "semantic-ui-react";

import NoteList from "./components/NoteList";
import Editor from "./components/Editor";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    selectedNote: notes[0],
    // selectedNote: null,
    articleTitle: null,
    articleContent: null,
  };

  onWebClip = (title, content) => {
    this.setState({
      articleTitle: title,
      articleContent: content,
    });
  };

  handleSelectedNote = selectedNote => {
    this.setState({
      selectedNote,
    });
  };

  render() {
    const { articleContent, articleTitle } = this.state;

    return (
      <Router>
        <div className="App">
          <NavBar onClip={this.onWebClip} />
          <Grid columns={1} divided>
            <Grid.Column width={3}>
              <NoteList notes={notes} onNoteSelect={this.handleSelectedNote} />
            </Grid.Column>

            <Grid.Column width={13}>
              <br />
              <Editor title={articleTitle} content={articleContent} />
            </Grid.Column>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;

const notes = [
  {
    title: "Sample Note",
    content: `**Your Inner Mind Is a Work of Imagination**

A whole lot of books on the brain are published these days and you can read yourself into a coma trying to make sense of their various messages. So it was with my usual low-burn curiosity that I starting reading _The Mind Is Flat_ by British behavioral scientist Nick Chater. At least the title is intriguing. But as I started reading it, I perked right up. Maybe that’s because it starts with a long riff on Anna Karenina and asks us to plumb the motivations of her suicide. Can we explain them? What if the great steam engine slammed on its brakes and Anna didn’t die? Would she be able to explain her own motivations to a psychologist while convalescing in a Swiss sanatorium?

Chater writes it makes no difference that Anna is a fictional character. We would go through the exact same mental peregrinations with a real person. In fact, the surviving real person, struggling to find clarity in the muddle of her feelings, would only be telling the psychologist a story about why she wanted to take her life. Chater’s point is a bold one: There is no deep truth about motivations to be found. “No amount of therapy, dream analysis, word association, experiment or brain-scanning can recover a person’s ‘true motives,’ not because they are difficult to find, but because there is nothing to find,” he writes. “The inner, mental world, and the beliefs, motives, and fears it is supposed to contain is, itself, a work of the imagination.”

![Berger-BR-1](http://static.nautil.us/15068_e3d2b39d8bc215f6540218d20280232a.png)

**SURFACE THOUGHTS:** Freud’s iceberg/mind analogy couldn’t be more misleading, Chater writes: “There are no conscious thoughts and unconscious thoughts … There is just one type of thought, and each such thought has two aspects: a conscious read-out, and unconscious processes generating the read-out.”T and Z / Shutterstock

Well, then, I thought, if Chater keeps up this audacious tone, _The Mind Is Flat_ is going to be anything but flat. Indeed, as it makes its way through a modern landscape of cognitive research and experiments, it shoots one dart after another at treasured cultural notions about truths lurking in the tangles of our brains. Emotions are not pre-formed feelings waiting to burst forth, Chater writes, they are momentary improvisations to bodily reactions. Our brains are jazz players, he tells us, cooking up the best thoughts and behaviors for the moment. Tapping into a higher consciousness may be a beloved idea, Chater writes, but it amounts to “nonsense on stilts.” James Joyce’s _Ulysses_ is an exploration of the innermost workings of the mind, you say? “Quite the reverse,” Chater writes. Joyce and Virginia Woolf’s celebrated stream-of-consciousness styles are “outputs of successful cycles of thought.” (OK, that’s a little clunky.)

Nevertheless, I raced through _The Mind Is Flat_ fascinated. I’ve encountered shades of Chater’s ideas in other recent books, notably _How Emotions Are Made_, in which author Lisa Feldman Barrett, a neuroscientist, illuminates in detail how an “emotion is your brain’s creation of what your bodily sensations mean.” But I was consistently engaged by Chater’s brazen points—“We have all been victims of a hoax, perpetrated on us by our brains”—even if I was never quite sure they were right. And so I was anxious to talk to Chater in person, see if I could get him to clear up some of my misgivings about his portrait of the unconscious. He answered my questions with a cheerful spirit and thoughtful insights, along with the wit I associated with his book, particularly when he called Jung’s collective unconscious “the astrology of psychology.” I began by asking about psychotherapy because if there is one pillar of thought that Chater seeks to topple it’s the idea that voyaging into the unconscious can set us free.

**Are you saying psychotherapy that tries to alleviate pain by bringing unconscious motives to the surface is …**

Doomed?

**Yes, doomed. Why?**

It’s doomed by the fact that there is not a deep inner story that is hiding from you. Rather, you’ve got the first draft or a set of incoherent notes for a novel. You’ve got an incoherent muddle. And we’re all incoherent muddles to some degree. But when some of those incoherencies cause us problems, when we’re terrified of something we very much want to do, even something as narrow as a fear of spiders, these are conflicts in our thinking and reactions.

**Do you believe in the value of psychotherapy?**

I do, yes. And I think a reasonable goal should be to help a person understand the world in a more coherent, consistent, integrated way. This is a tremendously creative act on the patient’s part.

**If only it were that easy.**

Right, it’s hard. It’s not that the therapist can say, “I see a tangle there, and let’s untangle it and everything will be fine.” It requires a creative leap. It’s like writing novels is hard. You might think if all you’ve got to do is make everything consistent and fit together and have the characters make sense, and that’s easy. But of course it isn’t. We struggle to do it with our own lives, which are at least as complex as novels.

> If we imagine conscious thought is generated by hidden depths, we torture ourselves to find them.

In fact, our minds are not based on consistency. They are based on precedent, on a transmutation or extension of past experiences. Our past experiences are built on each other and they create habits of thought. Sometimes the past is going to equip us quite badly. We’re going to have patterns of behavior, patterns of thought, that haunt us and are hard to break out of.  

Now, you might say, “Well, if there are no hidden mental depths, psychotherapy ought to be a piece of cake.” But that fact actually makes it more difficult. It’s not that there’s a coherent story and we just need to tweak it a bit. It’s that the whole project of creating an integrated understanding of one’s life is just a really hard thing to do.

**Still, that sounds like we can just improvise our way out of problems. Let’s consider grief. It overtakes your mind. How can a person think his way out of it?**

I don’t think there’s a winning solution to addressing any of life’s problems in a particularly straightforward way. But what’s likely happening in grief is a breakdown in one’s understanding of one’s life. If you think of something really awful like the loss of a child or a partner, one of the things that makes getting over that really hard is the sense that this was not supposed to happen. This was not the script. Life is not supposed to do things like this. My life, my partner, my child’s life, had a course, a direction. And now how do I make sense of what’s happened? This makes no sense, it makes the world seem completely purposeless. A friend of mine whose marriage was breaking down said it’s like someone’s just taken the script and scrunched it up. The sense of the future is a void.

But once something unexpectedly awful happens, we need to rewrite that story. And I think when people are trying to change—grief being a big, difficult hurdle—a lot of that is creative re-imagining. We’re trying to find a way of conceptualizing how the world can make sense when something as bad as this could happen. Maybe I can conceive of the departed person’s life as a very good life. Shorter than I would have wished, but I can understand that there were many positive things.

**If you were a psychotherapist, what would you tell people?**

I suppose I would start by saying that how we interpret the people of the world around us, and the behavioral and mental habits that shape us, can crucially affect how we feel about our lives, and how well we can cope with them. So one aim of therapy is to help people construct new thoughts and patterns of behavior that can help them move forward. It is not, for example, about uncovering or correcting unconscious motives or beliefs—it is about helping the conscious mind move forward.

 [![Sapolsky_TH-F1](http://static.nautil.us/894_4b0250793549726d5c1ea3906726ebfe.png)](http://nautil.us/issue/4/The%20Unlikely/ingenious-jim-davies) 

[Also in Cognitive Science](http://nautil.us/term/f/Cognitive%20Science)  

#### [Ingenious: Jim Davies](http://nautil.us/issue/4/The%20Unlikely/ingenious-jim-davies)

By Luba Ostashevsky

Cognitive scientist Jim Davies can show you how the mind works. In fact, he believes that the mind is a book that can be opened and read, if you know the language in which it’s written. As head of the...**[READ MORE](http://nautil.us/issue/4/The%20Unlikely/ingenious-jim-davies)**

A better understanding of the shallow and improvised nature of our thinking may help—often, attempting to look deep inside ourselves can create some illusory problems for ourselves. If we imagine that our conscious thought is generated by hidden mental depths, we can start to torture ourselves about what those mental depths might contain. In the case of grief, we may wonder: “Am I feeling sad enough? Should I be feeling better this soon? Does that mean I didn’t love my partner or child enough?” You become tormented by a search for what your true inner reality is, and I think that really hamstrings us.

People tear up relationships on similarly thin grounds. Suppose, for example, we look inside ourselves for the love I feel I ought to be feeling for my partner. But now I’m looking for it, where is it? Is it there at all? Or maybe it’s not enough or maybe it’s too much. You can get to a pathological state with this line of thinking. And that comes from this misconception that there’s a true inner reality within me and my reality may not be as it should be. Indeed, the whole idea of the authentic feeling is dangerous because it presupposes there’s a true feeling, and some fake ones, and the true ones are really deep inside me. And then we can worry endlessly about which of our feelings is true, and which isn’t. We should be skeptical about those feelings.

**Why?**

Because to answer such questions about our inner world, our brain is creatively concocting an answer at the very moment we ask the question—not reading out from an inner library of preformed thoughts, feelings, and motivations. We can tell this because if we ask ourselves the same question in even subtly different ways we will get often flatly contradictory answers—our brain is an inveterate, and not entirely consistent, story spinner, not a reporter from an inner world. Yet the brain is such a fluent and compelling storyteller that we can so easily believe it is reporting fact, rather than creating fiction.

**OK, I see what you’re saying. But I don’t quite understand why you’re dismissive of the unconscious. Our conscious thoughts and behavior are influenced by past memories and ingrained habits. So how can you say that the unconscious is a dangerous illusion?**

The reason I think the unconscious is a dangerous metaphor is because it gives you the impression that mental things that are unconscious _could_ be conscious. This whole idea of uncovering things from the unconscious and making them conscious has the presupposition that they are of the same type. It’s the iceberg metaphor of the mind. The tip of the iceberg is made of the same stuff as the rest of the iceberg, which is an invisible mass. And I think that’s really a mistake. The reality is that the things we’re conscious of—experiences, thoughts, fragments of conversation—are completely different in type from the things we’re unconscious of—all these mysterious brain processes, which lay down and retrieve memories, piece fragments of information together, and so on. The brain is doing lots of unconscious work—but it is not thought in any way we understand it. At the everyday level, thought is what flows through my mind—images, pains, fragments of language. But the unconscious brain activity that generates such thoughts is not more of the same. If we could understand the processes by which billions of neurons cooperate to help us recognize a face or interpret a fragment of speech, we would find these as unrelated to the stream of consciousness as the operation of the liver.

> Suppose we look inside ourselves for the love we ought to be feeling. Where is it?

**Maybe you should define “thought” for us.**

Well, that’s a tall order of course! But roughly the stuff of conscious experience: the pains, prods, shapes, movements, noises, and scraps of language that flow through our conscious mind. Until Freud, the very idea that there could be thoughts we are not aware of would have seemed bizarre to most people. The idea that the brain is teeming with activity which is just like conscious thought, but not actually conscious, was a radical idea—but a false trail, I think.

**Is your problem with the unconscious a semantic one? Maybe you don’t like the common usage of the term.**

I think it is really a substantive issue, not a semantic one. The unconscious thought viewpoint actually is a rather parochial view on how the brain works—it assumes that the thoughts that inhabit my conscious mind are a pretty good representation of how my brain operates of which, of course, I have no awareness. But the operation of the brain is much stranger than this: The brain mechanisms of perception, language processing, motor control, and memory help generate conscious thoughts—but they are nothing like hidden “copies” of conscious thoughts.

So the brain’s activity is unconscious all right—it is just not _thought_ in any way we commonly understand it. The trap we fall into is thinking, “Well, if brain activity is not conscious, the brain must be doing unconscious things, and those things must be thinking.” And thinking is about beliefs and reasoning and motives and planning and pains—the things that flow through our conscious minds. So we suddenly start to think, “Yes, the brain has two types of thought, divided by some mysterious boundary of consciousness.” I think that’s a big mistake. You’re quite right that we have brain processes of which we’re not conscious. But it’s not right that those brain processes are doing unconscious _thinking_.

**But they do influence our conscious thinking.**

Yes, absolutely. They completely determine it. Yes, they are the machinery that is generating conscious experiences and conscious thoughts.

> Our brains are no more engaged in unconscious thought that our livers, immune systems, or genes.

**Here’s a simple example of influence. Hearing an old David Bowie song will instantly trigger emotional memories in me. That sure doesn’t feel like a conscious action.**

Yes, that’s right. But think about the brain processes involved in even realizing that the song is familiar; or recognizing that the singer is David Bowie. We have no introspective access to these brain processes. And this is always true: we are only ever aware of the results of the brain’s processing—“Oh, that’s Bowie”—and never of the processing itself. The unconscious operation of the brain is crucially related to thought, but it’s not thought.

**I don’t see how you can separate the two. For instance, you write that the inventiveness of the human brain is best exemplified by “the centrality of metaphor in our thoughts.” Yet the things that make up metaphor—language and symbols—are acquired through evolution and genetics and culture. I don’t see how those unconscious influences can be separated from thoughts. So don’t you think it’s also dangerous, or even misleading, to say that the unconscious is a myth?**

 Well, yes, unconscious influences on thought are everywhere—genetics, experiences, mental habits, the language and metaphors we use, and much more. But the unconscious influences—including the activity of our brains which underpin our thoughts—aren’t themselves thoughts. That’s the mistake we can so easily make. And the second mistake is thinking that, by looking inside ourselves, or through therapy or brain imaging or some other method, we can bring these supposed unconscious thoughts into the light of consciousness. But this is a hopeless project—we can no more bring to consciousness the operation of our brain than we can bring to consciousness other aspects of our own biology. We can invent stories about what the liver is trying to achieve, speak as if the immune system is confused by tissues from our own bodies, or talk of genes being selfish. And we can invent stories about our brain too—suggesting that it might be suppressing beliefs, harboring hidden motives, tapping into the collective unconscious, or whatever we like. But this is metaphor, not literal truth. Our brains are no more engaged in unconscious thought than our livers, immune systems, or genes.

**How do you define emotions?**

I think emotions are interpretations. Understanding one’s own emotions, or another person’s, is very much like understanding the emotions of a fictional character. You’re in a situation, you have a physiological reaction, and you need to make sense of that. If you see someone sweating profusely and looking tense on a high ledge, you think, “That’s bad, they’re afraid of falling, they’re feeling fear.” You do the same with yourself. If you’re on a high ledge, you have the experience being afraid, you are thinking, “My goodness, my heart’s going like crazy, I’m full of adrenaline, I’m sweating profusely,” and, “Help, I’m on this high ledge.’ But you might experience the same physiological symptoms at the starting blocks of a 100-meter race. So your physiological state is highly ambiguous. The point is feelings don’t burst forth from some mental depths. They don’t pre-exist at all. They’re our brain’s best momentary interpretation of feedback about our bodily state, in the light of the situation we’re in.

**Let’s apply your theory about how the mind works to something important in people’s everyday lives, like religion.**

I think religion is quite an interesting illustration of the viewpoint, actually.

**OK. How so?**

If you ask people about the religious doctrines they subscribe to, they’ll say I totally believe these doctrines. But if you try to elucidate how their beliefs and doctrines fit together, that will be a tough thing to do. I’m not saying it wouldn’t be tough to probe our beliefs about science. Our thinking in almost everything is incoherent. Maybe that’s because the world is too complex for us. But let’s take the doctrine of transubstantiation. Somebody who holds this doctrine would say the actual blood and body of Christ is in this wine and wafer. If you try to unpick this and make sense of it, you can’t do it, they can’t do it. It’s just not a doable thing. But that reveals, I think, that what it means to think of yourself as believing something very strongly is to adhere to the surface. What you’re saying, given my loose perspective and background and so on, this is something I will hold to. I might even die at the stake for this thing.

**What makes one belief over another so persuasive to us?**

In my perspective, it comes from this central idea that the brain is a sequential processor, thinking one thought at a time. With each thought, you’re taking up massive fragments of information and trying to pull them together. It could be perceptual information, it could be linguistic information, it could be fragments of memory. And one of the things that presumably religion’s good at doing is giving us the sense that it all somehow fits. It has the sense that all these different aspects of life click into place. Rather like when you see a hard-to-process image and suddenly think, “Oh, I see, it’s a cow’s face” or “It’s a dog.”

Now, maybe all the bits don’t quite fit together, but it has a sense of being coherent. Once you start to disturb that coherence, then your life feels less meaningful. So people will defend a particular perspective of the world and not want to deviate from it. By doing that, the world, the ability to creatively understand their lives, their purpose, and the world around them, is reduced. Maybe there’s another way of thinking about things, which would be at least as appealing. But, at least temporarily, the questioning is painful. Questioning anything we believe, not just religion, is actually quite disturbing.

**Ultimately, what’s the benefit of thinking our minds are flat?**

It’s about focusing on the creative project of understanding one’s own life, rather than trying to unpick one’s own psyche. How do we live our lives more happily and better? How do we think more coherently and better? How do we solve problems going forward? Sometimes solving problems requires going backward, like when you’re trying to write a novel or produce a proof in mathematics. Sometimes you need to go back and think, Wait a minute, I made a mistake here, I did the wrong character development, I made a calculation error. But it’s important to think of the project as going forward, rather than thinking that I and everyone else are in the grip of a mysterious force that’s controlling us and we need to voyage inward to find it. It’s just an unconstructive direction to be looking inward instead of outward. A forward-looking approach to our lives is the positive benefit.

_Kevin Berger is the features editor at_ Nautilus.`,
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "BASDGSDGSBDhbknbkaj219rhu12bfwebweklbwenskbnsdbksndsdjsdkdskdskbsklbjkB",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
  {
    title: "Sample Note",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date().toLocaleDateString(),
  },
];
