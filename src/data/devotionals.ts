export interface Devotional {
  id: string;
  weekNumber: number;
  title: string;
  scripture: {
    text: string;
    reference: string;
  };
  devotionalContent: string;
  ponderQuestions: string[];
  practiceItems: string[];
  prayer: string;
  imageUrl: string;
  monthNumber: number;
  isRead?: boolean;
  isReflected?: boolean;
  isBookmarked?: boolean;
}

export const devotionals: Devotional[] = [
  {
    id: "1",
    weekNumber: 1,
    title: "Communication",
    scripture: {
      text: "Let your speech always be gracious, seasoned with salt, so that you may know how you ought to answer each person.",
      reference: "Colossians 4:6"
    },
    devotionalContent: "Communication is the foundation of every strong marriage. It's not just about talking—it's about truly listening, understanding, and connecting heart to heart. In the busyness of life, we often forget to pause and genuinely hear our partner.\n\nGracious speech means speaking with kindness, even when we disagree. It means choosing our words carefully and considering how they will land on our spouse's heart. Salt preserves and adds flavor—our words should preserve our relationship and add joy to our partner's day.\n\nThis week, focus on the quality of your communication. Are you truly present when your spouse speaks? Do you listen to understand, or just to respond? Take time each day to have intentional conversations where you set aside distractions and focus solely on each other.",
    ponderQuestions: [
      "When was the last time you felt truly heard by your spouse?",
      "What topics do you find difficult to discuss, and why?",
      "How can you create more space for meaningful conversations?"
    ],
    practiceItems: [
      "Set aside 15 minutes each day this week for uninterrupted conversation",
      "Practice active listening: repeat back what your spouse says before responding",
      "Share one appreciation and one need with your partner each day"
    ],
    prayer: "Lord, help us to communicate with grace and love. Give us ears to truly hear one another and words that build up rather than tear down. May our conversations draw us closer to each other and to You. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
    monthNumber: 1
  },
  {
    id: "2",
    weekNumber: 2,
    title: "Dreaming Together",
    scripture: {
      text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
      reference: "Jeremiah 29:11"
    },
    devotionalContent: "Marriage is a beautiful journey of two people becoming one, and part of that unity is dreaming together. When we share our hopes, aspirations, and visions for the future, we invite our spouse into the deepest parts of our hearts.\n\nDreaming together doesn't mean you have to agree on everything. It means creating a safe space where both partners can express their desires without judgment. Some dreams will be shared, others will be unique to each person—and that's perfectly okay.\n\nGod has plans for your marriage that are bigger than either of you could imagine alone. When you dream together, you align yourselves with His purposes and open the door for amazing possibilities.",
    ponderQuestions: [
      "What dreams have you been hesitant to share with your spouse?",
      "How do your individual dreams complement each other?",
      "What is one dream you could pursue together this year?"
    ],
    practiceItems: [
      "Schedule a 'dream date' to discuss your hopes for the next 5 years",
      "Create a shared vision board (physical or digital)",
      "Write down three dreams and share them with your spouse"
    ],
    prayer: "Father, thank You for the dreams You've placed in our hearts. Help us to dream together boldly and trust in Your plans for our future. Unite our visions and guide our steps. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
    monthNumber: 1
  },
  {
    id: "3",
    weekNumber: 3,
    title: "Setting Goals",
    scripture: {
      text: "Commit your work to the Lord, and your plans will be established.",
      reference: "Proverbs 16:3"
    },
    devotionalContent: "Dreams without goals are just wishes. This week, we take our shared dreams and begin turning them into actionable steps. Goal-setting in marriage is a powerful way to build unity and work toward a common purpose.\n\nEffective goals are specific, measurable, and achievable. They should stretch you but not break you. Most importantly, they should be bathed in prayer and committed to the Lord.\n\nRemember that the journey toward your goals is just as important as reaching them. The process of working together, overcoming obstacles, and celebrating small wins strengthens your marriage bond.",
    ponderQuestions: [
      "What goals have you set together in the past? What worked and what didn't?",
      "How do you handle it when one partner is more motivated than the other?",
      "What's one goal you could achieve together in the next 30 days?"
    ],
    practiceItems: [
      "Write down 3 goals together: one spiritual, one relational, one practical",
      "Break each goal into weekly action steps",
      "Set a weekly check-in time to review your progress"
    ],
    prayer: "Lord, we commit our goals and plans to You. Help us work together in unity, encourage each other through challenges, and celebrate together in victories. May our goals honor You. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=800&h=600&fit=crop",
    monthNumber: 1
  },
  {
    id: "4",
    weekNumber: 4,
    title: "Intimacy",
    scripture: {
      text: "Therefore a man shall leave his father and mother and hold fast to his wife, and the two shall become one flesh.",
      reference: "Ephesians 5:31"
    },
    devotionalContent: "Intimacy in marriage goes far beyond the physical. It encompasses emotional, spiritual, and intellectual connection. True intimacy is about being fully known and fully loved—vulnerabilities and all.\n\nBuilding intimacy requires intentionality. It means creating safe spaces for vulnerability, prioritizing time together, and continually pursuing each other even after years of marriage.\n\nPhysical intimacy is a beautiful gift from God, designed to bond husband and wife together. But it flourishes best when emotional and spiritual intimacy are also nurtured.",
    ponderQuestions: [
      "In what areas do you feel most connected to your spouse? Least connected?",
      "What barriers to intimacy exist in your marriage right now?",
      "How can you create more moments of connection this week?"
    ],
    practiceItems: [
      "Share one vulnerability you've never shared before",
      "Plan a date night focused on reconnecting emotionally",
      "Pray together before bed each night this week"
    ],
    prayer: "Heavenly Father, draw us closer together in every way. Help us to be vulnerable, to trust deeply, and to love fully. May our intimacy reflect Your love for the church. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&h=600&fit=crop",
    monthNumber: 1
  },
  {
    id: "5",
    weekNumber: 5,
    title: "Kindness",
    scripture: {
      text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
      reference: "Ephesians 4:32"
    },
    devotionalContent: "Kindness is the oil that keeps the gears of marriage running smoothly. It's in the small gestures—a warm greeting, a thoughtful text, making their coffee just the way they like it.\n\nThe fruit of the Spirit begins with love, but kindness is how love is often expressed in daily life. It costs nothing but means everything. Kindness says, 'I see you. I value you. I'm thinking of you.'\n\nIn long-term relationships, it's easy to take each other for granted. We reserve our best behavior for strangers while giving our spouse the leftovers. This week, flip that script.",
    ponderQuestions: [
      "When has your spouse's kindness touched you deeply?",
      "Are there areas where you've been unkind or dismissive?",
      "What small act of kindness could make your spouse's day?"
    ],
    practiceItems: [
      "Perform one unexpected act of kindness each day",
      "Write a kind note and hide it where your spouse will find it",
      "Respond to frustration with kindness instead of criticism"
    ],
    prayer: "Lord, fill us with Your kindness. Help us to be tender and gracious with each other, especially when it's difficult. May our home be marked by kindness. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&h=600&fit=crop",
    monthNumber: 2
  },
  {
    id: "6",
    weekNumber: 6,
    title: "Gentleness",
    scripture: {
      text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
      reference: "Proverbs 15:1"
    },
    devotionalContent: "Gentleness is strength under control. It's not weakness—it's choosing to respond with softness when you have every right to react harshly. In marriage, gentleness creates safety.\n\nWhen we respond gently to our spouse, we de-escalate conflict and open the door for understanding. A gentle tone, a soft touch, a patient response—these small choices shape the atmosphere of our home.\n\nJesus described Himself as 'gentle and humble in heart.' If the King of Kings chose gentleness, how much more should we embrace it in our marriages?",
    ponderQuestions: [
      "When do you find it hardest to be gentle?",
      "How does your spouse respond when you choose gentleness?",
      "What triggers cause you to react harshly?"
    ],
    practiceItems: [
      "Before responding in a tense moment, take three deep breaths",
      "Lower your voice instead of raising it during disagreements",
      "Use gentle touch to communicate care and connection"
    ],
    prayer: "Jesus, You are gentle and humble. Help us to reflect Your gentleness in our marriage. Give us soft hearts and controlled responses. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop",
    monthNumber: 2
  },
  {
    id: "7",
    weekNumber: 7,
    title: "Self-Control",
    scripture: {
      text: "A man without self-control is like a city broken into and left without walls.",
      reference: "Proverbs 25:28"
    },
    devotionalContent: "Self-control is the ability to regulate our emotions, thoughts, and behaviors. In marriage, it's essential for navigating conflict, managing stress, and building trust.\n\nWithout self-control, we say things we don't mean, make decisions we regret, and hurt the ones we love most. With it, we create stability and safety in our relationship.\n\nSelf-control isn't about suppressing emotions—it's about expressing them appropriately. It's choosing to pause before reacting, to think before speaking, to pray before deciding.",
    ponderQuestions: [
      "In what areas do you struggle with self-control?",
      "How has lack of self-control affected your marriage?",
      "What strategies help you maintain composure under pressure?"
    ],
    practiceItems: [
      "Identify your emotional triggers and create a plan to manage them",
      "Practice the 10-second rule: wait 10 seconds before responding when upset",
      "Confess to your spouse one area where you need more self-control"
    ],
    prayer: "Holy Spirit, produce the fruit of self-control in our lives. Help us to master our emotions rather than being mastered by them. Strengthen us where we are weak. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=600&fit=crop",
    monthNumber: 2
  },
  {
    id: "8",
    weekNumber: 8,
    title: "Peace",
    scripture: {
      text: "Blessed are the peacemakers, for they shall be called sons of God.",
      reference: "Matthew 5:9"
    },
    devotionalContent: "Peace in marriage isn't the absence of conflict—it's the presence of harmony even amid disagreement. Peacemaking is an active pursuit, not a passive state.\n\nAs children of God, we are called to be peacemakers in our homes. This means prioritizing reconciliation over being right, seeking understanding over winning arguments, and choosing unity over division.\n\nTrue peace comes from Christ, the Prince of Peace. When we invite Him into our conflicts, He brings perspective, patience, and resolution.",
    ponderQuestions: [
      "What does peace look like in your marriage?",
      "How do you typically respond to conflict?",
      "What unresolved issues are disturbing your peace?"
    ],
    practiceItems: [
      "Address one lingering conflict this week with a peacemaking mindset",
      "Create a 'peace ritual'—something you do together when tensions rise",
      "Pray for peace in your home each morning"
    ],
    prayer: "Prince of Peace, reign in our hearts and home. Help us to pursue peace actively and to resolve conflicts with grace. May Your shalom fill our marriage. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&h=600&fit=crop",
    monthNumber: 2
  },
  {
    id: "9",
    weekNumber: 9,
    title: "Patience",
    scripture: {
      text: "Love is patient and kind; love does not envy or boast; it is not arrogant.",
      reference: "1 Corinthians 13:4"
    },
    devotionalContent: "Patience is love's endurance test. It's easy to love when things are going well, but patience is revealed when your spouse is late again, leaves dishes in the sink, or forgets your anniversary.\n\nPatience acknowledges that we are all works in progress. Your spouse is growing, just like you are. Extending patience gives them room to mature without the pressure of perfection.\n\nGod is infinitely patient with us. He sees our failures and still loves us unconditionally. We are called to extend that same patience to our spouse.",
    ponderQuestions: [
      "What tests your patience most in your marriage?",
      "How does your spouse demonstrate patience with you?",
      "Where do you need to extend more patience?"
    ],
    practiceItems: [
      "When you feel impatient, pray silently before responding",
      "Thank your spouse for their patience with you",
      "Identify one area where you'll choose patience over frustration this week"
    ],
    prayer: "Patient Father, teach us to wait with grace. Help us to extend the same patience You show us every day. May our love endure through every frustration. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&h=600&fit=crop",
    monthNumber: 3
  },
  {
    id: "10",
    weekNumber: 10,
    title: "Faithfulness",
    scripture: {
      text: "Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.",
      reference: "Proverbs 3:3"
    },
    devotionalContent: "Faithfulness is the bedrock of marriage. It's the commitment to choose your spouse every single day, in every situation, regardless of feelings or circumstances.\n\nFaithfulness extends beyond physical fidelity. It includes emotional faithfulness—not sharing intimate details with others that should be reserved for your spouse. It includes financial faithfulness—being trustworthy with shared resources.\n\nGod is faithful to us, even when we are faithless. His example inspires us to be faithful in our marriages, keeping our vows and honoring our commitments.",
    ponderQuestions: [
      "What does faithfulness mean to you in practical terms?",
      "Are there areas where faithfulness has been tested?",
      "How can you demonstrate faithfulness to your spouse this week?"
    ],
    practiceItems: [
      "Reaffirm your commitment to your spouse verbally",
      "Examine your boundaries with others—are they honoring your marriage?",
      "Pray together for strength to remain faithful in all areas"
    ],
    prayer: "Faithful God, thank You for Your unwavering love. Help us to be faithful to each other in thought, word, and deed. May our marriage reflect Your covenant love. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop",
    monthNumber: 3
  },
  {
    id: "11",
    weekNumber: 11,
    title: "Goodness",
    scripture: {
      text: "And let us not grow weary of doing good, for in due season we will reap, if we do not give up.",
      reference: "Galatians 6:9"
    },
    devotionalContent: "Goodness in marriage means consistently choosing what is best for your spouse, even when it's inconvenient for you. It's a daily decision to act with integrity and love.\n\nSometimes doing good goes unnoticed or unappreciated. That's when this fruit is truly tested. Can you continue doing good even when there's no recognition or reward?\n\nGod's goodness to us is constant and undeserved. As we experience His goodness, it flows through us to our spouse. We become channels of blessing.",
    ponderQuestions: [
      "When has your spouse's goodness blessed you?",
      "Are there areas where you've grown weary of doing good?",
      "How can you renew your commitment to goodness?"
    ],
    practiceItems: [
      "Do something good for your spouse without expecting anything in return",
      "Notice and verbally appreciate your spouse's acts of goodness",
      "Discuss how you can do good together for others"
    ],
    prayer: "Good Father, Your goodness overwhelms us. Fill us with Your Spirit so that goodness flows naturally from our lives. May we never tire of blessing each other. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&h=600&fit=crop",
    monthNumber: 3
  },
  {
    id: "12",
    weekNumber: 12,
    title: "Rest & Sabbath",
    scripture: {
      text: "Come to me, all who labor and are heavy laden, and I will give you rest.",
      reference: "Matthew 11:28"
    },
    devotionalContent: "In our culture of constant busyness, rest has become a radical act. Yet God Himself rested on the seventh day, not because He was tired, but to establish a rhythm for our benefit.\n\nMarriages suffer when couples are perpetually exhausted. We become irritable, disconnected, and unable to give our best to each other. Rest isn't laziness—it's wisdom.\n\nSabbath rest is about more than sleep. It's about stopping, reflecting, and reconnecting—with God and with each other. It's a weekly reset that refreshes your soul and your relationship.",
    ponderQuestions: [
      "How well do you rest together as a couple?",
      "What prevents you from truly resting?",
      "How could a regular Sabbath practice strengthen your marriage?"
    ],
    practiceItems: [
      "Plan a 'Sabbath' this week—a day or half-day of intentional rest",
      "Discuss what rest looks like for each of you",
      "Create phone-free zones or times in your home"
    ],
    prayer: "Lord of the Sabbath, teach us to rest in You. Help us to slow down, be present, and find restoration together. May our rest glorify You. Amen.",
    imageUrl: "https://images.unsplash.com/photo-1505455184862-554165e5f6ba?w=800&h=600&fit=crop",
    monthNumber: 3
  }
];

export const emotions = [
  { id: 'happy', label: 'Happy', emoji: '😊', color: '#FFD93D' },
  { id: 'excited', label: 'Excited', emoji: '🤩', color: '#FF6B6B' },
  { id: 'loving', label: 'Loving', emoji: '🥰', color: '#FF69B4' },
  { id: 'blessed', label: 'Blessed', emoji: '🙏', color: '#4CAF50' },
  { id: 'peaceful', label: 'Peaceful', emoji: '😌', color: '#81C784' },
  { id: 'grateful', label: 'Grateful', emoji: '💕', color: '#E91E63' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: '#42A5F5' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#FFA726' },
  { id: 'stressed', label: 'Stressed', emoji: '😫', color: '#EF5350' },
  { id: 'tired', label: 'Tired', emoji: '😴', color: '#78909C' },
  { id: 'frustrated', label: 'Frustrated', emoji: '😤', color: '#FF5722' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🌟', color: '#FFB74D' },
];

export const reflectionQuestions = [
  { id: 'q1_joy', question: 'What brought you joy this week?' },
  { id: 'q2_hardship', question: 'What was something hard or painful?' },
  { id: 'q3_service', question: 'What is something I can do for you this week?' },
  { id: 'q4_serve', question: 'How can I serve you this week?' },
  { id: 'q5_thankful', question: 'What are you thankful for?' },
  { id: 'q6_dreams', question: 'What is a goal or dream on your mind?' },
  { id: 'q7_notes', question: 'Additional notes and reminders' },
];
