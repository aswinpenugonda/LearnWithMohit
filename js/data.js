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
    { id: "quadratic", num: "01", label: "QUADRATIC EQUATIONS", active: true, playground: "parabola" },
    { id: "progressions", num: "02", label: "PROGRESSIONS (AP, GP, HP)", active: true, playground: "progression" }
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
  ],

  // ======================================================================
  //  CHAPTER 02 — PROGRESSIONS (AP, GP, HP)
  // ======================================================================
  progressions: {
    welcome: {
      heading: "MASTER PROGRESSIONS!",
      text:
        "Hey Mohit, progressions are the mathematics of PATTERNS — and patterns are " +
        "everywhere! An A.P. grows by steady ADDING (like a staircase), a G.P. grows by " +
        "explosive MULTIPLYING (like money doubling in a bank), and an H.P. is just an A.P. " +
        "flipped upside down. Learn to spot the pattern and you can predict the future of any sequence!",
      tutorAdvice:
        "Mohit, the FIRST question to ask in any problem is: 'Is this ADDING (A.P.) or " +
        "MULTIPLYING (G.P.)?' If the terms grow by the same AMOUNT it's an A.P.; if they grow " +
        "by the same FACTOR it's a G.P. That one habit unlocks almost every question!"
    },

    tabs: [
      { id: "notes", label: "Student Notes", icon: "📖" },
      { id: "playground", label: "Progression Playground", icon: "📊" },
      { id: "chat", label: "AI Teacher Chat", icon: "💬" },
      { id: "quiz", label: "Practice Quiz Arena", icon: "🏆" },
      { id: "revision", label: "Quick Revision Sheet", icon: "📋" }
    ],

    topics: [
      {
        id: "basics",
        num: "01",
        title: "Sequence, Series & Progression",
        subtitle: "The building blocks: what is a sequence, a series, and a progression?",
        intro:
          "A sequence is a list of numbers written in a fixed order. A series is what you get when " +
          "you add up the terms of a sequence. A progression is a special sequence where every term " +
          "is connected to the previous one by the exact same rule.",
        intuition:
          "Think of a 'term' as one number in the list — in 2, 5, 8, 11 the number 8 is the 3rd term. " +
          "The 'nth term' is a vending machine: punch in a number n and it spits out that exact term, " +
          "so you never have to count on your fingers again!",
        sections: [
          {
            num: "1.1",
            title: "Sequence vs. Series",
            coreDefinition:
              "A sequence is an ordered list, e.g. \\(1, 3, 5, 7, \\ldots\\). A series is the sum of a " +
              "sequence, e.g. \\(1 + 3 + 5 + 7 = 16\\). A series can be finite (stops) or infinite (never ends).",
            whyThisWorks:
              "Memory trick: SEQUENCE has a 'Q' like a 'Queue' (a list waiting in line). SERIES hides a " +
              "plus sign — think 'S for Sum'.",
            teacherTip:
              "Read the question carefully: 'find the 10th term' needs a sequence; 'find the sum of 10 terms' needs a series.",
            commonMistake:
              "Confusing a term's value with its position. In \\(2, 5, 8, 11\\), '8' is the value of the 3rd term.",
            examples: []
          },
          {
            num: "1.2",
            title: "The Three Progressions",
            coreDefinition:
              "A.P. — keep ADDING the same number. G.P. — keep MULTIPLYING by the same number. " +
              "H.P. — flip every term (reciprocal) and it becomes an A.P.",
            whyThisWorks:
              "A.P. = steady growth (staircases, simple interest). G.P. = explosive growth (bacteria, " +
              "compound interest). H.P. = rates and ratios (average speed, music harmonics).",
            teacherTip:
              "In short: A.P. adds, G.P. multiplies, H.P. flips. Identify the type first, then pick the formula.",
            commonMistake:
              "Trying to solve an H.P. directly. Always flip it into an A.P. first, solve, then flip your answer back.",
            examples: [
              {
                question: "Classify: (A) \\(3, 7, 11, 15\\), (B) \\(2, 6, 18, 54\\), (C) \\(\\tfrac12, \\tfrac14, \\tfrac16\\).",
                steps: [
                  "(A) Jumps are \\(+4, +4, +4\\) — same amount added, so it is an A.P.",
                  "(B) Ratios are \\(3, 3, 3\\) — same factor multiplied, so it is a G.P.",
                  "(C) Flip to get \\(2, 4, 6\\) which is an A.P., so the original is an H.P."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "ap-basics",
        num: "02",
        title: "Arithmetic Progression — nth Term",
        subtitle: "The staircase! Every step is the same height (the common difference d).",
        intro:
          "In an A.P. every term is the same 'height' d above the one before it. The general form is " +
          "\\(a,\\; a+d,\\; a+2d,\\; a+3d,\\ldots\\) and the most important formula is the nth term.",
        intuition:
          "Imagine a staircase where every step is exactly the same height. That fixed jump is d, the " +
          "common difference. Term 1 has 0 copies of d, term 2 has 1 copy, term 3 has 2 copies — the " +
          "number of d's is always ONE LESS than the term number. That single idea IS the nth-term formula.",
        sections: [
          {
            num: "2.1",
            title: "The nth Term Formula",
            coreDefinition:
              "\\(a_n = a + (n-1)d\\), where \\(a\\) is the first term and \\(d = a_2 - a_1\\) is the common difference.",
            whyThisWorks:
              "The 1st term has \\((1-1)=0\\) copies of d, the 2nd has \\((2-1)=1\\) copy, and so on. So the nth " +
              "term has \\((n-1)\\) copies of d added to \\(a\\) — exactly \\(a + (n-1)d\\).",
            teacherTip:
              "Bonus: find d from ANY two terms with \\(d = \\dfrac{a_m - a_n}{m - n}\\) — no need to list every term in between.",
            commonMistake:
              "Writing \\(a + nd\\) instead of \\(a + (n-1)d\\). Remember: the number of d's is one LESS than the term number.",
            examples: [
              {
                question: "Find the 10th term of \\(5, 9, 13, 17, \\ldots\\)",
                steps: [
                  "Identify \\(a = 5\\) and \\(d = 9 - 5 = 4\\).",
                  "Use \\(a_{10} = a + (n-1)d = 5 + (10-1)(4)\\).",
                  "Brackets first: \\(10 - 1 = 9\\); then \\(9 \\times 4 = 36\\).",
                  "Add: \\(5 + 36 = 41\\). So \\(a_{10} = 41\\)."
                ]
              },
              {
                question: "If the 5th term is 17 and the 12th term is 45, find d.",
                steps: [
                  "Use \\(d = \\dfrac{a_{12} - a_5}{12 - 5} = \\dfrac{45 - 17}{7}\\).",
                  "\\(= \\dfrac{28}{7} = 4\\). Much faster than writing all 12 terms!"
                ]
              }
            ]
          },
          {
            num: "2.2",
            title: "kth Term From the End",
            coreDefinition:
              "The \\(k\\)th term from the end \\(= a + (n-k)d\\). If the last term \\(l\\) is known, use the shortcut " +
              "\\(a_{(k\\text{ from end})} = l - (k-1)d\\).",
            whyThisWorks:
              "Counting backward from the end is symmetric to counting forward from the start — you just subtract d " +
              "instead of adding it, starting from the last term l.",
            teacherTip:
              "The shortcut \\(l - (k-1)d\\) means you never even need to compute n. One line instead of three!",
            commonMistake:
              "Using \\(l - kd\\). The 1st term from the end IS l itself, so use \\((k-1)\\), not k.",
            examples: [
              {
                question: "Find the 10th term from the end of \\(5, 7, 9, \\ldots, 35\\).",
                steps: [
                  "Here \\(l = 35\\) and \\(d = 7 - 5 = 2\\).",
                  "Shortcut: \\(a = l - (k-1)d = 35 - (10-1)(2)\\).",
                  "\\(= 35 - 18 = 17\\). Answer: 17."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "ap-sum",
        num: "03",
        title: "AP — Sum of n Terms",
        subtitle: "The famous Gauss trick! Add the list to its own reverse and halve.",
        intro:
          "The sum of the first n terms of an A.P. is \\(S_n = \\dfrac{n}{2}[2a + (n-1)d]\\), or equivalently " +
          "\\(S_n = \\dfrac{n}{2}(a + l)\\) when the last term l is known.",
        intuition:
          "Write the sum forwards, then write it backwards underneath, and add matching positions. Every pair " +
          "adds up to (first + last), and there are n such pairs — so twice the sum is \\(n(a+l)\\). This is the " +
          "trick young Carl Gauss used to add 1 to 100 in seconds (answer: 5050)!",
        sections: [
          {
            num: "3.1",
            title: "The Sum Formula",
            coreDefinition:
              "\\(S_n = \\dfrac{n}{2}[2a + (n-1)d] = \\dfrac{n}{2}(a + l)\\). In words: Sum = (average of first and last term) × (number of terms).",
            whyThisWorks:
              "Pairing forwards + backwards gives \\(2S_n = n(a+l)\\), so \\(S_n = \\tfrac{n}{2}(a+l)\\). Substituting " +
              "\\(l = a + (n-1)d\\) gives the other version.",
            teacherTip:
              "Handy shortcuts: sum of first n ODD numbers \\(= n^2\\); sum of first n EVEN numbers \\(= n(n+1)\\).",
            commonMistake:
              "Forgetting the factor \\(\\tfrac{n}{2}\\), or using the wrong number of terms n.",
            examples: [
              {
                question: "Find \\(S_{50}\\) for the A.P. \\(2, 5, 8, \\ldots\\)",
                steps: [
                  "Here \\(a = 2,\\; d = 3,\\; n = 50\\).",
                  "\\(S_{50} = \\dfrac{50}{2}[2(2) + (50-1)(3)] = 25[4 + 147]\\).",
                  "\\(= 25 \\times 151 = 3775\\)."
                ]
              }
            ]
          },
          {
            num: "3.2",
            title: "Selecting Terms — The Centering Trick",
            coreDefinition:
              "For 3 terms use \\(a-d,\\; a,\\; a+d\\); for 4 terms use \\(a-3d,\\; a-d,\\; a+d,\\; a+3d\\); " +
              "for 5 terms use \\(a-2d,\\; a-d,\\; a,\\; a+d,\\; a+2d\\).",
            whyThisWorks:
              "Centering around a middle value makes the d's cancel when you add. For 3 terms, " +
              "\\((a-d) + a + (a+d) = 3a\\), so the sum instantly gives you a without even knowing d.",
            teacherTip:
              "Whenever a problem gives you the SUM or PRODUCT of terms in A.P., reach for the centering trick first.",
            commonMistake:
              "Using \\(a, a+d, a+2d\\) for symmetric problems — it works but creates messy algebra you can avoid.",
            examples: [
              {
                question: "Three numbers in A.P. have sum 15. Find the middle number.",
                steps: [
                  "Use centred terms \\(a-d,\\; a,\\; a+d\\).",
                  "Sum \\(= (a-d) + a + (a+d) = 3a = 15\\).",
                  "So \\(a = 5\\) — the middle number is 5, found instantly."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "ap-props",
        num: "04",
        title: "AP — Properties & Golden Results",
        subtitle: "Powerful shortcuts that turn 5-minute problems into 10-second answers.",
        intro:
          "A.P.s have elegant properties and 'golden results' that let you answer many questions without " +
          "solving the whole system of equations.",
        intuition:
          "Shifting a staircase up or down doesn't change the step height (add k → same d). Stretching it makes " +
          "bigger but equal steps (multiply by k → new d = kd). Terms equally far from both ends always add to " +
          "the same value — like a seesaw balanced at the middle.",
        sections: [
          {
            num: "4.1",
            title: "Key Properties",
            coreDefinition:
              "If \\(a_n = An + B\\) (linear in n) it is an A.P. with \\(d = A\\). If \\(S_n = an^2 + bn\\) it is an A.P. with " +
              "\\(d = 2a\\). Also \\(t_n = S_n - S_{n-1}\\), and \\(a_1 + a_n = a_2 + a_{n-1} = \\ldots\\)",
            whyThisWorks:
              "The nth term = (total up to n) − (total up to n−1). If you know the running total after 5 people and " +
              "after 4 people paid, the difference is exactly what the 5th person paid.",
            teacherTip:
              "Three numbers a, b, c are in A.P. exactly when \\(2b = a + c\\) — the fast 'middle × 2 = first + last' test.",
            commonMistake:
              "Assuming the term-by-term PRODUCT of two A.P.s is an A.P. It usually is NOT — a common exam trap.",
            examples: [
              {
                question: "Are \\(4, 9, 14\\) in A.P.? Use the quick test.",
                steps: [
                  "Check \\(2 \\times (\\text{middle}) = \\text{first} + \\text{last}\\).",
                  "\\(2 \\times 9 = 18\\) and \\(4 + 14 = 18\\). Equal, so yes — they are in A.P."
                ]
              }
            ]
          },
          {
            num: "4.2",
            title: "The Golden Results",
            coreDefinition:
              "If \\(T_p = q\\) and \\(T_q = p\\), then \\(T_{p+q} = 0\\). If \\(S_p = S_q\\) (\\(p \\neq q\\)), then \\(S_{p+q} = 0\\). " +
              "If \\(S_p = q\\) and \\(S_q = p\\), then \\(S_{p+q} = -(p+q)\\).",
            whyThisWorks:
              "If adding the extra terms from p up to q changes the total by nothing, those terms must sum to zero — " +
              "which happens when the A.P. crosses from negative to positive in the middle.",
            teacherTip:
              "Spotting 'this is the \\(T_p = q,\\; T_q = p\\) pattern' turns a long algebra problem into an instant answer.",
            commonMistake:
              "Mixing up the term results (T) with the sum results (S). Check whether the problem talks about a term or a sum.",
            examples: [
              {
                question: "The 4th term of an A.P. is 7 and the 7th term is 4. Find \\(T_{11}\\).",
                steps: [
                  "This matches \\(T_p = q,\\; T_q = p\\) with \\(p = 4,\\; q = 7\\).",
                  "So \\(T_{p+q} = T_{4+7} = T_{11} = 0\\), with no calculation needed."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "gp-basics",
        num: "05",
        title: "Geometric Progression — nth Term",
        subtitle: "Money doubling in a bank! Every term is a fixed multiple (the ratio r).",
        intro:
          "In a G.P. every term is a fixed multiple of the one before it — that multiplier is r, the common ratio. " +
          "The general form is \\(a,\\; ar,\\; ar^2,\\; ar^3,\\ldots\\) and \\(a_n = ar^{\\,n-1}\\).",
        intuition:
          "Imagine ₹2 that doubles every day: 2, 4, 8, 16, 32… Biggest confusion point: A.P. → SUBTRACT to find d, " +
          "G.P. → DIVIDE to find r. Don't mix them up! The power of r is always (term number − 1).",
        sections: [
          {
            num: "5.1",
            title: "The nth Term of a G.P.",
            coreDefinition:
              "\\(a_n = ar^{\\,n-1}\\), where \\(a\\) is the first term and \\(r = \\dfrac{a_2}{a_1}\\) is the common ratio.",
            whyThisWorks:
              "Same logic as an A.P. but multiplying instead of adding: term 1 has \\(r^0 = 1\\), term 2 has \\(r^1\\), " +
              "term 3 has \\(r^2\\)… so the nth term carries \\(r^{\\,n-1}\\).",
            teacherTip:
              "kth term from the end (last term l known): \\(a_{(k\\text{ from end})} = \\dfrac{l}{r^{\\,k-1}}\\) — divide instead of subtract.",
            commonMistake:
              "Writing \\(ar^n\\) instead of \\(ar^{\\,n-1}\\). The power is one LESS than the term number.",
            examples: [
              {
                question: "Find the 6th term of \\(3, 6, 12, 24, \\ldots\\)",
                steps: [
                  "Here \\(a = 3\\) and \\(r = 6/3 = 2\\).",
                  "\\(a_6 = ar^{6-1} = 3 \\times 2^5\\).",
                  "\\(2^5 = 32\\), so \\(a_6 = 3 \\times 32 = 96\\)."
                ]
              },
              {
                question: "Are \\(3, 6, 12\\) in G.P.? Use the quick test.",
                steps: [
                  "Check \\((\\text{middle})^2 = \\text{first} \\times \\text{last}\\).",
                  "\\(6^2 = 36\\) and \\(3 \\times 12 = 36\\). Equal, so yes — they are in G.P."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "gp-sum",
        num: "06",
        title: "GP — Sum of n Terms & Infinite Sum",
        subtitle: "The chessboard-and-rice legend, and the pizza that never fills you up.",
        intro:
          "The sum of n terms of a G.P. is \\(S_n = \\dfrac{a(r^n - 1)}{r - 1}\\) (for \\(r \\neq 1\\)). When " +
          "\\(-1 < r < 1\\), an infinite G.P. converges to \\(S_\\infty = \\dfrac{a}{1-r}\\).",
        intuition:
          "Multiply the whole sum by r and subtract the original — almost everything cancels, leaving a tidy formula. " +
          "For the infinite case: eating half a pizza, then half of what's left, forever, gets you closer and closer " +
          "to exactly 1 whole pizza but never over.",
        sections: [
          {
            num: "6.1",
            title: "Sum of n Terms",
            coreDefinition:
              "\\(S_n = \\dfrac{a(r^n - 1)}{r - 1}\\) when \\(r > 1\\), and \\(S_n = \\dfrac{a(1 - r^n)}{1 - r}\\) when \\(r < 1\\).",
            whyThisWorks:
              "Write \\(S_n\\) and \\(rS_n\\) (shifted one step), then subtract: \\(rS_n - S_n = ar^n - a\\), giving " +
              "\\(S_n(r-1) = a(r^n - 1)\\).",
            teacherTip:
              "The chessboard legend is exactly this: \\(a = 1, r = 2, n = 64\\) gives \\(S_{64} = 2^{64} - 1\\) — a 20-digit number of rice grains!",
            commonMistake:
              "Using the \\(r > 1\\) form when \\(r < 1\\) and getting a negative-looking answer. Pick the matching version.",
            examples: [
              {
                question: "Find the sum of the first 6 terms of \\(2, 6, 18, \\ldots\\)",
                steps: [
                  "Here \\(a = 2,\\; r = 3,\\; n = 6\\).",
                  "\\(S_6 = \\dfrac{2(3^6 - 1)}{3 - 1} = \\dfrac{2(729 - 1)}{2}\\).",
                  "\\(= \\dfrac{2 \\times 728}{2} = 728\\)."
                ]
              }
            ]
          },
          {
            num: "6.2",
            title: "Sum of an Infinite G.P.",
            coreDefinition:
              "\\(S_\\infty = \\dfrac{a}{1 - r}\\), valid only when \\(-1 < r < 1\\) (a shrinking ratio).",
            whyThisWorks:
              "When \\(|r| < 1\\), the term \\(r^n\\) shrinks toward 0 as n grows, so \\(S_n = \\dfrac{a(1-r^n)}{1-r}\\) " +
              "approaches \\(\\dfrac{a}{1-r}\\).",
            teacherTip:
              "If \\(r \\geq 1\\) the terms keep growing forever, so there is NO finite infinite-sum.",
            commonMistake:
              "Applying the infinite-sum formula when \\(|r| \\geq 1\\), where the series actually diverges.",
            examples: [
              {
                question: "Find \\(S_\\infty\\) for \\(1 + \\tfrac13 + \\tfrac19 + \\ldots\\)",
                steps: [
                  "Here \\(a = 1\\) and \\(r = \\tfrac13\\) (and \\(|r| < 1\\)).",
                  "\\(S_\\infty = \\dfrac{a}{1-r} = \\dfrac{1}{1 - \\tfrac13} = \\dfrac{1}{\\tfrac23} = \\dfrac32\\)."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "agp",
        num: "07",
        title: "Arithmetic-Geometric Progression",
        subtitle: "A hybrid: an A.P. and a G.P. multiplied together, term by term.",
        intro:
          "An A.G.P. is built by multiplying an A.P. part \\((a, a+d, a+2d, \\ldots)\\) with a G.P. part " +
          "\\((1, r, r^2, \\ldots)\\) term by term, giving \\(a,\\; (a+d)r,\\; (a+2d)r^2,\\ldots\\)",
        intuition:
          "Whenever you see a series that looks like 'A.P. part × G.P. part' — for example " +
          "\\(1, 2x, 3x^2, 4x^3, \\ldots\\) — it is an A.G.P. It is solved with the SAME 'multiply by r and " +
          "subtract' trick you used for a plain G.P.",
        sections: [
          {
            num: "7.1",
            title: "Sum to Infinity of an A.G.P.",
            coreDefinition:
              "For \\(|r| < 1\\) (with the G.P. part starting at \\(r^0 = 1\\)): " +
              "\\(S_\\infty = \\dfrac{a}{1-r} + \\dfrac{dr}{(1-r)^2}\\).",
            whyThisWorks:
              "Multiplying by r and subtracting collapses the A.P. parts down to a plain 'leftover' G.P., which is " +
              "then summed with the ordinary G.P. formula — that is where the two-piece formula comes from.",
            teacherTip:
              "First split the series into its A.P. part (to read off a and d) and its G.P. part (to read off r).",
            commonMistake:
              "Using this infinite-sum formula when the G.P. part does not start at 1, where it is not valid.",
            examples: [
              {
                question: "Find the sum to infinity of \\(1 + \\tfrac{2}{2} + \\tfrac{3}{4} + \\tfrac{4}{8} + \\ldots\\)",
                steps: [
                  "A.P. part is \\(1, 2, 3, 4, \\ldots\\) so \\(a = 1, d = 1\\); G.P. part is \\(1, \\tfrac12, \\tfrac14, \\ldots\\) so \\(r = \\tfrac12\\).",
                  "\\(S_\\infty = \\dfrac{a}{1-r} + \\dfrac{dr}{(1-r)^2} = \\dfrac{1}{\\tfrac12} + \\dfrac{1 \\cdot \\tfrac12}{(\\tfrac12)^2}\\).",
                  "\\(= 2 + \\dfrac{\\tfrac12}{\\tfrac14} = 2 + 2 = 4\\)."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "hp",
        num: "08",
        title: "Harmonic Progression",
        subtitle: "Flip it! A sequence whose reciprocals form an A.P.",
        intro:
          "A sequence is an H.P. if, when you take the reciprocal of every term, you get an A.P. The nth term is " +
          "\\(a_n = \\dfrac{1}{a + (n-1)d}\\), where a and d belong to the flipped A.P.",
        intuition:
          "Never work with an H.P. directly. Flip it into an A.P., solve the problem the easy way, then flip your " +
          "final answer back. H.P. shows up in music (harmonics), the lens formula, and 'equal distance, different " +
          "speed' problems.",
        sections: [
          {
            num: "8.1",
            title: "Solving via the Flip Rule",
            coreDefinition:
              "\\(a_n = \\dfrac{1}{a + (n-1)d}\\). To solve: take reciprocals to get an A.P., find the required A.P. term, " +
              "then take the reciprocal once more.",
            whyThisWorks:
              "By definition the reciprocals of an H.P. form an A.P., so every H.P. question becomes an ordinary A.P. " +
              "question after one flip.",
            teacherTip:
              "Write the flipped A.P. clearly and note its a and d before doing anything else.",
            commonMistake:
              "Forgetting the final flip. The A.P. answer must be reciprocated to return to the H.P.",
            examples: [
              {
                question: "Find the 4th term of the H.P. \\(\\tfrac13, \\tfrac15, \\tfrac17, \\ldots\\)",
                steps: [
                  "Flip to the A.P. \\(3, 5, 7, \\ldots\\) with \\(a = 3,\\; d = 2\\).",
                  "The 4th A.P. term is \\(a_4 = 3 + (4-1)(2) = 9\\).",
                  "Flip back: the 4th H.P. term is \\(\\tfrac19\\)."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "means",
        num: "09",
        title: "The Three Means (AM, GM, HM)",
        subtitle: "Averages of every flavour — plus the very testable A ≥ G ≥ H rule.",
        intro:
          "Between two numbers a and c: the Arithmetic Mean is \\(A = \\dfrac{a+c}{2}\\), the Geometric Mean is " +
          "\\(G = \\sqrt{ac}\\), and the Harmonic Mean is \\(H = \\dfrac{2ac}{a+c}\\). For positive numbers, " +
          "\\(A \\geq G \\geq H\\).",
        intuition:
          "The single best real-life example: drive somewhere at 40 km/h and back at 60 km/h and your average " +
          "speed is NOT 50 — it's the Harmonic Mean, 48 km/h, because you spend more TIME at the slower speed. " +
          "The H.M. always pulls the average toward the smaller number.",
        sections: [
          {
            num: "9.1",
            title: "The Three Means and Their Order",
            coreDefinition:
              "\\(A = \\dfrac{a+c}{2}\\), \\(G = \\sqrt{ac}\\), \\(H = \\dfrac{2ac}{a+c}\\). Always \\(A \\geq G \\geq H\\) " +
              "(equal only when \\(a = c\\)), and \\(G^2 = A \\times H\\).",
            whyThisWorks:
              "The H.M. comes from flipping a, c to an A.P.: \\(\\tfrac1b = \\tfrac12\\left(\\tfrac1a + \\tfrac1c\\right)\\), " +
              "which rearranges to \\(b = \\dfrac{2ac}{a+c}\\).",
            teacherTip:
              "To insert n A.M.s between a and b, use \\(d = \\dfrac{b-a}{n+1}\\) — there are n+1 gaps between n+2 terms (fence-post rule).",
            commonMistake:
              "Averaging two speeds directly. For equal distances the correct average is the Harmonic Mean, not the ordinary mean.",
            examples: [
              {
                question: "For \\(a = 4,\\; b = 16\\), verify \\(A \\geq G \\geq H\\).",
                steps: [
                  "\\(A = \\dfrac{4+16}{2} = 10\\).",
                  "\\(G = \\sqrt{4 \\times 16} = \\sqrt{64} = 8\\).",
                  "\\(H = \\dfrac{2(4)(16)}{20} = \\dfrac{128}{20} = 6.4\\).",
                  "Check \\(10 \\geq 8 \\geq 6.4\\) ✓, and \\(G^2 = 64 = A \\times H = 10 \\times 6.4\\) ✓."
                ]
              }
            ]
          }
        ]
      },

      {
        id: "special-sums",
        num: "10",
        title: "Special Sums & Method of Differences",
        subtitle: "Must-memorize sigma formulas plus a tool for tricky, non-standard series.",
        intro:
          "Some sums appear so often they are worth memorizing: \\(\\sum n = \\dfrac{n(n+1)}{2}\\), " +
          "\\(\\sum n^2 = \\dfrac{n(n+1)(2n+1)}{6}\\), \\(\\sum n^3 = \\left[\\dfrac{n(n+1)}{2}\\right]^2\\).",
        intuition:
          "For a messy nth term, sort it like laundry: split into a 'cubes pile', 'squares pile', 'plain-n pile' and " +
          "'constants pile', sum each pile with the formulas above, then add the pile totals. And a neat bonus: the " +
          "sum of cubes always equals (the sum of the numbers) squared!",
        sections: [
          {
            num: "10.1",
            title: "Sigma Notation & Decomposition",
            coreDefinition:
              "\\(\\sum(an^3 + bn^2 + cn + d) = a\\sum n^3 + b\\sum n^2 + c\\sum n + d\\sum 1\\), with \\(\\sum 1 = n\\).",
            whyThisWorks:
              "Sigma is just shorthand for 'add these up', and addition can be regrouped, so a mixed sum splits into " +
              "pieces that each have a known formula.",
            teacherTip:
              "Double-check with the cubes shortcut: \\(1^3 + 2^3 + 3^3 = 36 = (1+2+3)^2\\).",
            commonMistake:
              "Forgetting \\(\\sum 1 = n\\) (adding the number 1 a total of n times), not 1.",
            examples: [
              {
                question: "Find \\(S_n\\) for the series with \\(t_n = 2n^2 + 3n\\).",
                steps: [
                  "Split: \\(S_n = 2\\sum n^2 + 3\\sum n\\).",
                  "\\(= 2 \\cdot \\dfrac{n(n+1)(2n+1)}{6} + 3 \\cdot \\dfrac{n(n+1)}{2}\\).",
                  "\\(= \\dfrac{n(n+1)(2n+1)}{3} + \\dfrac{3n(n+1)}{2}\\) — a fully correct answer."
                ]
              }
            ]
          },
          {
            num: "10.2",
            title: "Method of Differences",
            coreDefinition:
              "Use when the GAPS between consecutive terms form an A.P. or G.P. Write \\(S_n\\) twice (once shifted), " +
              "subtract, and most terms cancel — leaving a simple formula for \\(T_n\\).",
            whyThisWorks:
              "Subtracting the shifted sum isolates the differences, so if those differences follow a known pattern you " +
              "can sum them with standard formulas.",
            teacherTip:
              "Step 1 is always the same: look at the gaps and check whether THEY form an A.P. or G.P.",
            commonMistake:
              "Applying the method when the differences have no pattern — it only helps when the gaps are themselves a progression.",
            examples: [
              {
                question: "Find \\(T_n\\) for \\(1 + 5 + 12 + 22 + 35 + \\ldots\\)",
                steps: [
                  "Gaps are \\(4, 7, 10, 13, \\ldots\\) — an A.P. with \\(a = 4,\\; d = 3\\).",
                  "\\(T_n = 1 + \\dfrac{(n-1)}{2}[2(4) + (n-2)(3)]\\).",
                  "Simplifying gives \\(T_n = \\dfrac{3}{2}n^2 - \\dfrac{1}{2}n\\)."
                ]
              }
            ]
          }
        ]
      }
    ],

    revision: [
      { topic: "A.P. nth term", result: "\\(a_n = a + (n-1)d\\)" },
      { topic: "A.P. sum of n terms", result: "\\(S_n = \\dfrac{n}{2}[2a + (n-1)d] = \\dfrac{n}{2}(a + l)\\)" },
      { topic: "A.P. term from end", result: "\\(l - (k-1)d\\)" },
      { topic: "3 numbers in A.P.", result: "\\(2b = a + c\\)" },
      { topic: "G.P. nth term", result: "\\(a_n = ar^{\\,n-1}\\)" },
      { topic: "G.P. sum of n terms", result: "\\(S_n = \\dfrac{a(r^n - 1)}{r - 1}\\)" },
      { topic: "G.P. sum to infinity", result: "\\(S_\\infty = \\dfrac{a}{1 - r},\\; |r| < 1\\)" },
      { topic: "3 numbers in G.P.", result: "\\(b^2 = ac\\)" },
      { topic: "H.P. nth term", result: "\\(a_n = \\dfrac{1}{a + (n-1)d}\\) (flip to A.P. first)" },
      { topic: "Arithmetic Mean", result: "\\(A = \\dfrac{a + c}{2}\\)" },
      { topic: "Geometric Mean", result: "\\(G = \\sqrt{ac}\\)" },
      { topic: "Harmonic Mean", result: "\\(H = \\dfrac{2ac}{a + c}\\)" },
      { topic: "Golden order", result: "\\(A \\geq G \\geq H\\) and \\(G^2 = A \\cdot H\\)" },
      { topic: "Sum of first n integers", result: "\\(\\sum n = \\dfrac{n(n+1)}{2}\\)" },
      { topic: "Sum of squares", result: "\\(\\sum n^2 = \\dfrac{n(n+1)(2n+1)}{6}\\)" },
      { topic: "Sum of cubes", result: "\\(\\sum n^3 = \\left[\\dfrac{n(n+1)}{2}\\right]^2\\)" }
    ],

    quiz: [
      {
        question: "Find the 15th term of the A.P. \\(3, 7, 11, 15, \\ldots\\)",
        answer: "\\(a = 3,\\; d = 4\\); \\(a_{15} = 3 + 14(4) = 59\\)."
      },
      {
        question: "Find the sum of the first 20 terms of \\(5, 8, 11, \\ldots\\)",
        answer: "\\(S_{20} = \\dfrac{20}{2}[2(5) + 19(3)] = 10[10 + 57] = 670\\)."
      },
      {
        question: "If \\(T_6 = 9\\) and \\(T_9 = 6\\) in an A.P., find \\(T_{15}\\).",
        answer: "Matches \\(T_p = q,\\; T_q = p\\) with \\(p = 6,\\; q = 9\\); so \\(T_{15} = 0\\)."
      },
      {
        question: "Find the 7th term of the G.P. \\(5, 10, 20, \\ldots\\)",
        answer: "\\(a = 5,\\; r = 2\\); \\(a_7 = 5 \\times 2^6 = 5 \\times 64 = 320\\)."
      },
      {
        question: "Find \\(S_\\infty\\) for \\(1 + \\tfrac13 + \\tfrac19 + \\ldots\\)",
        answer: "\\(a = 1,\\; r = \\tfrac13\\); \\(S_\\infty = \\dfrac{1}{1 - \\tfrac13} = \\dfrac32\\)."
      },
      {
        question: "Find the 5th term of the H.P. \\(\\tfrac12, \\tfrac15, \\tfrac18, \\ldots\\)",
        answer: "Flip to A.P. \\(2, 5, 8, \\ldots\\) with \\(d = 3\\); \\(a_5 = 2 + 4(3) = 14\\); flip back to \\(\\tfrac1{14}\\)."
      },
      {
        question: "Find the G.M. of 9 and 25.",
        answer: "\\(G = \\sqrt{9 \\times 25} = \\sqrt{225} = 15\\)."
      },
      {
        question: "Find the H.M. of 4 and 12.",
        answer: "\\(H = \\dfrac{2(4)(12)}{4 + 12} = \\dfrac{96}{16} = 6\\)."
      },
      {
        question: "A car goes a distance at 30 km/h and returns at 90 km/h. Find its average speed.",
        answer: "\\(H = \\dfrac{2(30)(90)}{30 + 90} = \\dfrac{5400}{120} = 45\\) km/h."
      },
      {
        question: "Insert 3 A.M.s between 2 and 14.",
        answer: "\\(d = \\dfrac{14 - 2}{3 + 1} = 3\\); the sequence is \\(2, 5, 8, 11, 14\\)."
      }
    ]
  }
};
