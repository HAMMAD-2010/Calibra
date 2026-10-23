/* Predefined fictional scenarios and answer choices.
   All content is fictional, neutral, and contains no personal details.
   Content should be reviewed by the project team before any research use. */
window.CALIBRA_SCENARIOS = [
  {
    id: "hurtful-comment",
    title: "Hurtful Comment",
    icon: "chat",
    summary: "A student receives an upsetting comment from a classmate.",
    story: "During lunch, a classmate makes a comment about another student's appearance while a few people are sitting nearby. Some of them laugh. The student does not respond at the time.",
    facts: [
      { id: "f1", text: "A classmate made a comment about the student's appearance." },
      { id: "f2", text: "The comment was made while other people were nearby." },
      { id: "f3", text: "Some people nearby laughed." },
      { id: "f4", text: "The student did not respond at the time." }
    ],
    assumptions: [
      { id: "a1", text: "The classmate meant to be cruel." },
      { id: "a2", text: "The people who laughed were laughing at the student." },
      { id: "a3", text: "The classmate says this to everyone." },
      { id: "a4", text: "Everyone who heard the comment agrees with it." }
    ],
    responses: [
      { id: "r1", text: "Take a pause and decide later how to respond.", note: "Gives time to think without any pressure to react straight away." },
      { id: "r2", text: "Respond with one calm, short sentence.", note: "Keeps the response brief and focused on what the student wants." },
      { id: "r3", text: "Talk with a trusted adult about what happened.", note: "Can help when the student wants advice or support." }
    ]
  },
  {
    id: "feeling-left-out",
    title: "Feeling Left Out",
    icon: "ban",
    summary: "A student notices that classmates have excluded them from a group activity.",
    story: "A group of classmates planned an activity for Saturday. The student was not told about the plan. Afterwards, the student saw photos from the activity shared in a group chat.",
    facts: [
      { id: "f1", text: "The student was not told about the activity." },
      { id: "f2", text: "Photos from the activity were shared in a group chat." },
      { id: "f3", text: "The student saw the photos afterwards." },
      { id: "f4", text: "The student has not spoken to the group about the plan." }
    ],
    assumptions: [
      { id: "a1", text: "The group deliberately left the student out." },
      { id: "a2", text: "Nobody in the group wants the student around." },
      { id: "a3", text: "The plan was made to hurt the student's feelings." },
      { id: "a4", text: "The student was probably not invited because of something they did." }
    ],
    responses: [
      { id: "r1", text: "Take a pause before reaching out to anyone.", note: "Allows time to check what is actually known before deciding what to do." },
      { id: "r2", text: "Ask one of the classmates a simple, friendly question.", note: "Gives the student a chance to learn more without making accusations." },
      { id: "r3", text: "Talk with a trusted adult about how the student feels.", note: "Can help the student think through options, especially if this keeps happening." }
    ]
  },
  {
    id: "setting-boundary",
    title: "Setting a Boundary",
    icon: "shield",
    summary: "A student wants to communicate that a particular behavior makes them uncomfortable.",
    story: "A classmate often borrows the student's things without asking and keeps them for several days. The student feels uncomfortable about this and wants to say something, but is unsure how.",
    facts: [
      { id: "f1", text: "The classmate has borrowed the student's things without asking." },
      { id: "f2", text: "On some occasions, the items were kept for several days." },
      { id: "f3", text: "The student has not yet said anything about it." },
      { id: "f4", text: "The student has said they feel uncomfortable about it." }
    ],
    assumptions: [
      { id: "a1", text: "The classmate knows the behavior bothers the student." },
      { id: "a2", text: "The classmate is doing this on purpose." },
      { id: "a3", text: "The classmate will get angry if the student says something." },
      { id: "a4", text: "Other classmates have the same problem." }
    ],
    responses: [
      { id: "r1", text: "Write down a clear, short statement before deciding whether to say it.", note: "Helps the student feel prepared, and the student can choose not to say it." },
      { id: "r2", text: "Say a calm, respectful statement about what the student would like.", note: "For example, naming the behavior and the request, without blaming." },
      { id: "r3", text: "Ask a trusted adult for advice before speaking to the classmate.", note: "Useful when the student is unsure or wants support first." }
    ]
  },
  {
    id: "asking-for-help",
    title: "Asking for Help",
    icon: "help",
    summary: "A student is unsure whether to speak with a trusted adult about a social situation.",
    story: "After a group conversation, a student noticed that a classmate seemed quiet and left early. The student is unsure whether it is their business, whether anything is wrong, and whether to speak with a trusted adult.",
    facts: [
      { id: "f1", text: "The student saw the classmate leave a group conversation early." },
      { id: "f2", text: "The classmate seemed quiet during the conversation." },
      { id: "f3", text: "The student does not know why the classmate left." },
      { id: "f4", text: "The student has not yet spoken with the classmate." }
    ],
    assumptions: [
      { id: "a1", text: "The classmate is upset because of the group conversation." },
      { id: "a2", text: "Something serious is happening in the classmate's life." },
      { id: "a3", text: "The classmate does not want anyone to notice." },
      { id: "a4", text: "A trusted adult would be angry if the student asked for advice." }
    ],
    responses: [
      { id: "r1", text: "Take a pause and notice how the student feels about the situation.", note: "A pause can help separate what is known from what is guessed." },
      { id: "r2", text: "Check in with the classmate in a friendly, low-pressure way.", note: "Keeps the focus on care rather than on finding out details." },
      { id: "r3", text: "Speak with a trusted adult about the situation.", note: "A good option if the student is worried, or if they are unsure what to do." }
    ]
  }
];

window.CALIBRA_NEXT_STEPS = [
  {
    id: "pause",
    title: "Pause before responding",
    icon: "pause",
    explain: "Taking time before reacting or replying. It can help separate what is known from what is assumed.",
    useful: "Useful when emotions are high, or when the student does not yet know what they want to do."
  },
  {
    id: "boundary",
    title: "Consider a respectful boundary",
    icon: "flag",
    explain: "Stating, calmly and briefly, what the student would like to happen. It focuses on the student's own request.",
    useful: "Possibly useful when it feels safe to speak up and the student wants to be clear. It is never required."
  },
  {
    id: "trusted-adult",
    title: "Speak with a trusted adult",
    icon: "users",
    explain: "Talking with a parent or guardian, a teacher, a school counselor, or another adult the student feels safe approaching.",
    useful: "Useful when the student wants advice, when the situation keeps happening, or when they feel worried or unsure."
  },
  {
    id: "school-support",
    title: "Seek help from a teacher or school counselor",
    icon: "book",
    explain: "School staff can often help with social situations between students and can explain the school's own procedures.",
    useful: "Useful when the situation involves school life, such as classes, groups, or activities at school."
  },
  {
    id: "info",
    title: "Explore reliable educational information",
    icon: "search",
    explain: "Reading trusted educational material about respectful communication, friendships, and boundaries.",
    useful: "Useful for learning new ways to think about a situation. Information found online should be checked against reliable sources."
  }
];
