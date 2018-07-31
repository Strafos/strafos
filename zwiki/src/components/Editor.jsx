import React, { Component } from "react";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill"; // ES6
import PropTypes from "prop-types";
import $ from "jquery";

// import * as jquery from "jquery";
// import popup from "semantic-ui";
// import popup from "semantic-ui-popup";

import "react-quill/dist/quill.snow.css"; // ES6

import "./Quill.css";

import { Container } from "semantic-ui-react";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: sampleHTML.replace(/<\/p>/g, "</p><br />"),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyPress = key => {
    console.log(key);
  };

  handleChange(content, delta, source, editor) {
    this.setState({ editorHtml: content });
  }

  render() {
    return (
      <div>
        <Container
          onScroll={() => window.refreshPopup()}
          fluid
          style={{ float: "left" }}
          id="scrollable-content"
        >
          {/* <Container style={{ float: "left" }}> */}
          <ReactQuill
            className="quill-container"
            theme="snow"
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={".app"}
            placeholder={this.props.placeholder}
          />
          {/* </Container> */}
        </Container>
      </div>
    );
  }
}

let Inline = Quill.import("blots/inline");

class CommentBlot extends Inline {
  static create(commentText) {
    const node = super.create();
    node.dataset.content = commentText.comment;
    node.dataset.position = "right center";
    if (commentText.id) {
      node.dataset.id = commentText.id;
    }
    if (commentText.resolved) {
      node.dataset.resolved = commentText.resolved;
    }
    return node;
  }
  static formats(node) {
    return node.dataset;
  }

  format(name, value) {
    super.format(name, value);
  }
}

CommentBlot.blotName = "comment";
CommentBlot.tagName = "span";
CommentBlot.className = "ui";

Quill.register({
  "formats/comment": CommentBlot,
});

class InlineComment {
  constructor(quill) {
    this.quill = quill;

    // Attach handler to toolbar icon (that doesn't exist yet)
    this.toolbar = quill.getModule("toolbar");
    if (typeof this.toolbar != "undefined")
      this.toolbar.addHandler("comment", this.commentEventHanlder);

    // Couple handler with keyboard event
    quill.keyboard.addBinding(
      { key: "M", ctrlKey: true },
      this.commentEventHanlder
    );

    // Create comment icon
    var commentBtns = document.getElementsByClassName("ql-comment");
    if (commentBtns) {
      [].slice.call(commentBtns).forEach(function(commentBtn) {
        commentBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16"><g fill="none" fill-rule="evenodd"><path fill="#444" fill-rule="nonzero" d="M9.92 11H13c1.66 0 3-1.36 3-3V5c0-1.66-1.34-3-3-3H5C3.34 2 2 3.34 2 5v3c0 1.64 1.34 3 3 3h1.44l.63 1.88 2.85-1.9zM5 0h8c2.76 0 5 2.24 5 5v3c0 2.75-2.24 5-5 5h-2.47L7.1 15.26c-.47.3-1.1.2-1.4-.27-.05-.1-.08-.18-.1-.26L5 13c-2.76 0-5-2.25-5-5V5c0-2.76 2.24-5 5-5z"/><path stroke="#444" stroke-width="2" d="M5.37 5H13M5.37 8H10" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
      });
    }
  }

  commentEventHanlder() {
    let quill = this.quill;
    checkDialogExist(quill);
  }
}

function checkDialogExist(quill) {
  let commentToolTip = document.getElementById("inline-comment");
  let commentMask = document.getElementById("inline-comment-mask");
  if (commentToolTip) {
    // This only handles case where a dialog box is open
    // We need to handle the case where a comment is written
    commentToolTip.remove();
    commentMask.remove();
  } else {
    createCommentDialog(quill);
  }
}

// Opens up a small dialog box to write a comment
function createCommentDialog(quill) {
  let range = quill.getSelection();
  let text = quill.getText(range.index, range.length);
  if (text.length < 1) {
    return;
  }
  const atSignBounds = quill.getBounds(range.index);
  let containerMask = document.createElement("div");
  containerMask.id = "inline-comment-mask";
  containerMask.style.width = "100%";
  containerMask.style.height = "100%";
  containerMask.style.top = "0px";
  containerMask.style.position = "fixed";
  containerMask.style.display = "block";

  let container = document.createElement("div");
  container.id = "inline-comment";
  container.classList.add("inline-comment");
  quill.container.appendChild(container);
  quill.container.appendChild(containerMask);
  container.style.position = "absolute";
  container.innerHTML =
    '<textarea class="commentText" placeholder="Type your comment"></textarea><div class="inline-comment-bottom"><button class="inline-send">Send</button> </div>';

  container.style.left = atSignBounds.left - 250 + "px";

  if (atSignBounds.left + 250 < quill.container.clientWidth) {
    container.style.left = atSignBounds.left + "px";
  }

  container.style.top = 10 + atSignBounds.top + atSignBounds.height + "px";
  container.style.zIndex = 80;
  document.querySelector(".commentText").focus();

  let commentToolTip = document.querySelector(".inline-comment");
  let inlineSend = document.querySelector(".inline-send");

  inlineSend.addEventListener("click", function() {
    const commentObj = {};
    let commentText = document.querySelector(".commentText").value;
    commentObj.comment = commentText;
    commentToolTip.remove();
    containerMask.remove();
    quill.format("comment", commentObj);
    window.refreshPopup();
  });
}

Quill.register("modules/inline_comment", InlineComment);

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
      ["comment"], // Need this to add comment to toolbar
    ],
    handlers: { comment: function() {} },
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  inline_comment: true, //And this as well
};

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "comment",
];

/* 
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;

const sampleHTML = `<div id="readability-page-1" class="page"><div><p><span size="1"><i>[I am not a sleep specialist. Please consult with one before making any drastic changes or trying to treat anything serious.]</i></span></p>
<p><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2982730/">Van Geiklswijk et al</a> describe supplemental melatonin as “a chronobiotic drug with hypnotic properties”. Using it as a pure hypnotic – a sleeping pill – is like using an AK-47 as a club to bash your enemies’ heads in. It might work, but you’re failing to appreciate the full power and subtlety available to you.</p>

<p>Melatonin is a neurohormone produced by the pineal gland. In a normal circadian cycle, it’s lowest (undetectable, less than 1 pg/ml of blood) around the time you wake up, and stays low throughout the day. Around fifteen hours after waking, your melatonin suddenly shoots up to 10 pg/ml – a process called “dim light melatonin onset”. For the next few hours, melatonin continues to increase, maybe as high as 60 or 70 pg/ml, making you sleepier and sleepier, and presumably at some point you go to bed. Melatonin peaks around 3 AM, then declines until it’s undetectably low again around early morning.</p>

<p>Is this what makes you sleepy? Yes and no. Sleepiness is a combination of the circadian cycle and the so-called “Process S”. This is an unnecessarily sinister-sounding name for the fact that the longer you’ve been awake, the sleepier you’ll be. It seems to be partly regulated by a molecule called adenosine. While you’re awake, the body produces adenosine, which makes you tired; as you sleep, the body clears adenosine away, making you feel well-rested again.</p>

<p>In healthy people these processes work together. Circadian rhythm tells you to feel sleepy at night and awake during the day. Process S tells you to feel awake when you’ve just risen from sleep (naturally the morning), and tired when you haven’t slept in a long time (naturally the night). Both processes agree that you should feel awake during the day and tired at night, so you do.</p>

<p>When these processes disagree for some reason – night shifts, jet lag, drugs, genetics, playing <i>Civilization</i> until 5 AM – the system fails. One process tells you to go to sleep, the other to wake up. You’re never quite awake enough to feel energized, or quite tired enough to get restful sleep. You find yourself lying in bed tossing and turning, or waking up while it’s still dark and not being able to get back to sleep.</p>

<p>Melatonin works on both systems. It has a weak “hypnotic” effect on Process S, making you immediately sleepier when you take it. It also has a stronger “chronobiotic” effect on the circadian rhythm, shifting what time of day your body considers sleep to be a good idea. Effective use of melatonin comes from understanding both these effects and using each where appropriate.</p>

<p><b>1. Is melatonin an effective hypnotic?</b></p>

<p>Yes.</p>

<p>That is, taking melatonin just before you want to get to sleep, does help you get to sleep. The evidence on this is pretty unanimous. For primary insomnia, two meta-analyses – one by <a href="https://www.smrv-journal.com/article/S1087-0792(04)00060-7/abstract">Brzezinski</a> in 2005 and another by <a href="https://www.ncbi.nlm.nih.gov/pubmed/23691095">Ferracioli-Oda</a> in 2013 – both find it safe and effective. For jet lag, a meta-analysis by the usually-skeptical <a href="http://www.cochrane.org/CD001520/DEPRESSN_melatonin-for-the-prevention-and-treatment-of-jet-lag">Cochrane Collaboration</a> pronounces melatonin “remarkably effective”. For a wide range of <a href="https://onlinelibrary.wiley.com/doi/pdf/10.1111/j.1525-1497.2005.0243.x">primary</a> and <a href="https://www.bmj.com/content/332/7538/385">secondary</a> sleep disorders, Buscemi et al say in their abstract that it doesn’t work, but a quick glance at the study shows it absolutely does and they are incorrectly under-reporting their own results. The <a href="http://www.psychiatrictimes.com/amnesia/role-melatonin-circadian-rhythm-sleep-wake-cycle/page/0/1">Psychiatric Times</a> agrees with me on this: “Results from another study reported as negative actually demonstrated a statistically significant positive result of a decrease in sleep latency by an average of 7.2 minutes for melatonin”.</p>

<p>Expert consensus generally follows the meta-analyses: melatonin works. I find cautious endorsements by the <a href="https://www.mayoclinic.org/drugs-supplements-melatonin/art-20363071">Mayo Clinic</a> and <a href="https://www.hopkinsmedicine.org/health/healthy-sleep/sleep-science/melatonin-for-sleep-does-it-work">John Hopkins</a> less impressive than its <a href="https://sciencebasedmedicine.org/melatonin-for-sleep-disorders-safe-and-effective/">less-than-completely-negative review</a> on Science-Based Medicine, a blog I can usually count on for a hit job on any dietary supplement.</p>

<p>The consensus stresses that melatonin is a very weak hypnotic. The Buscemi meta-analysis cites this as their reason for declaring negative results despite a statistically significant effect – the supplement only made people get to sleep about ten minutes faster. “Ten minutes” sounds pretty pathetic, but we need to think of this in context. Even the strongest sleep medications, like Ambien, only show up in studies as getting you to sleep ten or twenty minutes faster; <a href="https://www.nytimes.com/2007/10/23/health/23drug.html">this <i>New York Times</i> article</a> says that “viewed as a group, [newer sleeping pills like Ambien, Lunesta, and Sonata] reduced the average time to go to sleep 12.8 minutes compared with fake pills, and increased total sleep time 11.4 minutes.” I don’t know of any statistically-principled comparison between melatonin and Ambien, but the difference is hardly (pun not intended) day and night.</p>

<p>Rather than say “melatonin is crap”, I would argue that all sleeping pills have measurable effects that vastly underperform their subjective effects. The linked article speculates on one reason this might be: people have low awareness around the time they get to sleep, and a lot of people’s perception of whether they’re insomniac or not is more anxiety (or sometimes literally dream) than reality. This is possible, but I also think of this in terms of <a href="http://slatestarcodex.com/2014/07/07/ssris-much-more-than-you-wanted-to-know/">antidepressant studies</a>, which find similarly weak objective effects despite patients (and doctors) who swear by them and say they changed their lives. If I had to guess, I would say that the studies include an awkward combination of sick and less-sick people <i>and</i> confuse responders and non-responders. Maybe this is special pleading. I don’t know. But if you think any sleeping pill works well, melatonin doesn’t necessarily work much worse than that.</p>

<p>Sleep latency statistics are hard to compare to one another because they’re so dependent on the study population. If your subjects take an hour to fall asleep, perhaps melatonin could shave off <a href="https://www.ncbi.nlm.nih.gov/pubmed/19379289">thirty-four minutes</a>. But if your subjects take twenty minutes to fall asleep, then no sleeping pill will ever take off thirty-four minutes, and even an amazing sleeping pill might struggle to make fifteen. I cannot directly compare the people who say melatonin gives back ten minutes to the people who say melatonin gives back thirty-four minutes to the people who say Ambien gives back twelve, but my totally unprincipled guess is that melatonin is about a third as strong as Ambien. It also has about a hundred times fewer side effects, so there’s definitely a place for it in sleep medicine.</p>

<p><b>2. What is the right dose of melatonin?</b></p>

<p>0.3 mg.</p>

<p>“But my local drugstore sells 10 mg pills! When I asked if they had anything lower, they looked through their stockroom and were eventually able to find 3 mg pills! And you’re saying the correct dose is a third of a milligram?!”</p>

<p>Yes. Most existing melatonin tablets are around ten to thirty times the correct dose.</p>

<p>Many early studies were done on elderly people, who produce less endogenous melatonin than young people and so are considered especially responsive to the drug. Several lines of evidence determined that 0.3 mg was the best dose for this population. Elderly people given doses around 0.3 mg slept better than those given 3 mg or more and had fewer side effects (<a href="https://academic.oup.com/jcem/article/86/10/4727/2849013">Zhdanova et al 2001</a>). A meta-analysis of dose-response relationships concurred, finding a plateau effect around 0.3 mg, with doses after that having no more efficacy, but worse side effects (<a href="https://www.ncbi.nlm.nih.gov/pubmed/15649737">Brzezinski et al, 2005</a>). And doses around 0.3 mg cause blood melatonin spikes most similar in magnitude and duration to the spikes seen in healthy young people with normal sleep (<a href="http://sci-hub.tw/10.1007/s40266-014-0178-0">Vural et al, 2014</a>).</p>

<center><img src="http://slatestarcodex.com/blog_images/melatonin1.jpeg"></center>

<p>Other studies were done on blind people, who are especially sensitive to melatonin since they lack light cues to entrain their circadian rhythms. This is a little bit of a different indication, since it’s being used more as a chronobiotic than a sleeping pill, but the results were very similar: lower doses worked better than higher doses. For example, in <a href="https://www.ncbi.nlm.nih.gov/pubmed/12069043">Lewy et al 2002</a>, nightly doses of 0.5 mg worked to get a blind subject sleeping normally at night; doses of 20 mg didn’t. They reasonably conclude that the 20 mg is such a high dose that it stays in their body all day, defeating the point of a hormone whose job is to signal nighttime. Other studies on the blind have generally confirmed that doses of around 0.3 to 0.5 mg are optimal.</p>

<p>There have been disappointingly few studies on sighted young people. One such, <a href="https://www.ncbi.nlm.nih.gov/pubmed/8856838">Attenburrow et al 1996</a> finds that 1 mg works but 0.3 mg doesn’t, suggesting these people may need slightly higher doses, but this study is a bit of an outlier. <a href="ftp://s173-183-201-52.ab.hsia.telus.net/Inetpub/wwwroot/DairyScience/Resources/NTS/CPT57_552.pdf">Another Zhdanova study</a> on 25 year olds found both to work equally. And <a href="ftp://173.183.201.52/Inetpub/wwwroot/DairyScience/Resources/NTS/JPR31_326.pdf">Pires et al</a> studying 22-24 year olds found that 0.3 mg worked better than 1.0. I am less interested in judging the 0.3 mg vs. 1.0 mg debate than in pointing out that both numbers are much lower than the 3 – 10 mg doses found in the melatonin tablets sold in drugstores.</p>

<p>UpToDate, the gold standard research database used by doctors, agrees with these low doses. “We suggest the use of low, physiologic doses (0.1 to 0.5 mg) for insomnia or jet lag (Grade 2B). High-dose preparations raise plasma melatonin concentrations to a supraphysiologic level and alter normal day/night melatonin rhythms.” Mayo Clinic <a href="https://newsnetwork.mayoclinic.org/discussion/mayo-clinic-q-and-a-prepare-for-jet-lag-before-boarding-the-plane/">makes</a> a similar recommendation: they recommend 0.5 mg. John Hopkins’ experts almost agree: <a href="https://www.hopkinsmedicine.org/health/healthy-sleep/sleep-science/melatonin-for-sleep-does-it-work">they say</a> “less is more” but end up chickening out and recommending 1 to 3 mg, which is well above what the studies would suggest.</p>

<p>Based on a bunch of studies that either favor the lower dose or show no difference between doses, plus clear evidence that 0.3 mg produces an effect closest to natural melatonin spikes in healthy people, plus UpToDate usually having the best recommendations, I’m in favor of the 0.3 mg number. I think you could make an argument for anything up to 1 mg. Anything beyond that and you’re definitely too high. Excess melatonin isn’t grossly dangerous, but tends to produce tolerance and might mess up your chronobiology in other ways. Based on anecdotal reports and the implausibility of becoming tolerant to a natural hormone at the dose you naturally have it, I would guess sufficiently low doses are safe and effective long term, but this is just a guess, and most guidelines are cautious in saying anything after three months or so.</p>

<p><b>3. What are circadian rhythm disorders? How do I use melatonin for them?</b></p>

<p>Circadian rhythm disorders are when your circadian rhythm doesn’t match the normal cycle where you want to sleep at night and wake up in the morning.</p>

<p>The most popular circadian rhythm disorder is “being a teenager”. Teenagers’ melatonin cycle is naturally shifted later, so that they don’t want to go to bed until midnight or later, and don’t want to wake up until eight or later. This is an obvious mismatch with school starting times, leading to teenagers either not getting enough sleep, or getting their sleep at times their body doesn’t want to be asleep and isn’t able to use it properly. This is why <a href="https://tonic.vice.com/en_us/article/qkq8xx/scientists-really-really-think-school-should-start-later">every</a> <a href="https://www.cdc.gov/features/school-start-times/index.html">reputable</a> <a href="http://sciencenordic.com/should-teens%E2%80%99-school-day-start-later">sleep</a> <a href="https://www.theatlantic.com/education/archive/2015/08/why-school-should-start-later/401489/">scientist</a> <a href="https://sleepfoundation.org/sleep-news/backgrounder-later-school-start-times">and</a> <a href="http://time.com/4741147/school-start-time/">relevant</a> <a href="https://bigthink.com/news/study-reveals-long-term-effects-of-delaying-school-start-time">scientific</a> <a href="https://www.ted.com/talks/wendy_troxel_why_school_should_start_later_for_teens">body</a> <a href="http://theconversation.com/sleepy-teenage-brains-need-school-to-start-later-in-the-morning-82484">keeps</a> <a href="https://education.media/why-school-should-start-later">telling</a> <a href="http://www.kappanonline.org/later-start-time-for-teens/">the</a> <a href="https://www.smithsonianmag.com/smart-news/sleep-scientists-say-school-days-should-start-later-180956565/">public</a> <a href="https://www.reuters.com/article/us-health-sleep-school-start/later-middle-school-start-times-tied-to-longer-sleep-for-kids-idUSKBN1HP2VX">school</a> <a href="https://www.usatoday.com/story/news/nation-now/2017/04/18/schools-should-start-later-prevent-accidents-depression-scientists-say/100573390/">system</a> <a href="https://blogs.scientificamerican.com/observations/sleepy-teens-high-school-should-start-later-in-the-morning/">to</a> <a href="https://www.sciencealert.com/delay-school-day-adolescents-improves-wellbeing-and-alertness">start</a> <a href="https://www.sciencedaily.com/releases/2018/04/180410084223.htm">later</a>.</p>

<p>When a this kind of late sleep schedule persists into adulthood or becomes too distressing, we call it <a href="https://en.wikipedia.org/wiki/Delayed_sleep_phase_disorder">Delayed Sleep Phase Disorder</a>. People with DSPD don’t get tired until very late, and will naturally sleep late if given the chance. The weak version of this is “being a night owl” or “not being a morning person”. The strong version just looks like insomnia: you go to bed at 11 PM, toss and turn until 2 AM, wake up when your alarm goes off at 7, and complain you “can’t sleep”. But if you can sleep at 2 AM, consistently, regardless of when you wake up, and you would fall asleep as soon as your head hit the pillow if you first got into bed at 2, then this isn’t insomnia – it’s DSPD.</p>

<p>The opposite of this pattern is Advanced Sleep Phase Disorder. This is most common in the elderly, and I remember my grandfather having this. He would get tired around 6 PM, go to bed by 7, wake around 1 or 2 AM, and start his day feeling fresh and alert. But the weak version of this is the person who wakes up at 5 each morning even though their alarm doesn’t go off until 8 and they could really use the extra two hours’ sleep. These people would probably do fine if they just went to bed at 8 or 9, but the demands of work and a social life make them feel like they “ought” to stay up as late as everyone else. So they go to bed at 11, wake up at 5, and complain of “terminal insomnia”.</p>

<p>Finally, there’s Non-24-Hour-Sleep Disorder, where somehow your biological clock ended up deeply and unshakeably convinced that days on Earth are twenty-five (or whatever) hours long, and decides this is the hill it wants to die on. So if you naturally sleep 11 – 7 one night, you’ll naturally sleep 12 – 8 the next night, 1 to 9 the night after that, and so on until either you make a complete 24-hour cycle or (more likely) you get so tired and confused that you stay up 24+ hours and break the cycle. This is most common in blind people, who don’t have the visual cues they need to remind themselves of the 24 hour day, but it happens in a few sighted people also; Eliezer Yudkowsky has written about his struggles with this condition.</p>

<p>Melatonin effectively treats these conditions, but you’ve got to use it right.</p>

<p>The general heuristic is that melatonin drags your sleep time towards the direction of when you take the melatonin. </p>

<p>So if you want to go to sleep (and wake up) earlier, you want to take melatonin early in the day. How early? <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2982730/">Van Geijlswijk et al</a> sums up the research as saying it is most effective “5 hours prior to both the traditionally determined [dim light melatonin onset] (circadian time 9)”. If you don’t know your own melatonin cycle, your best bet is to take it 9 hours after you wake up (which is presumably about seven hours before you go to sleep).</p>

<p>What if you want to go to sleep (and wake up) later? Our understanding of the melatonin cycle strongly suggests melatonin taken first thing upon waking up would work for this, but as far as I know this has never been formally investigated. The best I can find is researchers saying that they think it would happen and being confused why no other researcher has investigated this.</p>

<p>And what about non-24-hour sleep disorders? I think the goal in treatment here is to advance your phase each day by taking melatonin at the same time, so that your sleep schedule is more dependent on your own supplemental melatonin than your (screwed up) natural melatonin. I see conflicting advice about how to do this, with some people saying to use melatonin as a hypnotic (ie just before you go to bed) and others saying to use it on a typical phase advance schedule (ie nine hours after waking and seven before sleeping, plausibly about 5 PM). I think this one might be complicated, and a qualified sleep doctor who understands your personal rhythm might be able to tell you which schedule is best for you. Eliezer says the latter regimen had very impressive effects for him (search “Last but not least” <a href="http://www.hpmor.com/notes/98/">here</a>). I’m interested in hearing from the MetaMed researcher who gave him that recommendation on how they knew he needed a phase advance schedule.</p>

<p>Does melatonin used this way cause drowsiness (eg at 5 PM)? I think it might, but probably such a minimal amount compared to the non-sleep-conduciveness of the hour that it doesn’t register.</p>

<p>Melatonin isn’t the only way to advance or delay sleep phase. Here is a handy cheat sheet of research findings and theoretical predictions:</p>

<p><u>TO TREAT DELAYED PHASE SLEEP DISORDER</u> (ie you go to bed too late and wake up too late, and you want it to be earlier)<br>

– Take melatonin 9 hours after wake and 7 before sleep, eg 5 PM<br>

– Block blue light (eg with blue-blocker sunglasses or <a href="https://justgetflux.com/">f.lux</a>) after sunset<br>

– Expose yourself to bright blue light (sunlight if possible, <a href="https://en.wikipedia.org/wiki/Dawn_simulation">dawn simulator</a> or light boxes if not) early in the morning<br>

– Get early morning exercise<br>

– Beta-blockers early in the morning (not generally recommended, but if you’re taking beta-blockers, take them in the morning)</p>

<p><u>TO TREAT ADVANCED PHASE SLEEP DISORDER</u> (ie you go to bed too early and wake up too early, and you want it to be later)<br>

– Take melatonin immediately after waking<br>

– Block blue light (eg with blue-blocker sunglasses or f.lux) early in the morning<br>

– Expose yourself to bright blue light (sunlight if possible, light boxes if not) in the evening.<br>

– Get late evening exercise<br>

– Beta-blockers in the evening (not generally recommended, but if you’re taking beta-blockers, take them in the evening)</p>

<p>These don’t “cure” the condition permanently; you have to keep doing them every day, or your circadian rhythm will snap back to its natural pattern.</p>

<p>What is the correct dose for these indications? Here there is a lot more controversy than the hypnotic dose. Of the nine studies van Geijlswijk describes, seven have doses of 5 mg, which suggests this is something of a standard for this purpose. But the only study to compare different doses directly (<a href="http://sci-hub.tw/https://academic.oup.com/sleep/article-abstract/28/10/1271/2708107">Mundey et al 2005</a>) found no difference between a 0.3 and 3.0 mg dose. The <a href="http://cochranelibrary-wiley.com/doi/10.1002/14651858.CD001520/abstract;jsessionid=20D65484B47838F671E48B9E263FA215.f03t03">Cochrane Review on jet lag</a>, which we’ll see is the same process, similarly finds no difference between 0.5 and 5.0.</p>

<p>Van Geijlswijk makes the important point that if you take 0.3 mg seven hours before bedtime, none of it is going to be remaining in your system at bedtime, so it’s unclear how this even works. But – well, it <i>is</i> pretty unclear how this works. In particular, I don’t think there’s a great well-understood physiological explanation for how taking melatonin early in the day shifts your circadian rhythm seven hours later.</p>

<p>So I think the evidence points to 0.3 mg being a pretty good dose here too, but I wouldn’t blame you if you wanted to try taking more.</p>

<p><b>4. How do I use melatonin for jet lag?</b></p>

<p>Most studies say to take a dose of 0.3 mg just before (your new time zone’s) bedtime.</p>

<p>This doesn’t make a lot of sense to me. It seems like you should be able to model jet lag as a circadian rhythm disorder. That is, if you move to a time zone that’s five hours earlier, you’re in the exact same position as a teenager whose circadian rhythm is set five hours later than the rest of the world’s. This suggests you should use DSPD protocol of taking melatonin nine hours after waking / five hours before DLMO / seven hours before sleep.</p>

<p>My guess is for most people, their new time zone bedtime <i>is</i> a couple of hours before their old bedtime, so you’re getting most of the effect, plus the hypnotic effect. But I’m not sure. Maybe taking it earlier would work better. But given that the new light schedule is already working in your favor, I think most people find that taking it at bedtime is more than good enough for them.</p>

<p><b>5. I try to use melatonin for sleep, but it just gives me weird dreams and makes me wake up very early</b></p>

<p>This is my experience too. When I use melatonin, I find I wake the next morning with a jolt of energy. Although I usually have to grudgingly pull myself out of bed, melatonin makes me wake up bright-eyed, smiling, and ready to face the day ahead of me…</p>

<p>…at 4 AM, invariably. This is why despite my interest in this substance I never take melatonin myself anymore.</p>

<p>There are many people like me. What’s going on with us, and can we find a way to make melatonin work for us?</p>

<p>This <a href="http://www.blueprintfitness.co.uk/how-melatonin-can-help-you-sleep-or-wake-you-up-early/">bro-science site</a> has an uncited theory. Melatonin is known to suppress cortisol production. And cortisol is inversely correlated with adrenaline. So if you’re naturally very low cortisol, melatonin spikes your adrenaline too high, producing the “wake with a jolt” phenomenon that I and some other people experience. I like the way these people think. They understand individual variability, their model is biologically plausible, and it makes sense. It’s also probably wrong; it has too many steps, and nothing in biology is ever this elegant or sensible.</p>

<p>I think a more parsimonious theory would have to involve circadian rhythm in some way. Even an 0.3 mg dose of melatonin gives your body the absolute maximum amount of melatonin it would ever have during a natural circadian cycle. So suppose I want to go to bed at 11, and take 0.3 mg melatonin. Now my body has a melatonin peak (usually associated with the very middle of the night, like 3 AM) at 11. If it assumes that means it’s <i>really</i> 3 AM, then it might decide to wake up 5 hours later, at what it thinks is 8 AM, but which is actually 4.</p>

<p>I think I have a much weaker circadian rhythm than most people – at least, I take a lot of naps during the day, and fall asleep about equally well whenever. If that’s true, maybe melatonin acts as a superstimulus for me. The normal tendency to wake up feeling refreshed and alert gets exaggerated into a sudden irresistable jolt of awakeness.</p>

<p>I don’t know if this is any closer to the truth than the adrenaline theory, but it at least fits what we know about circadian rhythms. I’m going to try to put some questions about melatonin response on the SSC survey this year, so start trying melatonin now so you can provide useful data.</p>

<p>What about the weird dreams?</p>

<p>From <a href="https://www.huffingtonpost.com/entry/crazy-melatonin-dreams_us_56fd59e6e4b0a06d58051de8">a HuffPo article</a>:</p>

<blockquote><p>Dr. Rafael Pelayo, a Stanford University professor of sleep medicine, said he doesn’t think melatonin causes vivid dreams on its own. “Who takes melatonin? Someone who’s having trouble sleeping. And once you take anything for your sleep, once you start sleeping more or better, you have what’s called ‘REM rebound,’” he said. </p>

<p>This means your body “catches up” on the sleep phase known as rapid eye movement, which is characterized by high levels of brain-wave activity.</p>

<p>Normal subjects who take melatonin supplements in the controlled setting of a sleep lab do not spend more time dreaming or in REM sleep, Pelayo added. This suggests that there is no inherent property of melatonin that leads to more or weirder dreams.</p></blockquote>

<p>Okay, but I usually have normal sleep. I take melatonin sometimes because I like experimenting with psychotropic substances. And I still get some really weird dreams. A Slate journalist <a href="http://www.slate.com/blogs/the_drift/2015/11/05/you_will_never_dream_as_vividly_as_you_do_on_melatonin.html">says</a> he’s been taking melatonin for nine years and still gets crazy dreams.</p>

<p>We know that REM sleep is most common towards the end of sleep in the early morning. And <a href="http://journals.sagepub.com/doi/abs/10.1177/074873049701200618">we know</a> that some parts of sleep structure are responsive to melatonin directly. There’s a lot of debate over <a href="https://www.ncbi.nlm.nih.gov/pubmed/14715839">exactly what</a> melatonin does to REM sleep, but given all the reports of altered dreaming, I think you could pull together a case that it has some role in sleep architecture that promotes or intensifies REM.</p>

<p><b>6. Does this relate to any other psychiatric conditions?</b></p>

<p>Probably, but this is all still speculative.</p>

<p>Seasonal affective disorder is the clearest suspect. We know that the seasonal mood changes don’t have anything to do with temperature; they seem to be based entirely on winter having shorter (vs. summer having longer) days.</p>

<p>There’s some evidence that there are two separate kinds of winter depression. In one, the late sunrises train people to a late circadian rhythm and they end up phase-delayed. In the other, the early sunsets train people to an early circadian rhythm and they end up phase-advanced. Plausibly SAD also involves some combination of the two where the circadian rhythm doesn’t know what it’s doing. In either case, this can make sleep non-circadian-rhythm-congruent and so less effective at doing whatever it is sleep does, which causes mood problems.</p>

<p>How does sunrise time affect the average person, who is rarely awake for the sunrise anyway and usually sleeps in a dark room? I think your brain subconsciously “notices” the time of the dawn even if you are asleep. There are some weird pathways leading from the eyes to the nucleus governing circadian rhythm that seem independent of any other kind of vision; these might be keeping tabs on the sunrise if even a little outside light is able to leak into your room. I’m basing this also on the claim that <a href="https://en.wikipedia.org/wiki/Dawn_simulation">dawn simulators</a> work even if you sleep through them. I don’t know if people get seasonal affective disorder if they sleep in a completely enclosed spot (eg underground) where there’s no conceivable way for them to monitor sunrise times.</p>

<p>Bright light is the standard treatment for SAD for the same reason it’s the standard treatment for any other circadian phase delay, but shouldn’t melatonin work also? Yes, and there are some preliminary studies (<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3202495/">paper</a>, <a href="https://www.sciencedaily.com/releases/2006/05/060501113832.htm">article</a>) showing it does. You have to be a bit careful, because some people are phase-delayed and others phase-advanced, and if you use melatonin the wrong way it will make things worse. But for the standard phase-delay type of SAD, normal phase advancing melatonin protocol seems to go well with bright light as an additional treatment.</p>

<p>This model also explains the otherwise confusing tendency of some SAD sufferers to get depressed in the summer. The problem isn’t amount of light, it’s circadian rhythm disruption – which summer can do just as well as winter can.</p>

<p>I’m also very suspicious there’s a strong circadian component to depression, based on a few lines of evidence.</p>

<p>First, one of the most classic symptoms of depression is awakening in the very early morning and not being able to get back to sleep. This is confusing for depressed people, who usually think of themselves as very tired and needing to sleep more, but it definitely happens. This fits the profile for a circadian rhythm issue.</p>

<p>Second, <a href="https://en.wikipedia.org/wiki/Agomelatine">agomelatine</a>, a melatonin analogue, is an effective (ish) antidepressant.</p>

<p>Third, for some reason <a href="https://www.scientificamerican.com/article/fighting-depression-by-staying-awake/">staying awake for 24+ hours</a> is a very effective depression treatment (albeit temporary; you’ll go back to normal after sleeping). This seems to sort of be a way of telling your circadian rhythm “You can’t fire me, I quit”, and there are some complicated sleep deprivation / circadian shift protocols that try to leverage it into a longer-lasting cure. I don’t know anything about this, but it seems pretty interesting.</p>

<p>Fourth, we checked and depressed people <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2612129/">definitely have weird circadian rhythms</a>.</p>

<p>Last of all, bipolar has a very strong circadian component. There aren’t a whole lot of lifestyle changes that really work for preventing bipolar mood episodes, but one of the big ones is keeping a steady bed and wake time. <a href="https://en.wikipedia.org/wiki/Interpersonal_and_social_rhythm_therapy">Social rhythms therapy</a>, a rare effective psychotherapy for bipolar disorder, revolves around training bipolar people to control their circadian rhythms.</p>

<p>Theories of why circadian rhythms matter so much revolve either around the idea of pro-circadian sleep – that sleep is more restorative and effective when it matches the circadian cycle – or the idea of multiple circadian rhythms, with the body functioning better when all of them are in sync.</p>

<p><b>7. How can I know what the best melatonin supplement is?</b></p>

<p>Labdoor has done purity tests on various brands and has <a href="https://labdoor.com/rankings/melatonin">ranked them</a> for you. All the ones they highlight are still ten to thirty times the appropriate dose (also, stop calling them things like “Triple Strength!” You don’t <i>want</i> your medications to be too strong!). As usual, I trust NootropicsDepot for things like this – and sure enough their melatonin (available <a href="https://www.amazon.com/Melatonin-Capsules-Supports-Relaxation-Supplement/dp/B01HFN5NVU/ref=sr_1_15_a_it?ie=UTF8&amp;qid=1530605913&amp;sr=8-15&amp;keywords=melatonin+0.3+mg">on Amazon</a>) is <i>exactly</i> 0.3 mg. God bless them.</p></div></div>`;
