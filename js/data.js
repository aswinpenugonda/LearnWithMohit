/**
 * LearnWithMohit — JEE Math Explorer content.
 *
 * All learning content lives here as plain data so it is easy to edit and
 * extend. Math is written in LaTeX and rendered by KaTeX.
 * Use \\( ... \\) for inline math and \\[ ... \\] for block math.
 */
window.LWM_DATA = {
  portal: {
    series: "JEE MATH EXPLORER: FOUNDATION SERIES",
    student: "Mohit Ram",
    grade: "CLASS 8",
    level: "Advanced Math"
  },

  chapters: [
    { id: "quadratic", num: "01", label: "QUADRATIC EQUATIONS", active: true },
    { id: "progressions", num: "02", label: "PROGRESSIONS (AP, GP, HP)", active: false }
  ],

  welcome: {
    heading: "MASTER QUADRATIC EQUATIONS!",
    text:
      "Hey Mohit, a quadratic is like a magic machine that bends numbers into a " +
      "beautiful curve called a parabola! Feed it an x, and it can smile (open up) " +
      "or frown (open down). Learn to find its secret roots, read its discriminant, " +
      "and tame every inequality along the way!",
    tutorAdvice:
      "Mohit, always write down a, b, c and the discriminant D = b² − 4ac first. " +
      "Most quadratic questions unlock instantly once you see the D-Detector's answer!"
  },

  tabs: [
    { id: "notes", label: "Student Notes", icon: "📖" },
    { id: "playground", label: "Parabola Playground", icon: "📈" },
    { id: "chat", label: "AI Teacher Chat", icon: "💬" },
    { id: "quiz", label: "Practice Quiz Arena", icon: "🏆" },
    { id: "revision", label: "Quick Revision Sheet", icon: "📋" }
  ],

  topics: [
    {
      id: "expression",
      num: "01",
      title: "Quadratic Expression & Equation",
      subtitle: "Meet the 'Quadratic Machine'! Learn what expressions and equations really are.",
      intro:
        "A quadratic expression in one variable is of the form \\(ax^2 + bx + c\\). " +
        "When we set it equal to 0, it becomes a quadratic equation \\(ax^2 + bx + c = 0\\).",
      intuition:
        "Imagine a magic machine where you feed in a number 'x'. The machine squares it, " +
        "multiplies it, and adds a constant. If the highest power is 2, it's a quadratic machine! " +
        "If the coefficient 'a' is positive, the machine draws a SMILE 😊. If 'a' is negative, it draws a FROWN 🙁.",
      sections: [
        {
          num: "1.1",
          title: "The Quadratic Expression",
          coreDefinition:
            "An expression of the form \\(ax^2 + bx + c\\). Here \\(a\\), \\(b\\) and \\(c\\) are constants (numbers) and \\(a \\neq 0\\).",
          whyThisWorks:
            "Think of 'a' as the strength of the curve — it decides how wide or narrow your graph is. " +
            "'b' controls where the center of the graph moves. 'c' is the height where the graph crosses " +
            "the vertical y-axis. If \\(a = 0\\), the \\(x^2\\) term vanishes, leaving \\(bx + c\\), which is a " +
            "straight line, not a curve! That's why 'a' can never be zero.",
          teacherTip:
            "Always look for the exponent 2. If you see \\(x^3\\) or \\(1/x\\), the machine is NOT quadratic!",
          commonMistake:
            "Forgetting that 'a' cannot be 0. In equations like \\((k-1)x^2 + 3x + 5 = 0\\), always state that \\(k \\neq 1\\).",
          graphs: [
            { title: "a > 0: opens upward (a happy SMILE 😊)", a: 1, b: 0, c: -1, xmin: -3, xmax: 3, vertex: false },
            { title: "a < 0: opens downward (a FROWN 🙁)", a: -1, b: 0, c: 1, xmin: -3, xmax: 3, vertex: false }
          ],
          examples: [
            {
              question: "Which of the following are quadratic expressions? (A) \\(4x^2 - 2x + 1\\), (B) \\(7x - 5\\), (C) \\(x^3 + 2x^2 - 1\\)",
              steps: [
                "Check (A): highest power is 2 and the coefficient of \\(x^2\\) is \\(4 \\neq 0\\). So yes, this is a quadratic expression.",
                "Check (B): highest power is 1, so it is linear — not quadratic.",
                "Check (C): highest power is 3, so it is a cubic — not quadratic.",
                "Answer: only (A) is a quadratic expression."
              ]
            }
          ]
        },
        {
          num: "1.2",
          title: "Pure, Monic and General Forms",
          coreDefinition:
            "Pure quadratic: \\(b = 0\\) (e.g. \\(7x^2 - 49 = 0\\)). Monic quadratic: \\(a = 1\\) " +
            "(e.g. \\(x^2 + 3x - 5 = 0\\)). General quadratic: \\(a \\neq 0\\) with all terms present.",
          whyThisWorks:
            "A quadratic expression can take many values as x changes, but an equation asks only for the " +
            "x-values that make it exactly zero.",
          teacherTip:
            "Spotting the type quickly (pure, monic, general) tells you the fastest solving method.",
          commonMistake:
            "Confusing an expression with an equation. \\(2x^2 + 3x + 4\\) is an expression; \\(2x^2 + 3x + 4 = 0\\) is an equation.",
          examples: []
        }
      ]
    },

    {
      id: "roots",
      num: "02",
      title: "Roots, Identity, Factor Form & Formula",
      subtitle: "What are roots? How do we find them using the quadratic formula?",
      intro:
        "A number \\(\\alpha\\) is a root of \\(f(x) = ax^2 + bx + c = 0\\) if substituting \\(x = \\alpha\\) " +
        "makes the expression zero. A quadratic has at most two roots.",
      intuition:
        "Roots are the secret 'unlock codes' for the machine — the special x-values that make the whole " +
        "expression collapse to zero. A quadratic can have at most TWO unlock codes, because its graph " +
        "(a parabola) can cross the x-axis at most twice!",
      sections: [
        {
          num: "2.1",
          title: "Roots and the Factor Form",
          coreDefinition:
            "\\(f(\\alpha) = a\\alpha^2 + b\\alpha + c = 0\\). If \\(\\alpha, \\beta\\) are roots, the equation " +
            "can be written as \\(a(x - \\alpha)(x - \\beta) = 0\\).",
          whyThisWorks:
            "When \\(x = \\alpha\\), the factor \\((x - \\alpha)\\) becomes zero, so the whole product is zero. " +
            "This is exactly why roots are also called 'zeroes' of the expression.",
          teacherTip:
            "To factorise, find two numbers whose sum is \\(b\\) and product is \\(c\\) (for a monic quadratic).",
          commonMistake:
            "Assuming every quadratic factorises with nice numbers. If it doesn't, switch to the formula.",
          graph: {
            title: "y = x² − 5x + 6 cuts the x-axis at its roots 2 and 3",
            a: 1, b: -5, c: 6, xmin: -1, xmax: 6
          },
          examples: [
            {
              question: "Check whether 2 is a root of \\(x^2 - 5x + 6 = 0\\).",
              steps: [
                "Put \\(x = 2\\): \\(2^2 - 5(2) + 6 = 4 - 10 + 6 = 0\\).",
                "Since the result is 0, \\(x = 2\\) is a root. Similarly \\(x = 3\\) is the other root."
              ]
            }
          ]
        },
        {
          num: "2.2",
          title: "The Quadratic Formula",
          coreDefinition:
            "For \\(ax^2 + bx + c = 0\\), the roots are \\(x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\). " +
            "The quantity \\(b^2 - 4ac\\) is the discriminant \\(D\\).",
          whyThisWorks:
            "The formula comes from completing the square on the general equation, so it works for every quadratic.",
          teacherTip:
            "Prefer factorisation when the numbers are easy; use the formula when they are not.",
          commonMistake:
            "Forgetting the \\(\\pm\\) sign, which loses one of the two roots.",
          examples: [
            {
              question: "Solve \\(2x^2 - 5x + 2 = 0\\) using the quadratic formula.",
              steps: [
                "Here \\(a = 2,\\; b = -5,\\; c = 2\\).",
                "\\(D = b^2 - 4ac = 25 - 16 = 9\\).",
                "\\(x = \\dfrac{5 \\pm \\sqrt{9}}{4} = \\dfrac{5 \\pm 3}{4}\\).",
                "So \\(x = 2\\) or \\(x = \\tfrac{1}{2}\\)."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "discriminant",
      num: "03",
      title: "Discriminant & Nature of Roots",
      subtitle: "Discover how the 'D-Detector' (b² − 4ac) reveals the nature of the roots.",
      intro:
        "The discriminant \\(D = b^2 - 4ac\\) acts like a detector. It tells whether — and how — the graph meets the x-axis.",
      intuition:
        "Meet the D-Detector! Before solving, compute \\(D = b^2 - 4ac\\). It's like an X-ray: \\(D>0\\) means the " +
        "parabola pierces the x-axis at two points, \\(D=0\\) means it just kisses it once, and \\(D<0\\) means it " +
        "floats entirely above or below — no real roots!",
      sections: [
        {
          num: "3.1",
          title: "The Three Cases",
          coreDefinition:
            "\\(D > 0\\): two distinct real roots (cuts x-axis twice). \\(D = 0\\): equal roots (touches x-axis once). " +
            "\\(D < 0\\): no real roots (does not meet the x-axis).",
          whyThisWorks:
            "The square root of a negative number is not real, so when \\(D < 0\\) the formula gives complex " +
            "conjugate roots and the parabola never crosses the x-axis.",
          teacherTip:
            "If \\(a, b, c\\) are rational and \\(D\\) is a perfect square, the roots are rational; otherwise they are irrational surds.",
          commonMistake:
            "Reading \\(D = 0\\) as 'no roots'. It actually means two EQUAL real roots at \\(x = -b/2a\\).",
          graphs: [
            { title: "D > 0: cuts the x-axis at two points", a: 1, b: 0, c: -4, xmin: -4, xmax: 4 },
            { title: "D = 0: touches the x-axis once", a: 1, b: -2, c: 1, xmin: -2, xmax: 4 },
            { title: "D < 0 (a > 0): stays completely above the x-axis", a: 1, b: 2, c: 5, xmin: -5, xmax: 3 }
          ],
          examples: [
            {
              question: "Classify the roots of \\(x^2 - 5x + 4 = 0\\), \\(x^2 - 3x - 2 = 0\\) and \\(2x^2 - 3x + 2 = 0\\).",
              steps: [
                "\\(x^2 - 5x + 4\\): \\(D = 25 - 16 = 9\\) (perfect square) → rational and distinct: 1 and 4.",
                "\\(x^2 - 3x - 2\\): \\(D = 9 + 8 = 17\\) (not a perfect square) → irrational and distinct.",
                "\\(2x^2 - 3x + 2\\): \\(D = 9 - 16 = -7 < 0\\) → complex conjugate roots."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "forming",
      num: "04",
      title: "Forming Equations from Roots",
      subtitle: "Learn to build your own quadratic equations using the sum and product of roots.",
      intro:
        "If \\(\\alpha\\) and \\(\\beta\\) are roots, the monic quadratic equation is " +
        "\\(x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0\\).",
      intuition:
        "Work backwards! If you already know the answers (the roots), you can build the puzzle (the equation). " +
        "Just ADD the roots for the middle term and MULTIPLY them for the last term.",
      sections: [
        {
          num: "4.1",
          title: "Sum and Product Method",
          coreDefinition:
            "Sum of roots \\(= \\alpha + \\beta\\), product of roots \\(= \\alpha\\beta\\). " +
            "Equation: \\(x^2 - (\\text{sum})x + (\\text{product}) = 0\\).",
          whyThisWorks:
            "Expanding \\((x - \\alpha)(x - \\beta)\\) gives \\(x^2 - (\\alpha+\\beta)x + \\alpha\\beta\\), which is exactly this form.",
          teacherTip:
            "Any non-zero multiple \\(k[x^2 - (\\alpha+\\beta)x + \\alpha\\beta] = 0\\) has the same roots.",
          commonMistake:
            "Forgetting the minus sign in front of the sum term.",
          examples: [
            {
              question: "Form the quadratic equation whose roots are 2 and 7.",
              steps: [
                "Sum \\(= 2 + 7 = 9\\); Product \\(= 2 \\times 7 = 14\\).",
                "Equation: \\(x^2 - 9x + 14 = 0\\).",
                "Check: \\((x-2)(x-7) = x^2 - 9x + 14\\). ✓"
              ]
            },
            {
              question: "Form the quadratic equation whose roots are −3 and 5.",
              steps: [
                "Sum \\(= -3 + 5 = 2\\); Product \\(= -15\\).",
                "Equation: \\(x^2 - 2x - 15 = 0\\)."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "symmetry",
      num: "05",
      title: "Symmetry & Relations of Roots",
      subtitle: "Uncover the powerful connection between roots and the coefficients a, b, c.",
      intro:
        "For \\(ax^2 + bx + c = 0\\) with roots \\(\\alpha, \\beta\\): \\(\\alpha + \\beta = -\\dfrac{b}{a}\\) " +
        "and \\(\\alpha\\beta = \\dfrac{c}{a}\\). These let us answer many questions without finding the roots.",
      intuition:
        "You don't always need to find the roots themselves! Their SUM and PRODUCT are hidden inside the " +
        "coefficients. Use symmetric formulas to compute \\(\\alpha^2+\\beta^2\\), \\(\\alpha^3+\\beta^3\\) and more — like magic shortcuts.",
      sections: [
        {
          num: "5.1",
          title: "Key Symmetric Formulas",
          coreDefinition:
            "\\(\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta\\); " +
            "\\(\\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)\\); " +
            "\\(|\\alpha - \\beta| = \\dfrac{\\sqrt{D}}{|a|}\\).",
          whyThisWorks:
            "Every symmetric expression in the roots can be rewritten using only their sum and product, which come directly from the coefficients.",
          teacherTip:
            "Write down \\(\\alpha+\\beta\\) and \\(\\alpha\\beta\\) first — almost every relation follows from them.",
          commonMistake:
            "Using \\(1/\\alpha + 1/\\beta = -b/c\\) when \\(c = 0\\); the formula is only valid for \\(c \\neq 0\\).",
          examples: [
            {
              question: "If \\(\\alpha, \\beta\\) are roots of \\(x^2 + x - 20 = 0\\), find \\(\\alpha^2 + \\beta^2\\) and \\(\\alpha^3 + \\beta^3\\).",
              steps: [
                "\\(\\alpha + \\beta = -1\\) and \\(\\alpha\\beta = -20\\).",
                "\\(\\alpha^2 + \\beta^2 = (-1)^2 - 2(-20) = 1 + 40 = 41\\).",
                "\\(\\alpha^3 + \\beta^3 = (-1)^3 - 3(-20)(-1) = -1 - 60 = -61\\)."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "properties",
      num: "06",
      title: "Properties of Roots",
      subtitle: "Special shortcuts! Learn how to spot roots instantly from the coefficients.",
      intro:
        "The signs and sums of \\(a, b, c\\) reveal a lot about the roots without any calculation.",
      intuition:
        "Special shortcuts! If \\(a + b + c = 0\\), then \\(x = 1\\) is instantly a root. If \\(a - b + c = 0\\), " +
        "then \\(x = -1\\) is a root. Spot these patterns to save precious exam time!",
      sections: [
        {
          num: "6.1",
          title: "Sign and Pattern Rules",
          coreDefinition:
            "If \\(a + b + c = 0\\): one root is 1, the other is \\(c/a\\). If \\(a - b + c = 0\\): one root is −1, " +
            "the other is \\(-c/a\\). If \\(a = c\\): roots are reciprocals. If \\(b = 0\\): roots are \\(\\pm\\sqrt{c/a}\\).",
          whyThisWorks:
            "Substituting \\(x = 1\\) gives \\(a + b + c\\); if that is zero, then 1 must be a root. The same logic applies to \\(x = -1\\).",
          teacherTip:
            "Same sign for \\(a\\) and \\(c\\) means the product of roots is positive; opposite signs means it is negative.",
          commonMistake:
            "Assuming both roots are positive whenever the product is positive — they could both be negative.",
          examples: [
            {
              question: "Use a shortcut to find a root of \\(2x^2 - 5x + 3 = 0\\).",
              steps: [
                "Check \\(a + b + c = 2 - 5 + 3 = 0\\).",
                "So \\(x = 1\\) is a root; the other is \\(c/a = 3/2\\)."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "transformation",
      num: "07",
      title: "Transformation of Equations",
      subtitle: "Learn how to build a new equation whose roots are changed versions of the old ones.",
      intro:
        "Transformation means changing the roots by a rule. Instead of solving first, we substitute inside \\(f(x)\\).",
      intuition:
        "Change the roots without re-solving! Want roots bigger by k? Replace x with \\((x-k)\\). Want reciprocal " +
        "roots? Replace x with \\(1/x\\). It's like a remote control for roots.",
      sections: [
        {
          num: "7.1",
          title: "Substitution Rules",
          coreDefinition:
            "Roots \\(\\alpha+k, \\beta+k\\): use \\(f(x-k)=0\\). Roots \\(-\\alpha, -\\beta\\): use \\(f(-x)=0\\). " +
            "Reciprocals \\(1/\\alpha, 1/\\beta\\): use \\(f(1/x)=0\\) then clear denominators. Roots \\(k\\alpha, k\\beta\\): use \\(f(x/k)=0\\).",
          whyThisWorks:
            "If the new root is \\(x = \\alpha + k\\), then \\(x - k = \\alpha\\), so \\(f(x-k) = 0\\) is satisfied. Each substitution reverses the change.",
          teacherTip:
            "For reciprocal roots of \\(ax^2 + bx + c = 0\\), just reverse the coefficients: \\(cx^2 + bx + a = 0\\).",
          commonMistake:
            "Substituting \\(f(x+k)\\) when you want to INCREASE roots by k — it actually decreases them.",
          examples: [
            {
              question: "Form the equation whose roots are 3 more than the roots of \\(x^2 - 9x + 14 = 0\\).",
              steps: [
                "Original roots are 2 and 7; new roots should be 5 and 10.",
                "Use \\(f(x-3)=0\\): \\((x-3)^2 - 9(x-3) + 14 = 0\\).",
                "Simplify: \\(x^2 - 15x + 50 = 0\\).",
                "Check: roots are 5 and 10. ✓"
              ]
            }
          ]
        }
      ]
    },

    {
      id: "sign",
      num: "08",
      title: "Sign of Quadratic Expression & Graphs",
      subtitle: "Visualize quadratics! See how completing the square reveals the sign story.",
      intro:
        "The sign of a quadratic tells whether its value is positive, negative or zero for different values of x. " +
        "Above the x-axis is positive, below is negative, and on the axis is zero.",
      intuition:
        "Visualize the parabola! Above the x-axis = positive, below = negative, on it = zero. Completing the square " +
        "reveals the turning point and the whole sign story at a glance.",
      sections: [
        {
          num: "8.1",
          title: "Completing the Square & Sign Rules",
          coreDefinition:
            "\\(ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{D}{4a}\\). " +
            "If \\(D < 0\\): same sign as \\(a\\) for all x. If \\(D = 0\\): same sign as \\(a\\), zero only at \\(x = -b/2a\\). " +
            "If \\(D > 0\\): sign changes at the two roots.",
          whyThisWorks:
            "The squared term is always \\(\\geq 0\\). When \\(D < 0\\), the expression can never reach zero, so it keeps the sign of \\(a\\).",
          teacherTip:
            "For an upward parabola (\\(a > 0\\)): positive OUTSIDE the roots, negative BETWEEN them.",
          commonMistake:
            "Forgetting to reverse the sign rule when \\(a < 0\\) (downward parabola).",
          graph: {
            title: "Sign of (x − 2)(x − 5): positive outside the roots, negative between",
            a: 1, b: -7, c: 10, xmin: 0, xmax: 7, bands: true,
            caption: "Blue bands = expression positive, red band = expression negative."
          },
          examples: [
            {
              question: "Solve \\(x^2 - 5x - 6 > 0\\).",
              steps: [
                "Factorise: \\(x^2 - 5x - 6 = (x - 6)(x + 1)\\); roots are −1 and 6.",
                "Since \\(a > 0\\), the expression is positive OUTSIDE the roots.",
                "Answer: \\(x < -1\\) or \\(x > 6\\)."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "location",
      num: "09",
      title: "Location of Roots",
      subtitle: "Trap the roots! Decide where roots lie relative to a number without fully solving.",
      intro:
        "Location of roots means deciding where the roots lie compared to a given number or interval, " +
        "often without solving completely. These standard conditions are for \\(a > 0\\).",
      intuition:
        "Where do the roots hide? Use \\(f(k)\\), the discriminant, and the axis of symmetry \\(x = -b/2a\\) to trap " +
        "roots inside or outside an interval — all without solving the equation.",
      sections: [
        {
          num: "9.1",
          title: "Standard Conditions (for a > 0)",
          coreDefinition:
            "k lies between the roots: \\(f(k) < 0\\). Both roots greater than k: \\(D \\geq 0,\\; f(k) > 0,\\; -b/2a > k\\). " +
            "Exactly one root between p and q: \\(f(p)\\cdot f(q) < 0\\).",
          whyThisWorks:
            "For an upward parabola, the expression is negative only between the two roots. So \\(f(k) < 0\\) forces k to sit between them.",
          teacherTip:
            "The axis of symmetry \\(x = -b/2a\\) always lies exactly midway between the two real roots.",
          commonMistake:
            "Forgetting the \\(D \\geq 0\\) condition — without it, real roots may not even exist.",
          graph: {
            title: "f(x) = x² − 5x + 6: the dashed line x = 2.5 sits between the roots",
            a: 1, b: -5, c: 6, xmin: -1, xmax: 6,
            markX: { x: 2.5, label: "x = 2.5" },
            caption: "Because f(2.5) < 0, the value 2.5 lies between the roots 2 and 3."
          },
          examples: [
            {
              question: "Check whether 2.5 lies between the roots of \\(f(x) = x^2 - 5x + 6\\).",
              steps: [
                "\\(f(2.5) = 6.25 - 12.5 + 6 = -0.25 < 0\\).",
                "Since \\(f(2.5) < 0\\), 2.5 lies between the two roots. This matches the roots 2 and 3."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "maxmin",
      num: "10",
      title: "Maximum & Minimum Values",
      subtitle: "Bowl or dome? Find the smallest or greatest value a quadratic can take.",
      intro:
        "For \\(f(x) = ax^2 + bx + c\\), the vertex occurs at \\(x = -\\dfrac{b}{2a}\\) and the extreme value is " +
        "\\(-\\dfrac{D}{4a}\\).",
      intuition:
        "Bowl or dome? If \\(a > 0\\) the parabola is a bowl with a lowest point (minimum). If \\(a < 0\\) it's a " +
        "dome with a highest point (maximum). The tip of the curve is the vertex.",
      sections: [
        {
          num: "10.1",
          title: "Completing the Square Method",
          coreDefinition:
            "Rewrite \\(f(x)\\) as \\(a(x - h)^2 + k\\). Then \\(k\\) is the minimum (if \\(a > 0\\)) or maximum (if \\(a < 0\\)) value, achieved at \\(x = h\\).",
          whyThisWorks:
            "A square is never negative, so \\(a(x-h)^2\\) reaches its extreme value 0 at \\(x = h\\), leaving exactly \\(k\\).",
          teacherTip:
            "A normal parabola has only ONE extreme: minimum if \\(a > 0\\), maximum if \\(a < 0\\) — not both.",
          commonMistake:
            "Claiming \\(x^2\\) has a maximum. It has a minimum of 0 but keeps growing, so no maximum exists.",
          graphs: [
            { title: "Minimum of x² − 6x + 13 = 4 at x = 3 (bowl)", a: 1, b: -6, c: 13, xmin: -1, xmax: 7 },
            { title: "Maximum of −x² + 6x − 5 = 4 at x = 3 (dome)", a: -1, b: 6, c: -5, xmin: -1, xmax: 7 }
          ],
          examples: [
            {
              question: "Find the minimum value of \\(x^2 - 6x + 13\\).",
              steps: [
                "Complete the square: \\(x^2 - 6x + 13 = (x - 3)^2 + 4\\).",
                "Since \\((x-3)^2 \\geq 0\\), the smallest value is \\(0 + 4 = 4\\).",
                "Minimum value is 4, achieved at \\(x = 3\\)."
              ]
            },
            {
              question: "Find the maximum value of \\(-x^2 + 6x - 5\\).",
              steps: [
                "Complete the square: \\(-x^2 + 6x - 5 = -(x - 3)^2 + 4\\).",
                "Since \\(-(x-3)^2 \\leq 0\\), the greatest value is 4, achieved at \\(x = 3\\)."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "inequations",
      num: "11",
      title: "Quadratic Inequations",
      subtitle: "Read the graph's sign! Solve inequalities using roots and sign charts.",
      intro:
        "A quadratic inequation asks where the expression is positive or negative, e.g. \\(f(x) > 0\\), " +
        "\\(f(x) \\geq 0\\), \\(f(x) < 0\\) or \\(f(x) \\leq 0\\).",
      intuition:
        "Solving an inequation = reading the graph's sign. The roots split the number line into regions. For an " +
        "upward parabola, the expression is positive OUTSIDE the roots and negative BETWEEN them.",
      sections: [
        {
          num: "11.1",
          title: "Standard Interval Results (α < β)",
          coreDefinition:
            "\\((x-\\alpha)(x-\\beta) > 0 \\Rightarrow x \\in (-\\infty, \\alpha) \\cup (\\beta, \\infty)\\). " +
            "\\((x-\\alpha)(x-\\beta) < 0 \\Rightarrow x \\in (\\alpha, \\beta)\\). " +
            "Use \\(\\leq, \\geq\\) to include the endpoints.",
          whyThisWorks:
            "Between the roots an upward parabola dips below the x-axis (negative); outside the roots it rises above (positive).",
          teacherTip:
            "Strict inequalities (\\(>, <\\)) EXCLUDE the roots; inclusive ones (\\(\\geq, \\leq\\)) INCLUDE them.",
          commonMistake:
            "Including the endpoints for a strict inequality, where the expression equals 0 (not \\(>0\\)).",
          graph: {
            title: "y = x² − 7x + 12: positive outside [3, 4], negative between",
            a: 1, b: -7, c: 12, xmin: 1, xmax: 6, bands: true,
            caption: "x² − 7x + 12 > 0 on the blue bands; ≤ 0 on the red band (3 ≤ x ≤ 4)."
          },
          examples: [
            {
              question: "Solve \\(x^2 - 7x + 12 > 0\\) and \\(x^2 - 7x + 12 \\leq 0\\).",
              steps: [
                "Factorise: \\((x - 3)(x - 4)\\); roots are 3 and 4, and \\(a > 0\\).",
                "For \\(> 0\\): positive outside the roots → \\(x < 3\\) or \\(x > 4\\).",
                "For \\(\\leq 0\\): negative between the roots, endpoints included → \\(3 \\leq x \\leq 4\\)."
              ]
            }
          ]
        }
      ]
    },

    {
      id: "rational",
      num: "12",
      title: "Rational Inequations & Range",
      subtitle: "Fractions with a rule! The denominator can never be zero.",
      intro:
        "A rational inequation involves a fraction \\(\\dfrac{P(x)}{Q(x)}\\). The most important rule is that the " +
        "denominator can never be zero.",
      intuition:
        "Fractions have one golden rule: the bottom can NEVER be zero. Find critical points from the top and the " +
        "bottom, mark them on a number line, and use a sign chart — but always leave denominator-zero points OUT.",
      sections: [
        {
          num: "12.1",
          title: "Solving with a Sign Chart",
          coreDefinition:
            "Find critical points from numerator and denominator, mark them on a number line, then test the sign " +
            "in each region. Never include values that make the denominator zero.",
          whyThisWorks:
            "A fraction changes sign only where the numerator or denominator is zero, so those points split the line into constant-sign regions.",
          teacherTip:
            "Use an open bracket at every denominator-zero point, even for \\(\\geq\\) or \\(\\leq\\).",
          commonMistake:
            "Cancelling a common factor and forgetting to exclude the denominator-zero value.",
          examples: [
            {
              question: "Solve \\(\\dfrac{x - 1}{x + 2} > 0\\).",
              steps: [
                "Critical points: \\(x = 1\\) (numerator) and \\(x = -2\\) (denominator, excluded).",
                "Test signs: positive on \\((-\\infty, -2)\\), negative on \\((-2, 1)\\), positive on \\((1, \\infty)\\).",
                "Answer: \\(x \\in (-\\infty, -2) \\cup (1, \\infty)\\)."
              ]
            }
          ]
        },
        {
          num: "12.2",
          title: "Range of a Rational Expression",
          coreDefinition:
            "Set the expression equal to \\(y\\), cross-multiply to get a quadratic in x, then require \\(D \\geq 0\\) for real x. Solving the inequality in y gives the range.",
          whyThisWorks:
            "For the expression to actually take the value y, the resulting quadratic in x must have a real solution, which needs \\(D \\geq 0\\).",
          teacherTip:
            "Sometimes simple reasoning is faster than the discriminant method.",
          commonMistake:
            "Forgetting to check values of y that make the leading coefficient of the x-quadratic zero.",
          examples: [
            {
              question: "Find the range of \\(y = \\dfrac{x^2 + 1}{x^2 + 2}\\).",
              steps: [
                "Since \\(x^2 + 1 < x^2 + 2\\), we always have \\(y < 1\\).",
                "The minimum occurs at \\(x = 0\\), giving \\(y = \\tfrac{1}{2}\\).",
                "Range: \\(\\tfrac{1}{2} \\leq y < 1\\)."
              ]
            }
          ]
        }
      ]
    }
  ],

  revision: [
    { topic: "General form", result: "\\(ax^2 + bx + c = 0,\\; a \\neq 0\\)" },
    { topic: "Roots formula", result: "\\(x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)" },
    { topic: "Discriminant", result: "\\(D = b^2 - 4ac\\)" },
    { topic: "Sum of roots", result: "\\(\\alpha + \\beta = -\\dfrac{b}{a}\\)" },
    { topic: "Product of roots", result: "\\(\\alpha\\beta = \\dfrac{c}{a}\\)" },
    { topic: "Equation from roots", result: "\\(x^2 - (\\text{sum})x + \\text{product} = 0\\)" },
    { topic: "Vertex", result: "\\(x = -\\dfrac{b}{2a}\\)" },
    { topic: "Minimum / maximum value", result: "\\(-\\dfrac{D}{4a}\\)" },
    { topic: "Graph opens upward", result: "\\(a > 0\\)" },
    { topic: "Graph opens downward", result: "\\(a < 0\\)" },
    { topic: "Always positive / negative", result: "\\(D < 0 \\Rightarrow\\) same sign as \\(a\\) for all x" }
  ],

  quiz: [
    {
      question: "Find the sum and product of the roots of \\(3x^2 - 7x + 2 = 0\\).",
      answer: "Sum \\(= \\dfrac{7}{3}\\), Product \\(= \\dfrac{2}{3}\\)."
    },
    {
      question: "Form the equation whose roots are 4 and −5.",
      answer: "\\(x^2 + x - 20 = 0\\)."
    },
    {
      question: "Find the nature of the roots of \\(x^2 - 6x + 10 = 0\\).",
      answer: "\\(D = 36 - 40 = -4 < 0\\), so the roots are complex conjugates."
    },
    {
      question: "Solve \\(x^2 - 7x + 12 > 0\\).",
      answer: "\\((x - 3)(x - 4) > 0 \\Rightarrow x < 3\\) or \\(x > 4\\)."
    },
    {
      question: "Find the minimum value of \\(x^2 - 8x + 20\\).",
      answer: "\\((x - 4)^2 + 4\\), so the minimum is 4 at \\(x = 4\\)."
    },
    {
      question: "Find the equation with roots reciprocal to those of \\(2x^2 - 5x + 3 = 0\\).",
      answer: "Reverse the coefficients: \\(3x^2 - 5x + 2 = 0\\)."
    },
    {
      question: "If the roots of \\(5x^2 + 13x + k = 0\\) are reciprocals, find k.",
      answer: "For reciprocal roots \\(a = c\\), so \\(k = 5\\)."
    },
    {
      question: "Solve \\(\\dfrac{x - 2}{x + 3} \\leq 0\\).",
      answer: "Critical points −3 and 2; exclude −3, include 2 \\(\\Rightarrow (-3, 2]\\)."
    }
  ]
};
