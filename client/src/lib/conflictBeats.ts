// conflictBeats.ts
export type Beats = {
  plotA: string[];
  subPlotB: string[];
  subPlotC: string[];
  twists: string[];
  hooks: string[];
};

// Short, prompt-style bullets for each conflict type
export const CONFLICT_BEATS: Record<string, Beats> = {
  "[Wo]Man vs. [Wo]Man": {
    plotA: [
      "Rival's goal directly opposes the protagonist—stakes escalate with each move.",
      "A public loss forces a risky counterstrategy.",
      "Final confrontation tests both skill and ethics."
    ],
    subPlotB: [
      "Trust fractures between allies; betrayal tempts the weaker link.",
      "A relationship becomes leverage for the rival."
    ],
    subPlotC: [
      "Workplace/community rules restrict options.",
      "Law and reputation pressure both sides."
    ],
    twists: [
      "A hidden motive reframes the rival's actions.",
      "A 'win' exposes the protagonist's own blind spot."
    ],
    hooks: [
      "How far would you go to beat someone just like you?",
      "Victory costs something you can't get back."
    ]
  },
  "[Wo]Man vs. Nature": {
    plotA: [
      "Survival demands ingenuity under indifferent conditions.",
      "A resource miscalculation raises the cost of every choice.",
      "A narrow window for rescue forces a dangerous route."
    ],
    subPlotB: [
      "Cooperation vs. self‑preservation splits the group.",
      "Hope and despair trade places after a setback."
    ],
    subPlotC: [
      "Terrain/weather behave unpredictably; small mistakes snowball.",
      "Logistics (food, heat, time) become antagonists."
    ],
    twists: [
      "The 'safe' shelter becomes a trap.",
      "Nature removes a key advantage at the worst moment."
    ],
    hooks: [
      "The land doesn't hate you—it doesn't care.",
      "Earn every breath."
    ]
  },
  "[Wo]Man vs. Environment": {
    plotA: [
      "Systemic pressures force adaptation or extinction.",
      "A breaking point demands radical action despite consequences.",
      "The environment's 'rules' shift mid-story, invalidating old strategies."
    ],
    subPlotB: [
      "Personal relationships strain under environmental stress.",
      "Old loyalties conflict with survival needs."
    ],
    subPlotC: [
      "Infrastructure failures cascade into larger crises.",
      "Resource scarcity creates new hierarchies of power."
    ],
    twists: [
      "The environment was shaped by past human choices.",
      "Adaptation changes the protagonist in unexpected ways."
    ],
    hooks: [
      "What you built to protect you becomes your prison.",
      "Adaptation costs identity."
    ]
  },
  "[Wo]Man vs. Technology": {
    plotA: [
      "Technological dependence reveals fatal vulnerabilities.",
      "A system malfunction forces manual intervention beyond training.",
      "The technology 'evolves' beyond its original programming."
    ],
    subPlotB: [
      "Digital relationships replace human connections with consequences.",
      "Privacy erosion changes intimate dynamics."
    ],
    subPlotC: [
      "Economic systems dependent on automation face disruption.",
      "Generational gaps in tech literacy create conflict."
    ],
    twists: [
      "The protagonist contributed to the technological problem unknowingly.",
      "The 'solution' requires embracing what was feared."
    ],
    hooks: [
      "Your convenience becomes your cage.",
      "The tools reshape the user."
    ]
  },
  "[Wo]Man vs. Supernatural": {
    plotA: [
      "Supernatural rules operate by alien logic that punishes assumption.",
      "A bargain or curse escalates beyond the protagonist's control.",
      "The supernatural force demands a sacrifice that defines character."
    ],
    subPlotB: [
      "Belief and skepticism divide allies when evidence is ambiguous.",
      "Faith traditions conflict with supernatural reality."
    ],
    subPlotC: [
      "Normal institutions fail to address supernatural problems.",
      "Hidden histories reveal supernatural precedents."
    ],
    twists: [
      "The protagonist has supernatural heritage or connection.",
      "The 'solution' requires becoming what was opposed."
    ],
    hooks: [
      "Some doors should never be opened.",
      "Power demands transformation."
    ]
  },
  "[Wo]Man vs. Self": {
    plotA: [
      "Internal contradiction prevents action when stakes are highest.",
      "A pattern of self-sabotage escalates until consequences are unavoidable.",
      "Confronting the inner truth requires external action that terrifies."
    ],
    subPlotB: [
      "Relationships mirror internal conflict, creating external drama.",
      "Support systems enable or challenge destructive patterns."
    ],
    subPlotC: [
      "Professional/social obligations conflict with personal growth needs.",
      "Past trauma influences present choices in hidden ways."
    ],
    twists: [
      "The external obstacle was always internal resistance.",
      "Strength comes from accepting perceived weakness."
    ],
    hooks: [
      "Your greatest enemy knows all your moves.",
      "Freedom requires facing what you've been running from."
    ]
  },
  "[Wo]Man vs. God/Religion": {
    plotA: [
      "Divine command conflicts with human morality or logic.",
      "Faith is tested by suffering that challenges core beliefs.",
      "Religious duty demands sacrifice that questions worthiness."
    ],
    subPlotB: [
      "Community faith conflicts with individual spiritual experience.",
      "Interfaith or secular relationships challenge doctrinal purity."
    ],
    subPlotC: [
      "Religious institutions fail to embody proclaimed values.",
      "Secular world pressures compromise religious practice."
    ],
    twists: [
      "The protagonist misunderstood divine will or religious teaching.",
      "Doubt strengthens rather than weakens true faith."
    ],
    hooks: [
      "What do you do when heaven feels like hell?",
      "Faith costs everything, including certainty."
    ]
  },
  "[Wo]Man vs. Society": {
    plotA: [
      "Social norms or laws prevent necessary action, forcing difficult choices.",
      "Challenging the system triggers escalating retaliation.",
      "Revolutionary action demands sacrificing personal relationships."
    ],
    subPlotB: [
      "Family loyalties conflict with social justice principles.",
      "Insider knowledge creates moral dilemmas about exposure."
    ],
    subPlotC: [
      "Economic pressures limit options for systemic change.",
      "Media narratives shape public perception of the conflict."
    ],
    twists: [
      "The protagonist discovers complicity in the system they oppose.",
      "Victory requires working within the system they sought to destroy."
    ],
    hooks: [
      "Change the world or become part of the problem.",
      "Revolution begins with a single person saying 'no'."
    ]
  }
};