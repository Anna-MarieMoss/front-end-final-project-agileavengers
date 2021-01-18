const personalities = [
     {  code: 'INTJ',
        type: "Architect",
        link: "https://www.16personalities.com/intj-personality",
        work: `Few Architects choose jobs that require constant teamwork or social interaction. To these personalities, most team-building techniques and group meetings are a waste of time. And chitchat, gossip, and office politics – well, those can be nothing short of workplace plagues.

        Many Architects would rather work alone than be slowed down by anyone who isn’t as focused as they are. Fortunately, their perfectionism and resolve often enable them to produce effective results even without the help of others.
        
        That’s not to say that Architects can’t work with others – in fact, they may achieve some of their greatest successes this way. Their capability and reliability can make them excellent collaborators. People with this personality type may never enjoy pairing up with coworkers who get hung up on the wrong details or can’t otherwise earn their respect. But in the company of a small group of trusted colleagues, Architects’ brainstorming sessions may become even more electric.`
    },
     {  code: "INTP",
        type: "Logician",
        link: "https://www.16personalities.com/intp-personality",
        work: `For Logicians, colleagues aren’t so much a group of people who they socialize and work with as they are a series of obstacles and diversions with occasionally useful knowledge. Mingling, chitchat, drinks after work – these make Logicians want to work alone, not get up in the morning. Despite this distance, people with the Logician personality type are unusually good at developing insightful and unbiased interpretations of others’ motivations, though sometimes they overthink it, becoming unnecessarily suspicious of others’ goals.

        What they do enjoy are riddles and patterns, and any Logician would be proud to be the guru who is sought after as arbiter on the validity of an idea, or for their insight on how to apply a principle to novel situations. Logicians love discussing theories, at least with “proven” colleagues, and are almost always available as impromptu consultants. This, however, does not apply to emotional riddles and conflicts, Logicians’ Achilles Heel – in these charged situations, Logician personalities have no clue what to do.`
    },
     {  code: 'ENTJ',
        type: "Commander",
        link: "https://www.16personalities.com/entj-personality",
        work: `Among colleagues, Commanders are sociable and greatly enjoy sharing ideas and critiques in their frequent brainstorming sessions. Natural leaders that they are, Commanders tend to assert themselves into positions as representatives and project leads, considering their objectivity and charisma the perfect qualities for these roles. Commander personalities enjoy working with equals, but people must demonstrate that they are equals – anyone Commanders view as being less competent or driven will see only condescension and arrogance. 
        
        Commanders are strong-willed, even dominant, and though they enjoy inspiring and tutoring others, the energy they bring to the process can seem overbearing. When these roles are reversed, Commanders’ mentors should bear in mind that their students are very rational and respect firm confidence – hand-holding, emotional appeals or wavering indecision will likely burn the bridge then and there. In a partnership, what is best is what is most effective, and time wasted sugarcoating reality is just that – time wasted.`
    },
    {   code: 'ENTP',
        type: "Debater",
        link: "https://www.16personalities.com/entp-personality",
        work: `It is as colleagues that Debaters prove most polarizing, as their passions for brainstorming, debate and over-analysis drive more practical, task-oriented colleagues crazy, but serve as stimulating inspiration for those who appreciate the innovation Debaters bring. Nothing bothers people with the Debater personality type more than getting out of a meeting where everyone agreed with the first plan presented, only to hear everyone complain about how stupid the plan was ten minutes later – but they “didn’t want to make waves”. Debaters strive for honest, direct and objective assessments of these ideas, so much so that they often earn reputations for their insensitivity and condescension.

        Luckily Debaters know how to relax too, and their witty wordplay, healthy sense of humor and outgoing nature win new friends quickly and easily. Always willing to draw on their repository of knowledge, conversations with Debater personalities are informative and entertaining, which makes it easy for them to be the go-to person for tough problems that stump more rote approaches. Peer-to-peer relationships with Debaters aren’t always easy, but it’s tough to argue that they don’t work.`
    },
     {  code: "INFJ",
        type: "Advocate",
        link: "https://www.16personalities.com/infj-personality",
        work: `As colleagues, Advocates can be quite popular and well-respected. People with this personality type are likely to be seen as positive, eloquent, and capable coworkers. Among their greatest strengths is their ability to identify others’ motives and defuse conflicts and tension before anyone else even senses a disturbance.

        At times, efficiency may be less of a priority for Advocates than collaborating with and helping colleagues who need a boost. While this is usually a strength, there is a risk that others will take advantage of their desire to help. Advocates may find themselves picking up the slack for their less dedicated coworkers at the expense of their own energy and well-being.
        
        Although they tend to be warm and approachable colleagues, Advocates are still Introverts. From time to time, they may need to step back and work alone, pursuing their own goals in their own ways.`
    },
     {  code: 'INFP',
        type: "Mediator",
        link: "https://www.16personalities.com/infp-personality",
        work: `Mediator personalities generally don’t enjoy hierarchies. They like to promote equality in the workplace, and their ideal professional environment is one where everyone feels valued and is encouraged to share their ideas. As colleagues, Mediators do what they can to make this ideal a reality.

        Mediators can be private, so they’re probably not the social butterflies of their workplace. That said, they tend to be pleasant and kindhearted colleagues, and they can be quite friendly. Mediators don’t like conflict, drama, or workplace politics. Instead, they try to act in ways that foster harmony and cooperation. When one of their coworkers needs help, Mediators will often pitch in without any expectation of praise or recognition.
        
        One of Mediators’ greatest contributions as colleagues is their empathetic communication style. These personalities speak in a way that’s honest but kind, which can set a positive tone for the entire workplace.`
    },
     {  code: "ENFJ",
        type: "Protagonist",
        link: "https://www.16personalities.com/enfj-personality",
        work: `As colleagues, Protagonists’ desire to assist and cooperate is even more evident as they draw their coworkers into teams where everyone can feel comfortable expressing their opinions and suggestions, working together to develop win-win situations that get the job done. Protagonists’ tolerance, open-mindedness and easy sociability make it easy for them to relate to their colleagues, but also make it perhaps a little too easy for their colleagues to shift their problems onto Protagonists’ plates. People with the Protagonist personality type are sensitive to the needs of others, and their role as a social nexus means that problems inevitably find their way to Protagonists’ doorsteps, where colleagues will find a willing, if overburdened, associate`
    },
     {  code: 'ENFP',
        type: "Campaigner",
        link: "https://www.16personalities.com/enfp-personality",
        work: `Campaigners are people-people, and as far as the workplace is concerned, this quality shows through best among colleagues. More than just coworkers, Campaigners view their colleagues as friends, people who they take a genuine interest in, providing support and cheer when they’re down or stressed. People with the Campaigner personality type are warm and optimistic, always searching for and usually finding win-win situations for everyone.

        Brainstorms among equals are Campaigners’ forte, and they listen to different viewpoints and suggestions not just with tolerance, but genuine excitement. Their ability to relax and have fun will always make them popular around the water cooler, but what sets Campaigners apart is that they can transition that popularity into natural leadership, instinctively picking up on colleagues’ motivations and pulling their teams together, pushing them forward towards whatever truth they’ve been tasked to find.`
    },
     {  code: 'ISTJ',
        type: "Logistician",
        link: "https://www.16personalities.com/istj-personality",
        work: `Among colleagues, no one can be trusted more to ensure that projects are finished on time and by the book than Logisticians. Quiet and methodical, people with the Logistician personality type keep cool when the going gets tough, but expect their colleagues to share their approach. Significantly different types, especially more emotional ones, baffle Logisticians with their need for emotional support and openness, or capacity for dropping something, half finished. To Logisticians, either something’s been done right or it’s been done wrong, and sugarcoating it or walking away isn’t going to fix it.

        Logisticians value peace and security in the workplace, and the easiest way for this to happen is for them to simply work alone. Innovations, brainstorming, theories and new ideas all disrupt this comfortable state, and it takes a great deal of respect on Logisticians’ part to acknowledge their validity. Once the details have been laid out and a plan of implementation established though, Logisticians are an indispensable part of the team in putting these ideas into practice.`
    },
     {  code: 'ISFJ',
        type: "Defender",
        link: "https://www.16personalities.com/isfj-personality",
        work: `Among their colleagues, people with this personality type seek a frictionless environment, a spirit of friends helping friends to get the job done. Close-knit and supportive teams are what Defenders enjoy most, allowing them to express their altruistic spirit among people who rely on their dedication and warmth. Defenders are natural networkers, but they use this skill to keep things running smoothly, not as a tool for professional advancement.
        
        These qualities can be drawbacks though, as Defenders’ aversion to conflict and desire to help can be abused by less scrupulous colleagues. Instead of only asking help when they need it, some may ask for help when they just don’t feel like working hard, knowing that their Defender colleagues have a hard time saying no. The result is that Defenders can become overburdened and stressed, and it takes a few good workplace friends to put pressure on these less savory characters in order to maintain balance.`
    },
     {  code: 'ESTJ',
        type: "Executive",
        link: "https://www.16personalities.com/estj-personality",
        work: `Executives enjoy the hustle and bustle of well-organized workplaces. Honest, friendly and down-to-earth, Executive personalities are great networkers who enjoy connecting with others to get things done. Abusing this for advancement is unlikely, and is in fact something Executives frown upon. Shortcuts are irresponsible, and people with the Executive personality type lose respect quickly for those who try to push forward by showing off or promoting bold but risky ideas, making relationships with more inspiration-oriented colleagues a challenge.

        Executives like to feel like they are a part of the team, and a part of the greater organization that they work for. To make sure this happens, Executives are nearly always willing to accept criticism that can help to improve their effectiveness, and always keep an eye on their surroundings to make sure they and their team deliver the results that are expected of them.`
    },
     {  code: 'ESFJ',
        type: "Consul",
        link: "https://www.16personalities.com/esfj-personality",
        work: `Teamwork is a concept that Consuls have no trouble putting into practice. Often seeking friends at work, people with this personality type are almost always willing to lend a hand when and where it’s needed. Excellent networkers, Consuls always seem to “know just the guy” to bring a project together on time. On the other hand, Consuls often need to work on a team – being stuck alone chipping away at paperwork for days on end just leaves them tired and unfulfilled.

        Consuls take pride in these qualities, which has the side effect of making them particularly sensitive when they come under criticism. When their suggestions and help are turned down, Consul personalities can take it personally. Already somewhat vulnerable to stress, rejections like these can be pretty demoralizing, and Consuls may need their coworkers to make an effort to express their appreciation from time to time.`
    },
     {  code: 'ISTP',
        type: "Virtuoso",
        link: "https://www.16personalities.com/istp-personality",
        work: `Virtuosos are often much more liked by their colleagues than they would expect. Quiet and reserved, people with this personality type usually need a little physical space, but at the same time enjoy peeking in on others’ work to see if there’s anything interesting going on. Not naturally emotional or empathetic, Virtuosos have a blunt way of communicating that can lead to misunderstandings or hurt feelings.

        Yet, Virtuosos combine this rationalism and reserve with a sense of spontaneity that, among other things, creates a lighthearted sense of “do unto others” fairness. Turnabout is always fair play, and the odd prank, and the retaliation, are usually enjoyed by all. Virtuosos have a great sense of humor, if sometimes a little risqué, and are not only resistant to workplace conflicts, but are great at defusing them with a well-placed joke that puts it all into perspective.`
    },
     {  code: 'ISFP',
        type: "Adventurer",
        link: "https://www.16personalities.com/isfp-personality",
        work: `Among their peers Adventurers feel most comfortable. Working with equals and giving some advice in order to solve practical problems is right where Adventurer personalities like to be. While they may exhaust themselves if their role requires an excessive amount of social interaction, they are otherwise quite charming and have excellent networking skills.

        Adventurers are tolerant and friendly, and usually just do what needs to be done regardless of whether their colleagues pull their own weight. At the end of the day though, Adventurers are sensitive and need to know that these efforts are appreciated – a well-placed compliment goes a long way. Adventurers do let their personal goals affect their approach to their work, which can make them a little unpredictable, but this is balanced by their desire for harmony and willingness to find win-win solutions whenever possible.`
    },
        {code: 'ESTP',
        type: "Entrepreneur",
        link: "https://www.16personalities.com/estp-personality",
        work: `As colleagues, Entrepreneurs have a work hard, play hard mentality – as long as everyone else is pulling their weight, they’ll gladly pull their own, and have a great time doing it. Charming and popular individuals that they are, networking comes naturally to Entrepreneurs. These qualities make it easy for Entrepreneur personalities to get along with just about anyone.

        At the same time, if Entrepreneurs see a colleague as incompetent, or worse, lazy, they let them know in no uncertain terms. Emotional sensitivity is not their strong suit. Entrepreneurs are very observant and well-tuned to changes in their colleagues’ habits and moods – unless they themselves are the cause of distress.`}
    ,
        {code: 'ESFP',
        type: "Entertainer",
        link: "https://www.16personalities.com/esfp-personality",
        work: `If anyone can make friends with their colleagues and keep tension at bay within their team, it’s Entertainers. A fun atmosphere is important, and people with the Entertainer personality type use their strong observational and social skills to bring everyone together, shifting a souring mood if need be. Entertainers rarely want for ideas on how to make this happen, happily organizing events and activities inside and outside the workplace. Entertainers’ spontaneity, wit, and enthusiasm have no equal.`}
    ,
]

export default personalities