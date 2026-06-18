export type Question = {
  id: string;
  text: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type Mission = {
  id: string;
  title: string;
  questions: Question[];
};

export type World = {
  id: number;
  name: string;
  theme: string;
  icon: string;
  color: string;
  missions: Mission[];
};

export const WORLDS: World[] = [
  {
    id: 1,
    name: "Crystal Forest",
    theme: "AI images vs human images",
    icon: "🌲",
    color: "bg-emerald-500",
    missions: [
      {
        id: "w1-m1",
        title: "The Seeing Crystal",
        questions: [
          {
            id: "w1-m1-q1",
            text: "An image shows a sunset where the shadows go the wrong direction and the sun's reflection appears on dry land. What does this tell you?",
            options: ["It was taken at a weird angle", "It might be AI-generated", "The photographer edited it", "It's from a sci-fi film"],
            answer: "It might be AI-generated",
            explanation: "AI image generators often struggle with physics — like shadows and light reflections! Real photographers can't control the laws of nature."
          },
          {
            id: "w1-m1-q2",
            text: "You see a photo of a dog with 6 legs standing in a perfectly symmetrical garden. What's most likely?",
            options: ["A rare genetic mutation", "An AI generated this image", "It was Photoshopped by a human", "It's a toy dog"],
            answer: "An AI generated this image",
            explanation: "AI often creates extra limbs or perfect symmetry that doesn't exist in nature. These are called 'artifacts'."
          },
          {
            id: "w1-m1-q3",
            text: "Which clue is MOST suspicious in a photo?",
            options: ["Slightly blurry background", "Text in the image that says 'AIdibble'", "A colorful sunset", "Someone smiling"],
            answer: "Text in the image that says 'AIdibble'",
            explanation: "AI image generators often create fake or nonsensical text in images. Always check text in photos!"
          }
        ]
      },
      {
        id: "w1-m2",
        title: "The Detail Detective",
        questions: [
          {
            id: "w1-m2-q1",
            text: "A portrait photo shows a person with perfectly symmetrical features and no skin pores visible. What should you think?",
            options: ["They use great skincare", "This could be AI-generated", "It's a professional model", "The camera was really good"],
            answer: "This could be AI-generated",
            explanation: "Real human faces are naturally asymmetrical. AI faces are often too perfect."
          },
          {
            id: "w1-m2-q2",
            text: "You look at two pictures of a forest. One has leaves that all look slightly different. The other has leaves that repeat in exact patterns. Which is more likely AI?",
            options: ["The one with different leaves", "The one with repeating leaf patterns", "Both are AI", "Neither is AI"],
            answer: "The one with repeating leaf patterns",
            explanation: "Nature is wonderfully random! AI sometimes struggles to create true randomness."
          },
          {
            id: "w1-m2-q3",
            text: "What should you do if you're not sure if an image is real or AI?",
            options: ["Share it immediately", "Look for clues like extra fingers or wrong text", "Assume it's real", "Delete it"],
            answer: "Look for clues like extra fingers or wrong text",
            explanation: "Being a careful detective helps you stay smart online. Look for unnatural details!"
          }
        ]
      },
      {
        id: "w1-m3",
        title: "Crystal Guardian",
        questions: [
          {
            id: "w1-m3-q1",
            text: "An AI generated image of a hand shows 7 fingers. Why does this happen?",
            options: ["Some people have 7 fingers", "AI doesn't understand human anatomy perfectly", "The artist drew extra fingers on purpose", "It's a special effect"],
            answer: "AI doesn't understand human anatomy perfectly",
            explanation: "AI learns from patterns in data, but human hands have complex anatomy that AI models still find tricky!"
          },
          {
            id: "w1-m3-q2",
            text: "You find an image of a famous person doing something shocking. What's your FIRST step?",
            options: ["Share it with friends", "Check if other trusted sources show the same event", "Assume it's real because it looks realistic", "Report it immediately"],
            answer: "Check if other trusted sources show the same event",
            explanation: "Always verify! Real events are usually reported by multiple sources."
          },
          {
            id: "w1-m3-q3",
            text: "Which skill helps you spot AI images?",
            options: ["Memorizing all AI tools", "Noticing unnatural details like wrong shadows or extra fingers", "Only trusting images from friends", "Avoiding all images online"],
            answer: "Noticing unnatural details like wrong shadows or extra fingers",
            explanation: "You've earned the Crystal of Vision! You know how to look deeper than the surface."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Echo Library",
    theme: "AI text vs human text",
    icon: "📚",
    color: "bg-blue-500",
    missions: [
      {
        id: "w2-m1",
        title: "The Word Wizard",
        questions: [
          {
            id: "w2-m1-q1",
            text: "You read a paragraph that uses perfect grammar but feels oddly formal, repeats ideas slightly, and doesn't have a personal opinion. What might this be?",
            options: ["A news article", "AI-generated text", "A student essay", "A poem"],
            answer: "AI-generated text",
            explanation: "AI text is often grammatically perfect but can feel repetitive and impersonal."
          },
          {
            id: "w2-m1-q2",
            text: "An AI was asked to write about a personal memory. What would it most likely produce?",
            options: ["A deeply emotional story from its childhood", "A generic story that sounds personal but isn't", "It would refuse to write", "An exact copy of someone else's story"],
            answer: "A generic story that sounds personal but isn't",
            explanation: "AI doesn't have real memories! It creates text that sounds personal based on patterns it learned."
          },
          {
            id: "w2-m1-q3",
            text: "Which phrase is a clue that text might be AI-generated?",
            options: ["I think...", "In my personal experience...", "Certainly! Here is a comprehensive overview of...", "This made me feel sad because..."],
            answer: "Certainly! Here is a comprehensive overview of...",
            explanation: "AI assistants often start responses with formal phrases like 'Certainly!' or 'Of course!'"
          }
        ]
      },
      {
        id: "w2-m2",
        title: "The Story Seeker",
        questions: [
          {
            id: "w2-m2-q1",
            text: "You get an email that sounds perfectly polite and professional, has no grammar mistakes, but asks you to click a suspicious link. What should you do?",
            options: ["Click the link since it has no errors", "Be suspicious — AI can write perfect scam emails", "Reply asking for more information", "Forward it to friends"],
            answer: "Be suspicious — AI can write perfect scam emails",
            explanation: "AI can now write very convincing emails. Perfect grammar doesn't mean it's safe!"
          },
          {
            id: "w2-m2-q2",
            text: "A review says 'This product exceeded my expectations in every possible way and I would highly recommend it to anyone.' What's suspicious?",
            options: ["It recommends the product", "It's very vague and could apply to almost anything", "It has good grammar", "It's long"],
            answer: "It's very vague and could apply to almost anything",
            explanation: "Fake AI reviews are often very generic. Real reviews usually mention specific details!"
          },
          {
            id: "w2-m2-q3",
            text: "A classmate submits an essay with perfect vocabulary but no clear argument or personal voice. What might have happened?",
            options: ["They studied really hard", "They might have used AI to write it", "Their parents helped them", "They copied from a book"],
            answer: "They might have used AI to write it",
            explanation: "AI text is often polished but lacks a unique human voice or original thinking."
          }
        ]
      },
      {
        id: "w2-m3",
        title: "Language Crystal",
        questions: [
          {
            id: "w2-m3-q1",
            text: "What is one key difference between AI-generated text and human writing?",
            options: ["AI makes more spelling errors", "Human writing often includes personal experiences and emotions", "AI always writes longer texts", "Human writing never uses complex words"],
            answer: "Human writing often includes personal experiences and emotions",
            explanation: "Humans write from lived experience. AI generates text from patterns — it can't truly feel or remember."
          },
          {
            id: "w2-m3-q2",
            text: "An AI wrote a poem about rain. A human also wrote a poem about rain. The AI poem is more technically correct. Which is more meaningful?",
            options: ["The AI poem because it's correct", "The human poem because it comes from real experience", "Both are equally meaningful", "Neither is meaningful"],
            answer: "The human poem because it comes from real experience",
            explanation: "Technical perfection isn't everything! Human creativity comes from real life experiences and emotions."
          },
          {
            id: "w2-m3-q3",
            text: "Why should you credit human authors when sharing their work?",
            options: ["Because AI told you to", "Because human creative work deserves recognition and respect", "Because it's the law always", "Because it makes you look smart"],
            answer: "Because human creative work deserves recognition and respect",
            explanation: "You've earned the Crystal of Language! Human creativity and AI are different — both have value, but human work deserves credit."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Truth Observatory",
    theme: "facts vs hallucinations",
    icon: "🔭",
    color: "bg-purple-500",
    missions: [
      {
        id: "w3-m1",
        title: "Star Fact Finder",
        questions: [
          {
            id: "w3-m1-q1",
            text: "You ask an AI assistant 'Who won the 2045 World Cup?' and it gives you a confident answer. What's most likely true?",
            options: ["The AI watched the game", "The AI made up an answer — it can't know future events", "The AI accessed live sports data", "The AI guessed correctly"],
            answer: "The AI made up an answer — it can't know future events",
            explanation: "AI models have a knowledge cutoff date and cannot access real-time information unless given special tools."
          },
          {
            id: "w3-m1-q2",
            text: "An AI chatbot tells you with confidence that a historical event happened on the wrong date. This is called:",
            options: ["A typo", "An AI hallucination", "A secret", "A glitch"],
            answer: "An AI hallucination",
            explanation: "When AI confidently states wrong information, it's called a 'hallucination.' Always verify important facts!"
          },
          {
            id: "w3-m1-q3",
            text: "Which is the BEST way to check if an AI fact is true?",
            options: ["Ask the AI again", "Look it up in a trusted encyclopedia or textbook", "Assume it's right if it sounds confident", "Ask a friend"],
            answer: "Look it up in a trusted encyclopedia or textbook",
            explanation: "Always verify AI facts with reliable sources like encyclopedias, textbooks, or expert websites!"
          }
        ]
      },
      {
        id: "w3-m2",
        title: "The Telescope Trial",
        questions: [
          {
            id: "w3-m2-q1",
            text: "AI says 'Studies show that eating chocolate every day makes you smarter.' What should you do?",
            options: ["Start eating chocolate immediately", "Ask which studies and look them up", "Believe it because AI knows science", "Ignore it completely"],
            answer: "Ask which studies and look them up",
            explanation: "Real scientific claims come with sources. If AI gives you a 'fact,' ask for the evidence!"
          },
          {
            id: "w3-m2-q2",
            text: "An AI gives you information that sounds very detailed and specific. Does that mean it's correct?",
            options: ["Yes, more detail means more accuracy", "No, AI can hallucinate very detailed false information", "Only if it uses big words", "Only if it mentions sources"],
            answer: "No, AI can hallucinate very detailed false information",
            explanation: "AI can generate very convincing details that are completely false. Detail doesn't equal accuracy!"
          },
          {
            id: "w3-m2-q3",
            text: "What is a 'knowledge cutoff' in AI?",
            options: ["When AI stops generating text", "The date after which AI has no training information", "A safety feature that blocks bad content", "When AI runs out of memory"],
            answer: "The date after which AI has no training information",
            explanation: "AI models are trained on data up to a certain date. They don't automatically know about things that happened after!"
          }
        ]
      },
      {
        id: "w3-m3",
        title: "Knowledge Crystal",
        questions: [
          {
            id: "w3-m3-q1",
            text: "Your teacher asks you to research a topic. You use AI to get information. What should you do next?",
            options: ["Submit it directly — AI is always accurate", "Verify the key facts using trusted sources", "Change a few words so it seems original", "Tell the teacher you used AI and submit it"],
            answer: "Verify the key facts using trusted sources",
            explanation: "AI is a helpful starting point, but always verify important information before using it."
          },
          {
            id: "w3-m3-q2",
            text: "Why do AI systems sometimes generate false information?",
            options: ["They want to trick people", "They predict plausible text based on patterns, not truth", "They're connected to false websites", "Their creators program them to lie"],
            answer: "They predict plausible text based on patterns, not truth",
            explanation: "AI generates what sounds likely based on patterns — it doesn't 'know' facts the way humans do."
          },
          {
            id: "w3-m3-q3",
            text: "You discover an AI stated a wrong fact. What is the best response?",
            options: ["Stop using AI forever", "Use it as a reminder to always verify AI information", "Report the AI to the police", "Pretend you knew it was wrong"],
            answer: "Use it as a reminder to always verify AI information",
            explanation: "You've earned the Crystal of Knowledge! Critical thinking is your superpower."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Future City",
    theme: "responsible AI use",
    icon: "🏙️",
    color: "bg-indigo-500",
    missions: [
      {
        id: "w4-m1",
        title: "City Builder",
        questions: [
          {
            id: "w4-m1-q1",
            text: "You use AI to help write a story. Is this okay?",
            options: ["No, using AI is always cheating", "Yes, if you add your own ideas and creativity too", "Yes, just submit whatever AI writes", "No, only adults can use AI"],
            answer: "Yes, if you add your own ideas and creativity too",
            explanation: "AI is a tool! Using it to help you brainstorm and then adding your own creativity is totally fine."
          },
          {
            id: "w4-m1-q2",
            text: "AI art tools can create images of real people doing things they never did. Why is this a problem?",
            options: ["It's not a problem at all", "It can spread false information and harm reputations", "It only matters for famous people", "It's only a problem if the images are bad quality"],
            answer: "It can spread false information and harm reputations",
            explanation: "Creating fake images of real people can seriously harm them. This is why responsible AI use matters!"
          },
          {
            id: "w4-m1-q3",
            text: "A friend wants to use AI to write mean messages to another student and say it wasn't them. What should you do?",
            options: ["Help them use AI better", "Explain why this is wrong and refuse to help", "Tell them to be more careful", "Only help if you don't get caught"],
            answer: "Explain why this is wrong and refuse to help",
            explanation: "Using AI to hurt others is still your responsibility. Technology doesn't remove your choices."
          }
        ]
      },
      {
        id: "w4-m2",
        title: "Future Architect",
        questions: [
          {
            id: "w4-m2-q1",
            text: "AI systems learn from data created by humans. If that data contains biases, what happens?",
            options: ["The AI fixes the biases automatically", "The AI might learn and repeat those biases", "The data becomes correct over time", "Only scientists care about this"],
            answer: "The AI might learn and repeat those biases",
            explanation: "AI reflects the data it's trained on — including human biases. This is why diverse and fair data matters!"
          },
          {
            id: "w4-m2-q2",
            text: "A hospital uses AI to help diagnose diseases. What is the most responsible approach?",
            options: ["Trust the AI completely — it's more accurate than humans", "Use AI as a tool to assist doctors who make the final decision", "Never use AI in hospitals", "Only use AI for simple diseases"],
            answer: "Use AI as a tool to assist doctors who make the final decision",
            explanation: "For important decisions, AI should assist humans — not replace human judgment."
          },
          {
            id: "w4-m2-q3",
            text: "What does 'AI transparency' mean?",
            options: ["AI that is see-through", "Understanding how and why an AI makes its decisions", "AI that shares all its data publicly", "Making AI systems smaller"],
            answer: "Understanding how and why an AI makes its decisions",
            explanation: "Transparency helps us trust AI systems and catch mistakes. We should understand how AI makes decisions."
          }
        ]
      },
      {
        id: "w4-m3",
        title: "Crystal of Wisdom",
        questions: [
          {
            id: "w4-m3-q1",
            text: "You find a very clever AI tool that can do your homework perfectly. What's the wisest choice?",
            options: ["Use it for all homework every day", "Use it sometimes to help you understand, but do your own learning", "Share it with everyone immediately", "Keep it secret and use it for tests"],
            answer: "Use it sometimes to help you understand, but do your own learning",
            explanation: "AI is a tool for learning, not a replacement for it. The knowledge you build is yours forever!"
          },
          {
            id: "w4-m3-q2",
            text: "In the future, which skill will be most valuable alongside AI?",
            options: ["Typing very fast", "Critical thinking and knowing when to trust AI", "Memorizing lots of facts", "Being able to code any program"],
            answer: "Critical thinking and knowing when to trust AI",
            explanation: "As AI gets better at tasks, humans who can think critically and work alongside AI will be most valuable."
          },
          {
            id: "w4-m3-q3",
            text: "What is the most important thing you learned in PIXORA?",
            options: ["AI is dangerous and should be avoided", "AI is a powerful tool that needs thoughtful, responsible users like you", "Only scientists should use AI", "AI will solve all of our problems automatically"],
            answer: "AI is a powerful tool that needs thoughtful, responsible users like you",
            explanation: "Congratulations! You've restored all Crystal Memories and become a PIXORA Champion! The world needs thoughtful humans to guide AI."
          }
        ]
      }
    ]
  }
];
