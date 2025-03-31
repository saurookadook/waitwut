---
title: 'Web Accessibility'
date: '2025-03-28'
fullPath: '/notes/web-accessibility'
sectionSlug: 'notes'
---

- [What is Web Accessibility?](#what-is-web-accessibility)
  - [Common Considerations](#common-considerations)

## What is Web Accessibility?

Practice of making websites usable for the **widest range of people possible**, **including those with disabilities**.

- this also includes those with partial disabilities
- some people only interact with web through **screen readers** and/or a keyboard _(or assistive technology that mimics keyboard behavior)_

### Common Considerations

- [Visual Disabilities](#visual-disabilities)
- [Auditory Impairments](#auditory-impairments)
- [Physical and Motor Disabilities](#physical-and-motor-disabilities)
- [Cognitive, Learning, and Neurological Disabilities](#cognitive-learning-and-neurological-disabilities)
- [Speech Disabilities](#speech-disabilities)
- [Technical Issues](#technical-issues)
- [Changing Abilities](#changing-abilities)
- [Temporary Disabilities](#temporary-disabilities)

#### Visual Disabilities

- **manifestations**
  - blindness
  - low vision
  - color blindness
- **impact on web usage/design**
  - enlarged/reduced text size
  - custom fonts, colors, and spacing
  - text-to-speech
  - audio descriptions for video
  - keyboard navigation
  - refreshable braille
  - structure/semantics are important
  - design/color perceived differently
  - custom settings should work
- **common barriers**
  - missing text alternatives _(i.e. no `alt` text on `img` tags)_
  - improper labels
  - missing orientation cues
  - missing captions or transcripts
  - improper document structure
  - inconsistent navigation/functionality
  - lack of support for custom colors
  - lack of keyboard support

#### Auditory Impairments

- **manifestations**
  - deafness
  - hard-of-hearing
- **impact on web usage/design**
  - need visual descriptions
  - need transcripts
  - no background noise
- **common barriers**
  - missing captions
  - captions not adjustable _(font size and color)_
  - too much background noise _(low quality audio)_
  - missing transcripts
  - trouble with voice interactions

#### Physical and Motor Disabilities

- **manifestations**
  - lack of motor control
  - speech troubles
  - limitations of muscle control
  - paralysis
  - limitations of sensation
  - joint disorders
  - chronic pain
  - other issues
  - some examples include:
    - Amputation
    - Arthritis
    - Fibromyalgia
    - Reduced dexterity
    - Muscular dystrophy
    - Repetitive stress injury
    - Tremor or spasms
    - Paralysis
- **impact on web usage**
  - special keyboard or mouse
  - head pointer or mouth stick
  - foot, shoulder, sip-and-puff switches
  - voice recognition and eye tracking
  - mouse-like or keyboard-like devices
  - require more time
  - trouble clicking small areas
- **impact on web design**
  - provide large clickable areas
  - provide more time
  - provide error correction options
  - provide clear focus indication
  - provide skip navigation links
- **common barriers**
  - missing keyboard support
  - not enough time to complete tasks
  - missing text alternatives
  - missing or improper labels
  - missing orientation cues
  - improper document structure
  - inconsistent navigation/functionality

#### Cognitive, Learning, and Neurological Disabilities

- **manifestations**
  - learning disabilities
  - distractibility
  - inability to remember or focus
  - range of movement
  - vision
  - hearing
  - comprehension
  - other psychiatric disabilities
  - some examples include:
    - ADHD
    - Autism
    - Intellectual disabilities like Down Syndrome
    - Mental health disabilities like anxiety, delirium, depression, and schizophrenia
    - Memory impairments like dementia
    - Diseases like multiple sclerosis
    - Perceptual disabilities like dyslexia
    - Seizure disabilities like epilepsy or migraines
- **impact on web usage/design**
  - structure/semantics are important
  - need consistent labelling
  - need predictable functionality
  - need different methods of navigation
  - need simpler text with images
  - may use text-to-speech
- **common barriers**
  - complex navigation and layouts
  - complex/unusual wording
  - large amounts of text without images
  - moving or flashing content
  - audio that can't be turned off
  - no method to disable motion/animation

#### Speech Disabilities

- **manifestations**
  - apraxia of speech
  - cluttering
  - dysarthria
  - speech sound disorders
  - stuttering
  - muteness
- **impact on web usage/design**
  - issues with voice-based services
  - troubles producing speech that's recognizable by software
  - issues with telephone only communications
- **common barriers**
  - voice-only interaction
  - phone as only communication

#### Technical Issues

- **manifestations**
  - slow connection, screen size, old technology
- **impact on web usage/design**
  - TBD
- **common barriers**
  - TBD

#### Changing Abilities

- **manifestations**
  - effects of aging
- **impact on web usage/design**
  - TBD
- **common barriers**
  - TBD

#### Temporary Disabilities

- **manifestations**
  - broken bones, recovery
- **impact on web usage/design**
  - TBD
- **common barriers**
  - TBD

---

## Simulating Disabilities for Testing

### Testing with Keyboard

- tab through in proper order?
- appropriate visual feedback to know where we are focused?
- do form controls and links work as expected?

### Test with a Screen Reader

- [JAWS](https://www.freedomscientific.com/products/software/jaws/)
- [NVDA](https://www.nvaccess.org/)

### Test with a Simulator

- [Web Disability Simulator](https://chromewebstore.google.com/detail/web-disability-simulator/olioanlbgbpmdlgjnnampnnlohigkjla?hl=en) _(Chrome extension)_

---

## Understanding WCAG Guidelines and Developing Testing Strategy

### Planning

1. Identity Goals
2. Put someone in charge of accessibility for project _(to keep everyone on track)_
3. Evaluate Tools and Frameworks
  - _if they're not accessible, we shouldn't use them!_
4. Do some research about current tools and best practices regarding accessibility
5. Create Personas with different types of disabilities
  - we can refer to throughout design and development process
  - commonality for discussion
  - create empathy

### WCAG

- created by the [W3C](https://www.w3.org/) _(World Wide Web Consortium)_
- single set of accessibility guidelines
- contain "success criteria" and "levels of conformance"
- ensure content is accessible to as many people as possible

#### [WCAG 2.0](https://www.w3.org/TR/WCAG20/)

- [overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.0)
- published **December 2008**
- 12 guidelines organized into 4 principle categories: **P.O.U.R.**
- **P**erceivable
  - cannot be invisible to all their senses
- **O**perable
  - must be able to operate all UI controls
  - cannot require interaction that can't be performed
- **U**nderstandable
  - must be able to understand information and UI
- **R**obust
  - should not be fragile
  - should work in a variety of user agents and assistive technologies
  - should be as future proof as possible

#### [WCAG 2.1](https://www.w3.org/TR/WCAG21/)

- [Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1)
- published **June 2018**
- extends WCAG 2.0
- now official W3C recommendation
- additions focused 3 specific groups
  - cognitive or learning disabilities
  - low vision
  - disabilities on mobile devices

### Testing WCAG Compliance with WAVE

- [WAVE web accessibility evaluation tool](https://wave.webaim.org/)
- **NOTE**: 0 errors != accessible!

### Automated Accessibility Testing with AXE Core

- [axe-core](https://github.com/dequelabs/axe-core)
  - developed by [Deque Labs](https://github.com/dequelabs)

---

## Designing with Accessibility in Mind

- pick color palettes that are color-blind-friendly
- don't rely solely on color to convey information
- accessible touch targets are usually recommended to be **at least a square of 44px-48px**
- make sure icons
  - are simple and recognizable
  - have text to make intention clear
- related to motion
  - transitions, animations, blinking/strobing, parallax effects
  - common things that can cause seizures:
    - flashing 3 times per second
    - high contrast strobing effects
    - flashing including red
  - **NOTE**: a flashing cursor will _not_ trigger a seizure
  - may be helpful to have a way for users to disable animations entirely
- typography
  - healthy body copy font size is 16px-20px
  - optimal line length between 45 and 75 characters, with 66 being ideal
  - for line height, good rule of thumb is ~150% of X height, easily achieved by setting line height to 125% of text size
  - avoid justifying text
  - text in all caps can be problematic
    - can be hard for people to read
    - may be misread by screen readers

---

## Developing Accessible Navigation and Content

### Headings

- should only have 1 occurrence of `h1`
- should be sure not to skip levels
```html
<!-- BAD -->
<h1>Main Title</h1>
<p>This is the main description.</p>
<h2>Secondary Title</h2>
<p>This is the secondary description.</p>
<h4>Nested Title</h4>
<p>...</p>
<h2>Another Secondary Title</h2>
<p>...</p>


<!-- GOOD -->
<h1>Main Title</h1>
<p>This is the main description.</p>
<h2>Secondary Title</h2>
<p>This is the secondary description.</p>
<h3>Nested Title</h3>
<p>...</p>
<h2>Another Secondary Title</h2>
<p>...</p>
```

### Lists

#### Unordered List

Use when no order of sequence or importance is needed

```html
<ul>
    <li>Milk</li>
    <li>Bread</li>
    <li>Lettuce</li>
</ul>
```

#### Ordered List

Use when order of sequence or importance _**is**_ needed

```html
<ol>
    <li>First, do this</li>
    <li>Next, do that</li>
    <li>Lastly, do the other thing</li>
</ol>
```

#### Description List

Use when description for each item is needed or for key/value pairs

```html
<dl>
    <dt>Milk</dt>
    <dd>Fat free organic</dd>
    <dt>Bread</dt>
    <dd>Whole wheat sourdough</dd>
</dl>
```

### Accessible Keyboard Control

- **focus and active indicators**
  - browsers add them by default
  - sometimes may be removed by developers _(unintentionally or otherwise)_
  - inaccessible without them
- **tab order**
  - logical and easy to follow pattern
  - follow visual flow of information
  - left to right/right to left _(depending on language)_
  - top to bottom
  - controlled by document structure
- **non-navigable items**
  - `div`s or `span`s as buttons become completely inaccessible
- **skip to content link**
  - need to allow skipping of long navigation lists
  - tabbing steps through each link and control
  - should allow users to skip large chunks of navigation
    - easy way to implement is add a link before these lists with text such as "Skip to main content" with an `href` that has the `id` of the HTML element to skip to
    - if you don't like the visual aesthetics of it, you can use CSS to make it visible only when it's focused

### CSS Cascade Overview

Applied in order:
1. default browser styles
2. external CSS
3. style sheets embedded in page
4. inline styles
5. end user custom configuration settings

**End user is ultimately in control** so we should build with flexibility in mind
- use scalable values _(`em`, `rem`, `%`, etc.)_
- don't rely on CSS alone to convey meaning
- use proper, semantic HTML whenever possible

### Visually Hiding Elements Only For Assistive Technologies

```css
/* BAD */
.hidden {
    display: none;
    height: 0;
    visibility: hidden;
    width: 0;
}

.hidden {
    text-indent: -9999px;
}


/* GOOD */
.hidden {
    height: 1px;
    left: -9999px;
    position: absolute;
    overflow: hidden;
    top: auto;
    width: 1px;
}

/* MAYBE BETTER? */
.hidden {
    clip: 1px, 1px, 1px, 1px;
    position: absolute;
}
```

### Links

- if possible, use more descriptive text _(instead of "read more", something like "read more of the 1st post")_
- if it's visually important to just have generic text in a link, can use CSS
```html
<style>
a::after {
    content: "Read More";
}
</style>

<a href="blog-post-01.html">
    Read More of the 1st Post
</a>
```
