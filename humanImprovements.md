- refactoring code
    - What improvements can you make to the design/architecture of your code?
        >1. potentially splitting the server/backend and front end into separate git repos
        >2. i could implement a best practice for code to adgere to like NASA does
    - How can you split up large methods or classes into smaller components?
        >1. i looked into all of my code and excluding the processor which was largely already made for us to fill in and the rest designed to not be touched, i feel like due to the react class and the backend focused and class before it, that the way i structured my server and react app are solid enough and any more abstracting might be potentially excessive.
    - Are there unused files/methods that can be removed?
        >1. there are a few potential "excess" .md files im not sure need to still be in the repo ( notes.md, options.md, plan.md). At the very least these might not need to be tracked by git. Or, maybe combine them into a single md with good headings.
        >2. the sampleInput and sampleOutput folders in the processor directory only exist for earlier assignment parts that directly referenced them and could be removed
        >3. there is an empty file 'frontend\src\hooks\useJobStatus.js' that can be removed
        >4. there is ghost code throught the server directory that can be removed
    - Where would additional Java interfaces be appropriate?
        >1. i feel like the interfaces used in the processor were pretty solid, however when we were required to add video processing logic to the processor code, we did not add any interfaces that may have been useful. I dont know exactly how i d implement one, mayb something general that required a function that verified a valid video was added or threw an error.
    - How can you make things simpler, more-usable, and easier to maintain?
        >1. definitely could add more comments and function documention as well as line comments explain tricky parts of the function itself. this is something i wanted to do but wwas crunched for time most of this assignment.
        >2. maybe adda .md file that thoroughly explains how to install and use all parts of the project from the processor to the front end and server. that way if i were to open the project much later it be easier to get back into it or also if someone completely new to the project opened it.
    - Other refactoring improvements?
- adding tests
    - What portions of your code are untested / only lightly tested?
    - Where would be the highest priority places to add new tests?
    - Other testing improvements?
- improving error handling
    - What parts of your code are brittle?
    - Where could you better be using exceptions?
    - Where can you better add input validation to check invalid input?
    - How can you better be resolving/logging/surfacing errors? Hint: almost any place - you're using "throwsException" or "catch(Exception e)" should likely be improved to specify the specific types of exceptions that -- might be thrown or caught.
    - Other error handling improvements?
- writing documentation
    - What portions of your code are missing Javadoc/JSdoc for the methods/classes?
    - What documentation could be made clearer or improved?
    - Are there sections of dead code that are commented out?
    - Where would be the most important places to add documentation to make your code easier to read?
    - Other documentation improvements?
- improving performance (optional)
    - What parts of your code / tests run particularly slowly?
    - What speed improvements would most make running / maintaining your code better?
    - Other performance improvements?
- hardening security (optional)
    - What packages / images are out of date / have security issues?
    - Where could you have better input validation in your code to prevent malicious use?
    - Other security improvements?
- bug fixes (optional)
    - What bugs do you know exist?
    - What parts of the code do you think might be causing them?
    - Other bug fix improvements?
- other
    - Any other improvements in general you could make?