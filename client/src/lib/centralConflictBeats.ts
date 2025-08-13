export type Beats = {
  plotA: string[];
  subplotB: string[];
  subplotC: string[];
  twists: string[];
  hook: string[];
};

export const CENTRAL_CONFLICT_BEATS: Record<string, Beats> = {
  "[Wo]Man vs. [Wo]Man": {
    plotA: [
      "Rival's move forces a risky escalation.",
      "A public confrontation shifts power dynamics.",
      "Ultimatum sets a ticking clock."
    ],
    subplotB: [
      "Allies question loyalty under pressure.",
      "Romance complicates tactics and timing."
    ],
    subplotC: [
      "Rumors & reputation alter who's trusted.",
      "Local customs create unexpected constraints."
    ],
    twists: [
      "Antagonist wants the same 'good' outcome.",
      "A betrayal was a protective lie."
    ],
    hook: [
      "Two equals collide; victory costs identity."
    ]
  },

  "[Wo]Man vs. Nature": {
    plotA: [
      "Weather swings force a route change.",
      "Critical supplies are lost or spoiled.",
      "Shelter becomes a trap."
    ],
    subplotB: [
      "Relationships fray under survival stress.",
      "Compassion vs. triage: who gets saved?"
    ],
    subplotC: [
      "Local terrain myths affect choices.",
      "Rescue plans clash with reality."
    ],
    twists: [
      "The safe path hides a greater threat."
    ],
    hook: [
      "Endure the world; the world doesn't care."
    ]
  },

  "[Wo]Man vs. the Environment": {
    plotA: [
      "Systems pressure force adaptation or extinction.",
      "A breaking point demands radical action despite consequences.",
      "The environment's 'rules' shift mid‑story, invalidating old strategies."
    ],
    subplotB: [
      "Personal relationships strain under environmental stress.",
      "Old loyalties conflict with survival needs."
    ],
    subplotC: [
      "Infrastructure failures cascade into larger crises.",
      "Resource scarcity creates new hierarchies of power."
    ],
    twists: [
      "The environment was shaped by past human choices.",
      "Adaptation changes the protagonist in unexpected ways."
    ],
    hook: [
      "What you built to protect you becomes your prison."
    ]
  },

  "[Wo]Man vs. Machines / Technology": {
    plotA: [
      "Tool becomes gatekeeper; access revoked.",
      "Automation makes a catastrophic choice.",
      "System exploits user's blind spot."
    ],
    subplotB: [
      "Convenience erodes consent.",
      "Old skills suddenly matter again."
    ],
    subplotC: [
      "Legacy tech reveals a manual override.",
      "A patch creates a wider vulnerability."
    ],
    twists: [
      "The 'bug' was a feature all along."
    ],
    hook: [
      "We taught the machine too well."
    ]
  },

  "[Wo]Man vs. the Supernatural": {
    plotA: [
      "Signs intensify; rules of the haunting surface.",
      "A protection ritual backfires.",
      "Sacrifice is demanded—by name."
    ],
    subplotB: [
      "Skeptic vs. believer fractures the group.",
      "Past guilt resurfaces as a curse condition."
    ],
    subplotC: [
      "Local lore provides a missing step.",
      "A possessed object changes hands."
    ],
    twists: [
      "The entity wants 'justice', not chaos."
    ],
    hook: [
      "What haunts you has a reason—and it's right."
    ]
  },

  "[Wo]Man vs. Self": {
    plotA: [
      "Old coping strategy fails at the worst time.",
      "An avoided truth becomes public.",
      "Relapse (or regression) triggers collateral damage."
    ],
    subplotB: [
      "A mentor's tough love forces a choice.",
      "Romance exposes self‑deception."
    ],
    subplotC: [
      "A childhood place resurfaces a buried memory.",
      "Symbolic object must be destroyed or reclaimed."
    ],
    twists: [
      "The 'flaw' is tied to the protagonist's gift."
    ],
    hook: [
      "To win, you must stop being you."
    ]
  },

  "[Wo]Man vs. God / Religion": {
    plotA: [
      "Doctrine and necessity collide.",
      "A public rite is interrupted.",
      "Blasphemy or miracle? Records disagree."
    ],
    subplotB: [
      "Community splits along belief lines.",
      "Forbidden kindness shifts a zealot."
    ],
    subplotC: [
      "A relic changes meaning in the present.",
      "Heretical text reframes a prophecy."
    ],
    twists: [
      "Faith keeps a secret from the faithful."
    ],
    hook: [
      "Reverence vs. responsibility—choose one."
    ]
  },

  "[Wo]Man vs. Society": {
    plotA: [
      "Lawful path forecloses a moral good.",
      "Public opinion turns on partial truth.",
      "A protest/strike creates personal stakes."
    ],
    subplotB: [
      "Family reputation is weaponized.",
      "A friend becomes a surveillance risk."
    ],
    subplotC: [
      "Policy detail hides an escape clause.",
      "Black‑market help has a price."
    ],
    twists: [
      "The institution was built to prevent this moment."
    ],
    hook: [
      "Break the rules or break yourself."
    ]
  }
};